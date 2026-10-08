# Migración a monolito modular — contexto y estado

> Documento de continuidad para retomar este trabajo en una sesión nueva de Claude Code.
> Última actualización: 2026-09-09.

## 1. Objetivo del proyecto

Unificar dos repos NestJS separados — `payrollback` (API web) y `payroll-worker` (worker de
cálculo de nómina) — en **un solo repo/proyecto**, eliminando la duplicación real de dominio
(entidades, migraciones, utils) que tenían al ser dos bases de código independientes, sin perder
el despliegue/escalado independiente en producción (2 Azure Container Apps).

**Decisión arquitectónica tomada:** Monolito Modular con arranque dinámico por
`PROCESS_TYPE=web|worker`, NO monorepo con Nx/Turborepo. Un único `package.json`/`AppModule`,
una sola imagen Docker, dos contenedores diferenciados solo por la variable de entorno
`PROCESS_TYPE` en runtime. Razón: el problema real era gobernanza de un modelo de dominio
compartido (entidades duplicadas y divergentes, dos historiales de migración contra la misma
BD), no tooling de build — con un único codebase es estructuralmente imposible que las entidades
vuelvan a divergir.

## 2. Dónde está todo

- **Proyecto actual**: `/Users/joseloaiza/projects/personal/payroll/payrollBack` (repo git propio,
  commits `8c66811` → `e0c9189`, y ~208 archivos con cambios sin comitear a día de hoy — incluye
  tanto reorganización manual del usuario como las correcciones de esta sesión).
- **Repos originales (fuente, ya no se tocan)**: `/Users/joseloaiza/projects/personal/payroll/backend/payrollback`
  y `/Users/joseloaiza/projects/personal/payroll/backend/payroll-worker` — se mantienen intactos
  como archivo de solo lectura.
- El proyecto se movió/renombró una vez de `backend/payroll-monolith` → `payrollBack` (mismo
  historial git). Los `docker-compose.*.yml` y `Dockerfile` viven en la raíz de `payrollBack`
  desde ese movimiento.
- **Historia Git**: se decidió NO preservar el historial commit-por-commit de los dos repos
  viejos — el repo `payrollBack` arrancó con un commit inicial único que capturaba el estado ya
  corregido (squash), no importación con `git filter-repo`.

## 3. Qué se hizo (etapas completadas)

### Etapa 0 — Esqueleto + capa de datos corregida
- Creado el proyecto copiando la base de `payrollback` (tenía más piezas ya listas: Swagger,
  guards, Winston, `MessagingModule`).
- **Auditoría real contra el Postgres de dev** (no asunciones) de 4 entidades que colisionaban
  por nombre entre los dos repos originales:
  - `employee.entity.ts` → versión de payrollback correcta (tiene las 6 relaciones FK reales).
  - `payrollConstants.entity.ts` → **invirtió la hipótesis inicial**: el `id` real es
    `varchar(5)` (código corto tipo "SMLV"), no UUID. La versión de payrollback estaba mal
    (`@PrimaryGeneratedColumn('uuid')`) y además duplicada 2 veces dentro del propio payrollback.
    Se adoptó la forma del worker.
  - `liquidation.entity.ts` → también invertida: payrollback le faltaban 3 columnas NOT NULL
    reales (`employee_id`/`company_id`/`period_id`). Entidad unificada = columnas del worker +
    relación `ManyToOne` a `ReasonContractTermination` que sí tenía payrollback.
  - `payroll_jobs.entity.ts` → la columna real en Postgres se llama `liquidatation_id` (typo
    histórico agregado fuera del sistema de migraciones). Se mapeó explícitamente con
    `@Column({ name: 'liquidatation_id' })` en vez de corregir la BD (esa corrección queda
    pendiente para cuando se unifiquen las migraciones).
  - Encontrada y confirmada una **fila huérfana en la tabla `migrations`** (control de TypeORM):
    `CreateLiquidationMovement1747526400000` sin archivo fuente correspondiente en ningún repo
    ni en git — evidencia de que alguna migración se corrió fuera del flujo normal alguna vez.
    **No resuelto todavía.**
- Commit inicial `8c66811`.

### Etapa 5 — Motor de cálculo del worker (`payroll-processing/`)
- Trasladado el motor de cálculo completo de `payroll-worker/src/payroll/` (processor, 12 pasos
  de cálculo, absenteeism/social-security/provisions/snapshot, config de caché) a una carpeta
  nueva, **sin sobreescribir** `src/payroll/` de payrollback (que es el CRUD/admin web — mismos
  nombres de clase, `PayrollModule`/`PayrollService`/`Period`/`Concept`/`PayrollJob`, pero
  implementaciones totalmente distintas).
- Entidades confirmadas idénticas o reconciliadas entre los dos repos **no se duplicaron**:
  `Concept`, `Period`, `PeriodStatus`, `Solidarity`, `CodesConfig` (idénticas), `Employee`,
  `EmployeeContract`, `Company`, `CompanyPayroll`, `CompanyPayment`, `PaymentFrequency`,
  `Movement`, `RecurrentPayment` (funcionalmente idénticas, solo rutas de import distintas).
- Encontrado y corregido: `absenteeHistory.entity.ts` tenía transformers de fecha reales que
  faltaban en la versión de payrollback (bug real, no cosmético).
- Eliminada una entidad duplicada muerta *dentro del propio payrollback*:
  `src/payroll/entities/reasons-contract-termination.entity.ts` (cero importadores).
- Portado también `src/liquidation/` completo del worker (repository + interfaces), que ningún
  análisis previo había detectado.
- Commit `e0c9189`.

### Movimiento de directorio + reorganización manual del usuario
- El proyecto se movió a `payrollBack`. Entre sesiones, **el usuario reorganizó manualmente**
  `src/payroll-processing/` sacando la mayoría de sus carpetas a nivel superior de `src/`:
  `concepts/`, `period/`, `jobs/`, `config/`, `constants/`, `interfaces/`, `liquidation/`,
  `provisions/`, `snapshot/`. `src/payroll-processing/` quedó con ~12 archivos (el motor de
  cálculo en sí) más un `payroll-processing.module.ts` nuevo. Esta reorganización resultó
  **funcionalmente sólida** (compilaba limpio) pero tenía huecos de wiring de DI (ver Etapa 6).

### Etapa 6 (Parte A+B COMPLETADA) — Split web/worker, verificado con arranque real
- Creados `src/web/web.module.ts`, `src/worker/worker.module.ts` +
  `src/worker/health/health.controller.ts` (`GET /health`, chequea `dataSource.isInitialized`,
  para probes de Azure Container Apps — el worker no sirve tráfico público, es el único endpoint
  HTTP que expone).
- Reescritos `src/app.module.ts` (imports compartidos siempre + `WebModule`/`WorkerModule`
  condicional por `PROCESS_TYPE`) y `src/main.ts` (bootstrap dinámico: web con
  Swagger/Helmet/CORS completos en `/api/docs`; worker minimalista, solo `ValidationPipe` +
  logger + `/health`).
- **Verificado arrancando de verdad** (no solo `tsc --noEmit`) ambos modos contra Postgres y
  RabbitMQ reales corriendo en Docker:
  - `PROCESS_TYPE=worker` → conecta a RabbitMQ (`🎧 Subscribed to queue: payroll-jobs-dev`),
    carga codes-config/payroll-constants, conecta a BD, `/health` responde
    `{"status":"ok","processType":"worker","db":"connected"}`.
  - `PROCESS_TYPE=web` → arranca completo, `GET /api/docs` responde 200.
- **9 bugs reales de wiring de DI** encontrados y corregidos en el camino (ninguno lo detecta
  `tsc`, solo se ven al intentar levantar la app de verdad con Nest):
  1. `PeriodModule`/`ConceptsModule` no tenían `TypeOrmModule.forFeature` propio ni todos sus
     repositorios/servicios internos declarados.
  2. `CompaniesModule` no exportaba `CompanyService`/`CompanyPaymentService`/
     `CompanyPayrollService` que otros módulos ya necesitaban.
  3. `MovementModule` no exportaba nada en absoluto.
  4. `SharedModule` no exportaba `SolidarityService`.
  5. `SocialSecurityModule` le faltaba `Solidarity` en su propio `TypeOrmModule.forFeature`
     (la entidad ya estaba deduplicada, pero cada módulo necesita su propio registro de
     TypeORM para poder inyectar `Repository<T>` — importar el módulo no basta).
  6. `JobsModule` no exportaba `PayrollJobRepository`.
  7. `NoveltiesModule` no exportaba `AbsenteeHistoryService`/`RecurrentPaymentService`, y le
     faltaba `EmployeeContract` en su propio `forFeature` (usa una copia local de
     `EmployeeRepository`, patrón pre-existente — ver sección "deuda técnica" abajo).
  8. `EventEmitterModule.forRoot()` estaba pensado como "solo web" pero `NoveltiesModule`
     (compartido) lo necesita — se movió a los imports compartidos de `AppModule`.
  9. `ExportsModule` (otro "god module" con copias locales) necesitaba los mismos ajustes que
     `NoveltiesModule` (`EmployeeContract`, `CodesConfigModule`, `JobsModule` en sus imports),
     más un bug real aparte: tenía `PayrollRepository` (una clase, no una entidad) metida por
     error dentro de `TypeOrmModule.forFeature([...])` — eliminado.

## 4. Qué falta (en orden sugerido)

1. **Etapa 6 Parte C — Docker Compose y `.env`** (siguiente paso natural, no empezado):
   - `Dockerfile`: agregar `ENV PROCESS_TYPE=web` como default en el stage runtime.
   - `docker-compose.dev.yml` / `.prd.yml` / `.test.yml`: los 3 todavía tienen dos servicios
     (`payroll-api`, `payroll-worker`) apuntando a `build.context: ./payrollback` y
     `./payroll-worker` — **rutas obsoletas** de cuando eran 2 repos separados, ya no existen
     relativas a la raíz actual `payrollBack`. Cambiar ambos a
     `build: { context: ., dockerfile: Dockerfile }` (mismo repo unificado), diferenciados por
     `environment: PROCESS_TYPE=web|worker` y `PORT=3000|3001`.
   - `.env.development` / `.env.test`: faltan `EXECUTE_PAYROLL_CRON`, `PAYROLL_SCHEDULE_CRON`,
     `TZ=America/Bogota` (necesarios para `PayrollSchedulerService`, el cron que encola jobs).
   - `.env.production`: faltan `PAYROLL_JOBS_QUEUE`, `LIQUIDATION_JOBS_QUEUE`,
     `PAYROLL_STATUS_QUEUE` (el processor/scheduler leen estos nombres de cola sin importar el
     proveedor de mensajería — hoy solo están en dev/test) y también
     `EXECUTE_PAYROLL_CRON`/`PAYROLL_SCHEDULE_CRON`/`TZ`.
   - Nota: caché en memoria (`CacheModule.register`, ya implementado) fue decisión explícita del
     usuario — el contenedor `redis` del compose existe pero no se usa; conectarlo de verdad
     queda fuera de alcance salvo que se pida.
2. **Decidir y ejecutar el commit** de los ~208 archivos pendientes en `payrollBack` (incluye la
   reorganización manual del usuario + todas las correcciones de la Etapa 6). No se ha hecho
   todavía porque no se ha pedido explícitamente.
3. **Unificar `date_utilities.ts`**: `src/utils/date_utilities.ts` (payrollback, con cálculo de
   festivos colombianos Ley Emiliani) y `src/utils/date-utilities.ts` (copiado del worker, con
   `convertDateToUTC`/`differenceInDays360`) siguen coexistiendo como archivos paralelos
   temporales — nunca se fusionaron. Auditar call sites del código del worker portado que hacían
   cómputo de días sin acceso a `isColombiaHoliday` (posible bug de cálculo de
   liquidación/provisiones pre-existente, ahora visible).
4. **Unificar las migraciones**: sigue habiendo un solo riesgo activo sin resolver — la fila
   huérfana en `migrations` (ver Etapa 0) y el typo `liquidatation_id` en la BD real. Estrategia
   ya definida en sesiones previas: "baseline squash" (correr `typeorm migration:generate`
   contra dev con el entity set ya reconciliado, resolver cualquier diff, crear una migración
   marcador única, archivar las viejas). **No se pudo auditar la tabla `migrations` de
   producción** (Postgres de Azure no resuelve DNS desde esta máquina) — hacerlo antes de tocar
   nada en producción.
5. **CI/CD**: unificar los pipelines de GitHub Actions (hoy cada repo original tenía el suyo,
   con drift real entre ellos) en uno solo parametrizado por `PROCESS_TYPE`/target de Container
   App. No empezado.
6. **Deploy real a dev/staging**: una vez lista la Parte C, desplegar a Azure Container Apps
   (2 Container Apps, misma imagen de ACR, diferenciadas por `PROCESS_TYPE`), validar `/health`
   del worker y `/api/docs` del web ahí, antes de promover a prod.

## 5. Deuda técnica conocida (no bloqueante, documentada a propósito)

- **`NoveltiesModule` y `ExportsModule` son "god modules"**: re-declaran copias locales propias
  de servicios/repositorios que ya existen correctamente en sus módulos dueños (`EmployeeService`,
  `EmployeeRepository`, `MovementService`, etc.) en vez de importar esos módulos y reusar sus
  exports. Funciona (cada copia tiene su propio `TypeOrmModule.forFeature` correcto ahora), pero
  significa que hay múltiples instancias de la misma lógica coexistiendo. No se refactorizó
  porque es un patrón pre-existente de payrollback, no algo introducido por esta migración —
  limpiarlo es un cambio de arquitectura más grande, deliberadamente fuera de alcance por ahora.
- **`PeriodService` duplicado**: `src/period/period.service.ts` (el real, usado por
  `payroll-scheduler.service.ts`) vs `src/config/period/period.service.ts` (stub casi vacío,
  registrado como provider en `CodesConfigModule` pero nunca exportado ni usado por nadie más —
  inerte, no rompe nada, pero es ruido). No eliminado todavía.
- **`PayrollConstantsService` duplicado**: `src/config/payroll-constants/payroll-constants.service.ts`
  (usado por los calculadores portados del worker) vs `src/shared-config/constants/constants.service.ts`
  (el original de payrollback, usado por `no-recurrent-novelty.service.ts`). Ambos leen la misma
  entidad `PayrollConstants` ya corregida — se dejan coexistir a propósito, bajo riesgo.
- El rename `Movement`/`Movements`, `Employee`/`Employees`, `Company`/`Companies` que se planeó
  originalmente quedó resuelto de facto por cómo se ejecutó el port real (no fue necesario un
  paso de rename explícito).

## 6. Cómo verificar que todo sigue funcionando (repetir tras cualquier cambio)

```bash
cd /Users/joseloaiza/projects/personal/payroll/payrollBack

# 1. Compilación
npx tsc --noEmit -p tsconfig.build.json   # debe dar 0 errores
yarn build

# 2. Levantar infra de dev (si no está corriendo)
docker compose -f docker-compose.dev.yml up -d rabbitmq postgres

# 3. Arranque real en modo worker (el único chequeo que detecta bugs de DI wiring)
PROCESS_TYPE=worker NODE_ENV=development POSTGRES_HOST=localhost POSTGRES_PORT=5433 PORT=3001 \
  node dist/main.js
# esperar: "🎧 Subscribed to queue: payroll-jobs-dev" y "Nest application successfully started"
curl http://localhost:3001/health   # {"status":"ok",...}

# 4. Arranque real en modo web
PROCESS_TYPE=web NODE_ENV=development POSTGRES_HOST=localhost POSTGRES_PORT=5433 PORT=3000 \
  node dist/main.js
curl -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/docs   # 200
```

Nota: `POSTGRES_HOST=postgres`/`POSTGRES_PORT=5432` en los `.env.*` son para dentro de la red de
Docker; al correr `node dist/main.js` directo en el host (fuera de un contenedor), hay que
sobreescribir a `localhost`/`5433` (el puerto mapeado en `docker-compose.dev.yml`).
