# Prompt para Claude Code — Directorio Público + Micrositios + QR Dinámico

## Contexto del proyecto

Tengo una plataforma SaaS donde negocios (restaurantes, barberías, clínicas, etc.) se registran, configuran su perfil y gestionan conversaciones de WhatsApp con clientes finales mediante IA. El cliente final hace pedidos, reservaciones o agenda citas por WhatsApp, y la IA del negocio responde 24/7.

**Stack actual:**
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Base de datos: PostgreSQL multitenant (queries directos con `pg`, sin ORM)
- Autenticación: JWT propio
- Infraestructura: Docker (container para backend, container para frontend)

Ya tengo construida la landing page de la plataforma y toda la solución de gestión + WhatsApp. Ahora necesito construir la **capa pública orientada al cliente final** para que los negocios registrados sean descubribles.

---

## Qué necesito que construyas

### Módulo 1 — Micrositio público por negocio

Cada negocio registrado obtiene automáticamente una página pública accesible en la ruta `/negocio/:slug` (el slug se genera a partir del nombre del negocio al registrarse).

**Contenido del micrositio:**
- Logo del negocio (ya almacenado en la base de datos del negocio)
- Nombre del negocio
- Categoría (restaurante, barbería, clínica dental, etc.)
- Descripción corta
- Galería de fotos (hasta 6 imágenes)
- Horario de atención (lunes a domingo)
- Dirección con mapa embebido (usar iframe de Google Maps o Leaflet/OpenStreetMap)
- Redes sociales (links a Instagram, Facebook, TikTok si los tiene)
- **Botón principal CTA: "Chatea con nosotros por WhatsApp"** → abre `https://wa.me/{numero_whatsapp}?text=Hola%20quiero%20información` en nueva pestaña
- Badge/sello: "Atendido por IA · Respuesta inmediata 24/7"
- Código QR visible del propio micrositio para que el usuario pueda compartirlo

**Requisitos técnicos:**
- La página es pública (no requiere autenticación)
- SEO optimizado: meta tags dinámicos (title, description, og:image, og:title, og:description) generados desde los datos del negocio para que al compartir el link en redes sociales se vea la preview correcta
- Responsive (mobile-first, se verá principalmente desde el celular)
- Rápida (lazy loading en imágenes, datos mínimos)

**Endpoint backend necesario:**
```
GET /api/public/business/:slug
```
Retorna los datos públicos del negocio (sin datos sensibles como tokens, configuración de IA, etc.). Si el negocio no existe o no tiene activo el perfil público, retorna 404.

---

### Módulo 2 — Directorio general (marketplace de exploración)

Página pública en la ruta `/explorar` donde el cliente final busca negocios registrados.

**Funcionalidades:**
- Barra de búsqueda por nombre de negocio
- Filtro por categoría (restaurante, barbería, clínica, cafetería, etc.) con chips/tags seleccionables
- Filtro por ciudad/zona (si aplica, basado en la dirección del negocio)
- Grid de tarjetas de negocios, cada tarjeta muestra:
  - Logo o imagen principal
  - Nombre del negocio
  - Categoría (con ícono)
  - Descripción corta (truncada a 2 líneas)
  - Badge "Abierto ahora" / "Cerrado" basado en el horario
  - Botón "Ver negocio" → navega a `/negocio/:slug`
  - Botón secundario "WhatsApp directo" → abre wa.me
- Paginación o infinite scroll
- Estado vacío amigable si no hay resultados

**Endpoint backend necesario:**
```
GET /api/public/businesses?search=&category=&city=&page=1&limit=12
```
Retorna lista paginada de negocios que tienen perfil público activo. Incluye conteo total para paginación.

**SEO:**
- Meta tags estáticos para la página de exploración
- Title: "[Nombre de tu plataforma] · Encuentra negocios y pide por WhatsApp"

---

### Módulo 3 — QR dinámico por negocio

Cada negocio tiene un código QR generado dinámicamente que apunta a su micrositio (`/negocio/:slug`), **NO directamente a WhatsApp**.

**Para el negocio (panel de administración):**
- Sección dentro del dashboard del negocio donde puede ver y descargar su QR
- El QR se genera con la URL de su micrositio público
- Opciones de descarga: PNG (para digital) y SVG (para impresión)
- Preview del QR con el logo del negocio al centro (si es posible)
- Instrucciones: "Imprime este QR en tus mesas, menús, tarjetas o aparador. Cuando lo escaneen, tus clientes verán tu perfil y podrán chatear contigo por WhatsApp."

**Para el cliente final:**
- Al escanear el QR con la cámara del celular, se abre el micrositio del negocio en el navegador
- Desde ahí, un toque en "Chatea con nosotros" y está en WhatsApp

**Implementación técnica:**
- Usar la librería `qrcode` (npm) para generar los QR en el backend o `qrcode.react` en el frontend
- El QR debe contener la URL absoluta: `https://tudominio.com/negocio/:slug`

---

## Modelo de datos — Migraciones SQL

Necesito las migraciones SQL para PostgreSQL. La base de datos ya existe y es multitenant (cada negocio es un tenant). Probablemente ya exista una tabla de negocios/companies con datos básicos. Necesito extenderla o crear tablas complementarias para soportar el perfil público.

**Tablas nuevas o extensiones necesarias:**

```sql
-- Extender la tabla existente de negocios (o crear tabla de perfil público)
-- Adapta el nombre de la tabla según cómo se llame en mi proyecto

-- Tabla: business_public_profile
CREATE TABLE business_public_profile (
  id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  is_public BOOLEAN DEFAULT false,
  short_description TEXT,
  category VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  whatsapp_number VARCHAR(20) NOT NULL,
  instagram_url VARCHAR(255),
  facebook_url VARCHAR(255),
  tiktok_url VARCHAR(255),
  schedule JSONB DEFAULT '{}',
  gallery_images TEXT[] DEFAULT '{}',
  logo_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  seo_title VARCHAR(160),
  seo_description VARCHAR(320),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bpp_slug ON business_public_profile(slug);
CREATE INDEX idx_bpp_category ON business_public_profile(category);
CREATE INDEX idx_bpp_city ON business_public_profile(city);
CREATE INDEX idx_bpp_is_public ON business_public_profile(is_public);
```

**Formato del campo `schedule` (JSONB):**
```json
{
  "monday": { "open": "09:00", "close": "18:00", "closed": false },
  "tuesday": { "open": "09:00", "close": "18:00", "closed": false },
  "wednesday": { "open": "09:00", "close": "18:00", "closed": false },
  "thursday": { "open": "09:00", "close": "18:00", "closed": false },
  "friday": { "open": "09:00", "close": "20:00", "closed": false },
  "saturday": { "open": "10:00", "close": "15:00", "closed": false },
  "sunday": { "open": null, "close": null, "closed": true }
}
```

---

## Estructura de archivos esperada

Respeta la estructura de carpetas que ya tenga el proyecto. Busca cómo está organizado actualmente y sigue la misma convención. De forma general, espero algo como:

**Backend (dentro del container/carpeta del backend):**
```
/routes/public.js          → Rutas públicas (no requieren JWT)
/controllers/publicController.js  → Lógica de los endpoints públicos
/routes/qr.js              → Ruta para generar/descargar QR (requiere JWT, es del panel del negocio)
/controllers/qrController.js
/migrations/               → Scripts SQL de migración
```

**Frontend (dentro del container/carpeta del frontend):**
```
/src/pages/public/
  Explore.jsx              → Página del directorio "/explorar"
  BusinessProfile.jsx      → Micrositio del negocio "/negocio/:slug"
/src/components/public/
  BusinessCard.jsx          → Tarjeta del negocio para el grid
  CategoryFilter.jsx        → Filtros por categoría
  SearchBar.jsx             → Barra de búsqueda
  ScheduleBadge.jsx         → Badge abierto/cerrado
  WhatsAppButton.jsx        → Botón CTA de WhatsApp
/src/pages/dashboard/
  QRCode.jsx               → Sección del QR en el panel del negocio
```

---

## Estilo visual y diseño

**IMPORTANTE:** Antes de empezar a construir, revisa los archivos de configuración de Tailwind (`tailwind.config.js`), los archivos CSS globales, y los componentes existentes del proyecto para extraer:
- La paleta de colores actual (primary, secondary, accent, etc.)
- Las fuentes tipográficas utilizadas
- El estilo de los botones, cards, inputs y otros componentes existentes
- El border-radius, sombras y espaciado que se usa como patrón

**Usa exactamente los mismos colores, fuentes y patrones de diseño** que ya existen en el proyecto. Las páginas públicas deben sentirse como una extensión natural de la plataforma, no como un módulo separado.

**Directrices de diseño para las páginas públicas:**
- Mobile-first (el cliente final accede principalmente desde el celular)
- El botón de WhatsApp debe ser el elemento más prominente y visible, usar color verde WhatsApp (#25D366) o el color primario de la plataforma
- Las tarjetas del directorio deben ser limpias, con buena jerarquía visual
- Usar íconos de Lucide React (ya se usa en el proyecto) o Heroicons si ya está instalado
- Transiciones suaves al hacer hover en las tarjetas
- Loading skeletons mientras cargan los datos

---

## Flujo de implementación

Sigue este orden:

1. **Primero:** Revisa la estructura actual del proyecto completo. Entiende cómo están organizadas las carpetas, rutas, controladores, cómo se conecta a la BD, cómo están las rutas del frontend, cómo se manejan las rutas públicas vs autenticadas.

2. **Segundo:** Crea la migración SQL y ejecútala (o genera el archivo para que yo la ejecute manualmente).

3. **Tercero:** Construye los endpoints del backend:
   - `GET /api/public/business/:slug` — datos del micrositio
   - `GET /api/public/businesses` — listado para el directorio con búsqueda, filtros y paginación
   - `POST /api/dashboard/business/public-profile` — crear/actualizar perfil público (requiere JWT)
   - `GET /api/dashboard/business/qr` — generar QR del negocio (requiere JWT)

4. **Cuarto:** Construye las páginas del frontend:
   - Micrositio (`/negocio/:slug`)
   - Directorio (`/explorar`)
   - Sección QR en el dashboard del negocio

5. **Quinto:** Agrega las rutas al router de React y asegúrate de que las rutas públicas NO requieran autenticación.

6. **Sexto:** Prueba que todo funcione end-to-end.

---

## Consideraciones finales

- **No rompas nada de lo que ya existe.** Las funcionalidades actuales deben seguir funcionando igual.
- **Los endpoints públicos NO deben pasar por el middleware de autenticación JWT.** Son accesibles por cualquier persona sin login.
- **Genera el slug automáticamente** a partir del nombre del negocio cuando se cree el perfil público (slugify: quitar acentos, espacios por guiones, lowercase). Si el slug ya existe, agrega un sufijo numérico.
- **Manejo de errores:** Si el slug no existe o el perfil no es público, mostrar una página 404 amigable.
- **El QR se genera en el frontend** con `qrcode.react` para el preview y con `qrcode` (npm, toDataURL/toBuffer) en el backend para la descarga en PNG/SVG.
- **No instales librerías innecesarias.** Usa lo que ya esté instalado en el proyecto. Solo agrega lo estrictamente necesario (como `qrcode.react` si no existe).
