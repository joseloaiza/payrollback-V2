# Guía de despliegue en VPS Ubuntu (Oracle Cloud) — staging y production

Arquitectura idéntica en ambos entornos (paridad): **un mismo `docker-compose.vps.yml`** con
`postgres`, `redis`, `rabbitmq`, `api` y `worker`, un mismo pipeline
(`.github/workflows/deploy_vs.yml`), y en el host, `cloudflared` (Cloudflare Tunnel) entregándole tráfico a
Nginx como reverse proxy. TLS lo termina Cloudflare en su borde, no el VPS.
Lo único que cambia entre servidores es el secret `ENV_FILE` (y, en producción, los límites de memoria).

```
Internet ──HTTPS──> Cloudflare (termina TLS) ══túnel saliente══> cloudflared (host)
                                                                        │ http://127.0.0.1:80
                                                                        ▼
                                                    Nginx (host) ──127.0.0.1:3000──> api ─┐
                                                                                          ├─ red docker: postgres · redis · rabbitmq
                                                    (sin exponer)              worker ────┘
GitHub Actions ──SSH (usuario deploy)──> /opt/payroll/<entorno>
Docker Hub  <── build & push (CI)        VPS ── docker compose pull (solo descarga, nunca compila)
```

`cloudflared` inicia la conexión hacia afuera (no requiere puertos entrantes); por eso 80/443 quedan cerrados
al público (sección 1) y no hace falta certificado en el servidor (sección 6a).

Reemplaza `<entorno>` por `staging` o `production`, `<dominio>` por tu dominio y `<usuario-dh>` por tu usuario de Docker Hub.
**Un servidor por entorno** (no corras staging y production juntos en el de 1 GB).

---

## 0. Antes de empezar

- Instancia Ubuntu 22.04/24.04 **x86_64** (shape `VM.Standard.E2.1.Micro` para el de 1 GB).
- Dominio administrado en Cloudflare (zona activa, nameservers apuntando a Cloudflare) — si tu dominio está en otro
  registrador (GoDaddy, Namecheap, etc.), primero sigue la sección 0a. No hace falta apuntar ningún registro `A` a
  la IP del VPS: Cloudflare Tunnel crea su propio `CNAME` al activar el hostname público (sección 6a).
- Cuenta de Docker Hub y un _Access Token_ (Account Settings → Security → New Access Token, permisos Read & Write).
- Un repositorio de Docker Hub `payrollback-v2` (recomendado **privado**: el pipeline hace `docker login` en el servidor).

---

## 0a. Mover el DNS del dominio a Cloudflare (una sola vez, para todo el dominio)

Cloudflare Tunnel necesita que **Cloudflare administre el DNS** del dominio — no basta con que el dominio exista o
esté comprado ahí. Esto es independiente del registrador: no transfieres el dominio (sigue renovándose/facturándose
donde lo compraste, p. ej. GoDaddy); solo cambias **a quién le delegas las consultas DNS**. Se hace **una sola vez
por dominio**, no por servidor ni por entorno — si luego usas un subdominio distinto para staging
(`staging-api.tu-dominio.com`) y otro para producción (`api.tu-dominio.com`), ambos quedan bajo la misma zona.

1. Crea una cuenta en Cloudflare (el plan gratis sirve) → **Add a site** → tu dominio.
2. Cloudflare escanea los registros DNS actuales e intenta importarlos. **Antes de continuar**, revisa que haya
   quedado todo lo que el dominio usa hoy — en particular `MX`/`TXT` si hay correo en ese dominio, y cualquier
   `A`/`CNAME` de un sitio o subdominio ya existente (p. ej. `www`). Si falta algo, agrégalo a mano en Cloudflare
   antes del siguiente paso: mientras dure el corte de nameservers, lo que no esté replicado ahí deja de responder.
3. Cloudflare te asigna 2 nameservers propios (forma `algo.ns.cloudflare.com`, visibles en el dashboard tras el
   paso 1).
4. En el panel de tu registrador actual (p. ej. GoDaddy: **My Domains** → el dominio → **DNS** → **Nameservers**),
   cambia de los nameservers por defecto a "Custom" y pega los 2 de Cloudflare.
5. Espera la propagación (de minutos a unas horas); Cloudflare notifica por correo cuando el dominio queda
   **Active** en su dashboard.
6. Con el dominio **Active**: cualquier registro que quieras mantener fuera del túnel (el sitio principal del
   dominio o `www`, si vive en otro servidor) se administra desde ahí, ya no desde el registrador original.

A partir de aquí, el paso 3 de la sección 6a (Public Hostname) funciona tal cual está documentado: Cloudflare crea
el `CNAME` del subdominio solo, sin tocar nada manualmente en el registrador.

---

## 1. Red en Oracle Cloud (solo SSH — nada de 80/443)

Con Cloudflare Tunnel, `cloudflared` abre la conexión **hacia afuera**; el VPS no necesita ningún puerto entrante
para servir HTTP/HTTPS. Solo SSH queda abierto.

**1.1 Consola de OCI** → Networking → Virtual Cloud Networks → tu VCN → Security Lists → revisa que **solo** exista esta regla de ingreso:

| Origen       | Protocolo | Puerto | Nota                                                                                                         |
| ------------ | --------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `<tu-IP>/32` | TCP       | 22     | SSH (GitHub Actions usa IPs variables: déjalo abierto a `0.0.0.0/0` solo si autenticas únicamente con llave) |

Si venías de una versión anterior de esta guía con reglas para 80/443, elimínalas.

**1.2 Firewall de la propia instancia.** Las imágenes Ubuntu de OCI traen reglas `iptables` con un `REJECT` final
que bloquea todo salvo el 22 — **no hace falta tocarlas**: no vamos a publicar 80 ni 443. No uses UFW aquí.

```bash
sudo iptables -L INPUT -n --line-numbers     # confirmar: solo 22 permitido, REJECT para el resto
```

Los contenedores publican solo en `127.0.0.1` (ver compose) y Nginx escucha solo en loopback (sección 6), así que
Postgres, Redis, RabbitMQ y la app **no** quedan expuestos ni siquiera dentro del propio host salvo a `cloudflared`.

---

## 2. Swap de 4 GB (crítico con 1 GB de RAM)

Sin swap, un pico de memoria dispara el OOM killer y tumba contenedores sin aviso.

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab      # persistente tras reinicios

# Usar swap solo cuando haga falta (10 = casi solo ante presión de memoria)
echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf
sudo sysctl --system

free -h        # Swap: 4.0Gi
swapon --show
```

En el servidor de producción (más RAM) puedes omitirlo o dejar 2 GB.

---

## 3. Instalaciones

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg git nginx
```

**cloudflared** (repositorio oficial de Cloudflare — el servicio se instala y arranca en la sección 6a, junto con el token del túnel):

```bash
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloudflare-main.gpg
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" \
  | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update && sudo apt install -y cloudflared
cloudflared --version
```

**Docker Engine + Compose plugin** (repositorio oficial, no `snap`):

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker

docker --version && docker compose version     # Compose v2.x (el pipeline usa --wait / --wait-timeout)
```

---

## 4. Usuario de despliegue y llave SSH

El pipeline entra como `deploy`, un usuario **sin sudo** (nunca como `root` ni `ubuntu`).

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG docker deploy      # ⚠ pertenecer al grupo docker equivale a root sobre el host: protege esta llave
```

**En tu máquina**, genera una llave dedicada al pipeline (no reutilices la personal):

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy-<entorno>" -f ./deploy_key_<entorno> -N ""
```

**En el servidor**, autoriza la llave **pública**:

```bash
sudo install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
echo "ssh-ed25519 AAAA... github-actions-deploy-<entorno>" | sudo tee /home/deploy/.ssh/authorized_keys
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

La llave **privada** (`deploy_key_<entorno>`) va al secret `SSH_KEY` de GitHub (sección 8). Comprueba desde tu máquina:

```bash
ssh -i ./deploy_key_<entorno> deploy@<ip> 'docker ps && echo OK'     # sin "permission denied"
```

Solo entonces, endurece SSH (las imágenes de OCI ya suelen venir sin password, verifica):

```bash
sudo grep -Ei '^(PasswordAuthentication|PermitRootLogin)' /etc/ssh/sshd_config /etc/ssh/sshd_config.d/*.conf
# deben decir: PasswordAuthentication no · PermitRootLogin no  (si no, cámbialo y `sudo systemctl restart ssh`)
```

---

## 5. Directorio de la aplicación y permisos

Ruta: **`/opt/payroll/<entorno>`** (`/var/www` es para contenido estático servido por Nginx; esta app corre en contenedores).
Un directorio por entorno también permite, si algún día hiciera falta, alojar ambos en el mismo host sin colisiones.

```bash
sudo mkdir -p /opt/payroll/<entorno>
sudo chown -R deploy:deploy /opt/payroll
sudo chmod 750 /opt/payroll /opt/payroll/<entorno>
```

El pipeline mantiene aquí, sin intervención manual:

```
/opt/payroll/<entorno>/
├── docker-compose.vps.yml   # subido en cada deploy
├── .env.deploy              # escrito desde el secret ENV_FILE (chmod 600)
├── .last_good_tag           # tag de la última imagen que pasó el healthcheck (rollback)
└── backups/                 # pg_dump previo a cada migración (se conservan los últimos 5)
```

Los datos viven en volúmenes Docker nombrados (`payroll-<entorno>_postgres_data`, `_redis_data`, `_rabbitmq_data`),
fuera de este directorio.

---

## 6. Nginx en el host

Nginx solo escucha en loopback: el único que le habla es `cloudflared` (sección 6a), en el mismo host. No hay
certificado que instalar aquí — Cloudflare termina TLS en su borde.

```bash
sudo rm -f /etc/nginx/sites-enabled/default

sudo tee /etc/nginx/sites-available/payroll-stagin > /dev/null <<'NGINX_EOF'
server {
    listen 127.0.0.1:80 default_server;
    server_name api.animorh.com;

    server_tokens off;
    client_max_body_size 20m;                 # cargas de archivos / importaciones

    gzip on;
    gzip_types application/json text/plain text/css application/javascript;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;   # Cloudflare ya terminó TLS; el tramo interno es HTTP
        proxy_read_timeout 120s;              # exports Excel / reportes lentos en CPU burstable
        proxy_send_timeout 120s;
    }
}
NGINX_EOF

sudo ln -sf /etc/nginx/sites-available/payroll-<entorno> /etc/nginx/sites-enabled/payroll-<entorno>

sudo nginx -t                            # revisa la salida COMPLETA antes de seguir, no la des por buena
sudo systemctl restart nginx             # restart (no reload) en esta activación inicial: fuerza a releer todo desde cero
sudo systemctl status nginx --no-pager   # debe decir "active (running)"
```

`default_server` es intencional: si el `default` de stock Ubuntu (que también lo declara) sigue habilitado por
cualquier motivo, `nginx -t` falla con "duplicate default server" en vez de arrancar y servir la página de
bienvenida en silencio.

**Verificar antes de seguir:**

```bash
ls /etc/nginx/sites-enabled/                                    # debe listar SOLO payroll-<entorno>
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:80    # 502 esperado (nada corriendo aún en :3000)
```

`ls sites-enabled/` solo confirma qué hay en **disco**, no qué tiene Nginx cargado en memoria — si el `curl` de
arriba sigue dando `200` con el HTML de "Welcome to nginx", compara contra la configuración **efectiva**:

```bash
sudo nginx -T | grep -A15 'listen 127.0.0.1:80'
```

Si ese bloque muestra `server_name _` y `root /var/www/html`, el proceso maestro de Nginx sigue con la configuración
vieja en memoria (un `reload` no se llegó a aplicar) — corre `sudo systemctl restart nginx` y repite el `curl`.

Si el `curl` devuelve `200` con el HTML de "Welcome to nginx", `sites-enabled/default` sigue presente — bórralo
(`sudo rm -f /etc/nginx/sites-enabled/default`) y repite `nginx -t && systemctl reload nginx`.

Hasta el primer deploy, `curl http://127.0.0.1:80` en el propio servidor responderá **502** — es lo esperado.
El worker (puerto 3001) no se publica por Nginx: es interno.

---

## 6a. Cloudflare Tunnel (TLS y punto de entrada público)

Túnel gestionado desde el dashboard (Zero Trust): el token es el único secreto a manejar, sin `config.yml` local.
Un túnel por entorno (`payroll-staging`, `payroll-production`), cada uno en su propio servidor.

1. **Zero Trust dashboard** ([one.dash.cloudflare.com](https://one.dash.cloudflare.com)) → _Networks_ → _Tunnels_ → _Create a tunnel_
   → tipo **Cloudflared** → nombre `payroll-<entorno>`.
2. El dashboard muestra un comando de instalación con un token embebido. En el VPS:
   ```bash
   sudo cloudflared service install <TOKEN>
   sudo systemctl status cloudflared      # active (running)
   ```
   Esto instala y arranca el servicio systemd `cloudflared`, ya conectado al túnel (no requiere `config.yml`: la
   configuración vive en el dashboard).
3. En la misma pantalla del túnel, pestaña **Public Hostname** → _Add a public hostname_:
   - Domain: `<dominio>`
   - Type: `HTTP`
   - URL: `localhost:80` (Nginx)

   Solo se crea **un** Public Hostname, apuntando a Nginx — no al contenedor de la API (`127.0.0.1:3000`) ni al
   worker. Nginx es quien decide a qué contenedor reenviar (hoy, solo `api`); el worker (`127.0.0.1:3001`) nunca se
   expone, ni aquí ni en Nginx — su único endpoint HTTP (`/health`) es para el healthcheck interno del propio
   `docker-compose.vps.yml`, no para tráfico público.

4. Verificar desde cualquier máquina (no hace falta estar en el VPS) que el túnel llega hasta Nginx:
   ```bash
   curl -I https://<dominio>/api/docs
   ```
   A esta altura (sin haber hecho el primer deploy) debe responder **502 Bad Gateway** — es lo esperado: confirma
   que Cloudflare → `cloudflared` → Nginx ya funcionan de punta a punta, aunque todavía no haya ningún contenedor
   de la app corriendo en el puerto 3000. Revisa el header `cf-ray` en la respuesta: su presencia confirma que la
   petición pasó por Cloudflare (con TLS terminado ahí, sin certificado propio en el servidor) y no por un acceso
   directo a la IP sin túnel. El `200` real llega en la sección 9 (primer deploy), cuando `api`/`worker` ya estén
   arriba.

Operación:

- `journalctl -u cloudflared -f` para depurar la conexión del túnel.
- Si el token se compromete, revócalo/rótalo desde el dashboard del túnel y reinstala el servicio con el nuevo token
  (`sudo cloudflared service uninstall && sudo cloudflared service install <TOKEN_NUEVO>`).
- `cloudflared` corre nativo en el host (no en Docker); consumo típico ~15-20 MB de RAM.

---

## 7. Variables de entorno (`.env`) de forma segura

Regla: **el `.env` nunca entra a Git**. `.gitignore` excluye todo `.env.*` salvo `.env.vps.example`
(plantilla sin secretos), que es lo único versionado.

### 7.1 Estándar: mismas variables en todos los entornos

`.env.development`, `.env.production` y `.env.vps.example` tienen **exactamente las mismas 38 claves, en el mismo orden**;
solo cambian los valores. Si agregas o quitas una variable, hazlo en los tres. El compose VPS no pisa ninguna: el
`.env` es la única fuente de configuración (solo `PROCESS_TYPE`, `PORT` y `NODE_OPTIONS` los fija el compose por servicio).

| Grupo         | Claves                                                                                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aplicación    | `NODE_ENV` `FORCE_SECURE` `PORT` `API_VERSION` `API_HOST`                                                                                                                  |
| Mensajería    | `MESSAGING_PROVIDER` `SERVICE_MESSAGING_URL` `RABBITMQ_DEFAULT_USER` `RABBITMQ_DEFAULT_PASS` `PAYROLL_JOBS_QUEUE` `LIQUIDATION_JOBS_QUEUE` `PAYROLL_STATUS_QUEUE`          |
| Worker / cron | `EXECUTE_PAYROLL_CRON` `PAYROLL_SCHEDULE_CRON` `TZ`                                                                                                                        |
| Frontend      | `FRONTEND_URL`                                                                                                                                                             |
| PostgreSQL    | `POSTGRES_HOST` `POSTGRES_PORT` `POSTGRES_USER` `POSTGRES_PASSWORD` `POSTGRES_DB` `POSTGRES_SSL`                                                                           |
| Auth          | `JWT_SECRET` `JWT_EXPIRATION` `REFRESH_EXPIRATION` `JWT_ACCESS_TOKEN_SECRET` `JWT_REFRESH_TOKEN_SECRET` `JWT_ACCESS_TOKEN_EXPIRATION_MS` `JWT_REFRESH_TOKEN_EXPIRATION_MS` |
| Logs          | `USE_JSON_LOGGER` `DEBUG`                                                                                                                                                  |
| Correo        | `MAIL_HOST` `MAIL_USER` `MAIL_PASS` `MAIL_PORT` `MAIL_TRANSPORT`                                                                                                           |
| PgAdmin       | `PGADMIN_DEFAULT_EMAIL` `PGADMIN_DEFAULT_PASSWORD`                                                                                                                         |

Valores que **no** cambian entre dev y el VPS porque son los nombres de servicio del compose: `POSTGRES_HOST=postgres`,
`POSTGRES_PORT=5432`, `SERVICE_MESSAGING_URL=amqp://<usuario>:<clave>@rabbitmq:5672`. Lo que sí cambia: contraseñas y secretos,
`NODE_ENV`, `FORCE_SECURE`, URLs públicas, nombres de cola (sin sufijo `-dev`).

**Credenciales de RabbitMQ: se escriben una sola vez.** Hay tres claves porque hay dos consumidores: el contenedor de RabbitMQ solo
entiende `RABBITMQ_DEFAULT_USER`/`RABBITMQ_DEFAULT_PASS` (crea el usuario en su primer arranque) y la app lee un único string,
`SERVICE_MESSAGING_URL` (que con Azure Service Bus es una cadena de conexión). La URL no se escribe a mano: se deriva de las dos credenciales,
con la misma línea en todos los entornos:

```
RABBITMQ_DEFAULT_USER=payroll
RABBITMQ_DEFAULT_PASS=<secreto>
SERVICE_MESSAGING_URL=amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASS}@rabbitmq:5672
```

Las credenciales **deben ir antes** de la URL (Compose solo expande variables definidas antes en el archivo; al revés la URL queda
vacía). Solo cambian los valores de las dos credenciales entre entornos (en dev, `guest`). Para usar Azure Service Bus, esa línea se
sustituye por la cadena de conexión y `MESSAGING_PROVIDER=servicebus`.

Comprobar que los archivos siguen alineados (debe imprimir `OK`):

```bash
keys() { grep -oE '^[A-Z_]+=' "$1"; }
diff <(keys .env.development) <(keys .env.production) && diff <(keys .env.development) <(keys .env.vps.example) && echo OK
```

### 7.2 Cargar el `.env` en el servidor

1. **Production:** tu `.env.production` local ya sigue el estándar. **Staging:** copia `.env.vps.example` a un archivo **fuera del repo**
   (p. ej. `~/secrets/payroll.staging.env`) y rellénalo.
2. Genera secretos distintos por entorno: `openssl rand -hex 24` (contraseñas de Postgres/RabbitMQ; en hex para que la URL de
   `SERVICE_MESSAGING_URL` no necesite escapes) y `openssl rand -base64 32` para los `JWT_*`.
3. Cárgalo como secret `ENV_FILE` del GitHub Environment correspondiente:

   ```bash
   gh secret set ENV_FILE --env production --repo <owner>/<repo> < .env.production
   gh secret set ENV_FILE --env staging    --repo <owner>/<repo> < ~/secrets/payroll.staging.env
   ```

4. En cada deploy el pipeline lo escribe en el servidor como `/opt/payroll/<entorno>/.env.deploy` con permisos `600`
   (solo `deploy` lo lee). Para cambiar una variable: edita tu archivo local, vuelve a cargar el secret y relanza el deploy.

### 7.3 Notas

- `POSTGRES_*` solo se aplican la **primera vez** que se crea el volumen de Postgres; cambiar `POSTGRES_PASSWORD` después en el `.env`
  no cambia la clave de una base ya creada (hay que hacer `ALTER USER` dentro del contenedor).
- Las credenciales reales de Azure de tu `.env.production` anterior quedaron en `.env.production.azure.bak` (ignorado por Git);
  no las pegues en ningún archivo versionado y rótalas si alguna vez se compartieron.
- Usa `NODE_ENV=production` en staging y production (controla Helmet/HSTS, Swagger y el nivel de logging de TypeORM).
- **RabbitMQ en producción:** no uses `guest` (solo dev); usa contraseñas en hex (`openssl rand -hex 24`) porque un `@`, `:`, `/` o `#`
  rompería la URL derivada; el puerto AMQP (5672) no se publica fuera de la red de Docker; `RABBITMQ_DEFAULT_*` solo se aplican al crear
  el volumen — para rotar la clave después usa `rabbitmqctl change_password <usuario> <nueva>` y actualiza el `ENV_FILE`. A futuro:
  una cuenta de aplicación con permisos mínimos (en vez del usuario administrador por defecto) y un gestor de secretos
  (OCI Vault / Docker secrets) si crece el equipo o hay requisitos de cumplimiento.
- Claves definidas pero que ningún código lee hoy: `PGADMIN_DEFAULT_EMAIL/PASSWORD`, `MAIL_TRANSPORT`, `JWT_SECRET`, `JWT_EXPIRATION`,
  `REFRESH_EXPIRATION`. Se conservan por paridad con desarrollo; son candidatas a eliminar (en los tres archivos a la vez).
- Variables que el código lee pero **ningún** `.env` define: `REDIS_HOST`/`REDIS_PORT` (hoy la app usa cache en memoria),
  `AUTH_UI_REDIRECT` (obligatoria para el login con Google) y `SERVICEBUS_PAYROLL_JOBS_QUEUE` (solo con Service Bus).

---

## 8. GitHub: environments y secrets

Settings → **Environments** → crea `staging` y `production` (en `production` activa _Required reviewers_).

| Ámbito      | Secret               | Valor                                                    |
| ----------- | -------------------- | -------------------------------------------------------- |
| Repositorio | `DOCKERHUB_USERNAME` | `<usuario-dh>`                                           |
| Repositorio | `DOCKERHUB_TOKEN`    | Access Token de Docker Hub (no tu contraseña)            |
| Environment | `SSH_HOST`           | IP pública o hostname del servidor de ese entorno        |
| Environment | `SSH_USER`           | `deploy`                                                 |
| Environment | `SSH_KEY`            | contenido completo de `deploy_key_<entorno>` (privada)   |
| Environment | `SSH_PORT`           | opcional, si no es 22                                    |
| Environment | `ENV_FILE`           | contenido completo del `.env` de ese entorno (sección 7) |

---

## 9. Primer deploy (una sola vez por servidor)

Tu esquema base de BD **no está en las migraciones** (solo hay 6, y la 2ª hace `ALTER TABLE users`). Un Postgres vacío
no puede migrarse desde cero, así que la primera vez hay que sembrarlo con un dump de tu BD de desarrollo. Desde
ahí, cada migración nueva corre sola en cada deploy.

**9.1 Dump de la BD de desarrollo** (en tu máquina; solo lectura sobre dev):

```bash
# Staging: dump completo (esquema + datos: catálogos, roles, usuario admin de prueba…)
docker exec payroll-postgres pg_dump -U postgres -d dbPayroll --no-owner --no-privileges -Fc > payroll_baseline.dump

# Production: esquema + solo tablas de referencia + tabla migrations (sin datos de prueba)
docker exec payroll-postgres pg_dump -U postgres -d dbPayroll --no-owner --no-privileges --schema-only -Fc > payroll_schema.dump
docker exec payroll-postgres pg_dump -U postgres -d dbPayroll --no-owner --no-privileges --data-only -Fc \
  -t migrations -t roles -t permissions -t <otras_tablas_de_catalogo> > payroll_reference.dump
```

La tabla **`migrations`** debe ir en el dump: es lo que le dice a TypeORM qué migraciones ya están aplicadas.
En producción tendrás que crear después el primer usuario administrador.

**9.2 Sube el dump al servidor:**

```bash
scp -i ./deploy_key_<entorno> payroll_baseline.dump deploy@<ip>:/opt/payroll/<entorno>/
```

**9.3 Lanza el workflow** (Actions → _Build & Deploy (VPS) v2_ → Run workflow → elige el entorno).
Esta primera corrida **fallará en el paso `[4/6] Migraciones`** — es esperado: el pipeline ya subió el compose y el
`.env.deploy`, y dejó Postgres/Redis/RabbitMQ arriba y sanos, que es lo que necesitas para restaurar.

**9.4 Restaura el dump** (en el servidor, como `deploy`):

```bash
cd /opt/payroll/<entorno>
docker exec -i payroll-postgres-<entorno> sh -c \
  'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner --no-privileges --clean --if-exists' \
  < payroll_baseline.dump
# (production: restaura payroll_schema.dump y luego payroll_reference.dump)

docker exec payroll-postgres-<entorno> sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT count(*) FROM migrations"'
rm payroll_baseline.dump
```

**9.5 Relanza el workflow.** Ahora las migraciones no tendrán pendientes, `api` y `worker` arrancan y el pipeline
termina en verde.

**9.6 Verifica:**

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}'      # 5 contenedores, todos (healthy)
curl -fsS http://127.0.0.1:3000/api/docs -o /dev/null && echo API-OK
curl -fsS http://127.0.0.1:3001/health                  # {"status":"ok",...}
curl -I https://<dominio>/api/docs                      # 200 vía Cloudflare Tunnel + Nginx
free -h && docker stats --no-stream                     # memoria real vs límites
```

**A partir de aquí**: cada ejecución del workflow hace build → push → pull en el servidor → backup → migraciones → reemplazo → healthcheck
(→ rollback automático si falla). Para que corra solo en cada `push`, descomenta el bloque `push:` de `deploy_vs.yml`
(`develop` → staging, `main` → production) y deshabilita `deploy.yml` para evitar despliegues duplicados.

---

## 10. Migraciones en el día a día

1. Genera la migración en local (`npm run migration:generate -- src/database/migrations/NombreCambio`), revísala y commitea.
2. En el deploy, el paso `[4/6]` ejecuta `typeorm migration:run` **dentro de un contenedor descartable con la imagen nueva**,
   _antes_ de reemplazar `api`/`worker`. Si falla, el deploy se aborta y la versión en producción no se toca
   (TypeORM ejecuta las migraciones pendientes en una sola transacción).
3. **Rollback:** el rollback automático regresa la _imagen_, no la _base de datos_. Escribe migraciones retrocompatibles
   (agregar columnas/tablas nullable primero; borrar o renombrar en un deploy posterior) para que la versión anterior
   siga funcionando con el esquema nuevo.
4. Antes de cada migración se guarda `backups/pre-<tag>-<fecha>.sql.gz`.

---

## 11. Operación

```bash
cd /opt/payroll/<entorno>
export IMAGE_NAME=<usuario-dh>/payrollback-v2 IMAGE_TAG=$(cat .last_good_tag) ENVIRONMENT=<entorno>
alias dc='docker compose -p payroll-$ENVIRONMENT --env-file .env.deploy -f docker-compose.vps.yml'

dc ps                         # estado y health
dc logs -f --tail=100 api     # logs (también: worker, postgres, rabbitmq)
docker stats --no-stream      # consumo vs límites de memoria
docker system df              # uso de disco
```

- **Rollback manual:** `IMAGE_TAG=<sha-anterior> dc up -d --wait api worker` (se conservan localmente la imagen actual y la anterior).
- **Restaurar un backup:**
  ```bash
  dc stop api worker
  docker exec payroll-postgres-<entorno> sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"'
  gunzip -c backups/<archivo>.sql.gz | docker exec -i payroll-postgres-<entorno> sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
  dc up -d --wait api worker
  ```
- **RabbitMQ UI** (solo loopback): `ssh -L 15672:127.0.0.1:15672 deploy@<ip>` y abre `http://localhost:15672`.
- **Backup diario (recomendado en production)** — `crontab -e` como `deploy`:
  ```cron
  0 3 * * * docker exec payroll-postgres-production sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB"' | gzip > /opt/payroll/production/backups/daily-$(date +\%F).sql.gz && find /opt/payroll/production/backups -name 'daily-*.sql.gz' -mtime +14 -delete
  ```
  Copia además esos backups fuera del servidor (Object Storage de OCI, `rclone`, etc.): un backup en el mismo disco no protege ante la pérdida de la instancia.
- ⚠ **Nunca** uses `docker compose down -v` ni `docker volume rm`: borran la base de datos. `down` (sin `-v`) es seguro.

---

## 12. Servidor de producción más grande

Es el mismo compose y el mismo pipeline. En el `ENV_FILE` de `production` descomenta los overrides de la sección
final de `.env.vps.example` según la RAM disponible (ejemplo 8 GB: `POSTGRES_MEM_LIMIT=1g`, `PG_SHARED_BUFFERS=512MB`,
`API_MEM_LIMIT=1g`, `API_NODE_HEAP=768`, `WORKER_MEM_LIMIT=1g`, …). No se toca ningún YAML.

Si en producción prefieres un Postgres gestionado (p. ej. el de Azure) o Azure Service Bus en lugar de los contenedores,
basta con cambiar valores en el `ENV_FILE` (`POSTGRES_HOST`, `POSTGRES_SSL=true`, `MESSAGING_PROVIDER=servicebus`,
`SERVICE_MESSAGING_URL`); los contenedores locales que dejes de usar seguirán levantados consumiendo memoria — hoy ambos
entornos usan los servicios del compose a propósito, para mantener la paridad.

---

## 13. Presupuesto de memoria del servidor de 1 GB

| Servicio  | Límite por defecto                                 |
| --------- | -------------------------------------------------- |
| postgres  | 160 MB                                             |
| redis     | 64 MB                                              |
| rabbitmq  | 224 MB                                             |
| api       | 256 MB (heap Node 192)                             |
| worker    | 256 MB (heap Node 192)                             |
| **Total** | **~960 MB** + sistema operativo y Docker (~200 MB) |

Es intencionalmente ajustado: los límites evitan que un servicio arrastre a los demás, y el swap de 4 GB absorbe los picos.
Espera lentitud bajo carga en este servidor (CPU burstable); sirve para pruebas, no para medir rendimiento.
Si ves reinicios por OOM (`docker inspect <contenedor> --format '{{.State.OOMKilled}}'`), sube el límite del servicio afectado vía `ENV_FILE`.

Resumen del primer deploy (detalle en la guía, sección 9)

1. Prepara el servidor con las secciones 1 a 6 de la guía.
2. Carga los secrets de GitHub.
3. Lanza el workflow a mano. Esa primera corrida falla en el paso de migraciones, y es esperado. Deja el compose, el .env y la base de datos vacía arriba.
4. Restaura el dump.
5. Vuelve a lanzar el workflow.

Cuando elijas este pipeline, descomenta el bloque push y deshabilita deploy.yml.

echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJGRFEKTJ6IeMSKhKhElkyy9etCsMNLkLbHZ53IR3Em5 github-actions-deploy-staging" | sudo tee /home/deploy/.ssh/authorized_keys

ubuntu@payroll-server:~$ sudo -u deploy -i
deploy@payroll-server:~$ cd /opt/payroll/staging
deploy@payroll-server:/opt/payroll/staging$ pwd
/opt/payroll/staging
