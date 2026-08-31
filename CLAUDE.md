# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run start:dev       # Start with watch mode
npm run start:debug     # Start with debugger on 0.0.0.0:9230

# Build & Production
npm run build           # Compile TypeScript to dist/
npm run start:prod      # Run compiled dist/main.js

# Testing
npm run test            # Unit tests
npm run test:watch      # Unit tests in watch mode
npm run test:cov        # Coverage report
npm run test:e2e        # End-to-end tests

# Code Quality
npm run lint            # ESLint with auto-fix
npm run format          # Prettier formatting

# Docker (dev)
make dev                # Build and start docker-compose.dev.yml
```

## Architecture

**Stack**: NestJS + TypeScript, TypeORM + PostgreSQL, JWT/Passport auth, Winston logging, Swagger at `/api/docs`.

### Module Structure

Each feature module follows: `Controller → Service → Repository → Entity`, with DTOs for validation. Modules are co-located with their controllers, services, repositories, and entities.

Key modules:
- `src/payroll/` — Core payroll processing: period lifecycle, concepts (earnings/deductions), jobs
- `src/employees/` — Employee data, salary, job, contract, payment, social security
- `src/novelties/` — HR novelties: absenteeism, non-recurring payments, recurrent payments
- `src/social-security/` — Social security calculations
- `src/companies/` — Company payroll and payment config
- `src/auth/` — JWT + Passport strategies (local, JWT, Google OAuth), guards
- `src/shared/` — Lookup tables (City, State, Country, Bank, PaymentMethod, etc.)
- `src/exports/` — Excel export via xlsx
- `src/messaging/` — Message queue abstraction (Azure Service Bus or RabbitMQ)
- `src/database/` — TypeORM setup, `BaseRepository<T>`, `AbstractEntity`
- `src/utils/` — `DynamicFilterService` for generic pagination/filtering

### Key Patterns

**Repository Pattern**: All data access goes through `BaseRepository<T>` (`src/database/base.repository.ts`), which wraps TypeORM and integrates with `DynamicFilterService` for filtering and pagination.

**Event-Driven**: `@nestjs/event-emitter` for inter-module communication. Listeners live in `src/payroll/listeners/` (e.g., `absentee-created`, `novelty-created`).

**Messaging Abstraction**: `MessagingClient` interface in `src/messaging/` supports either Azure Service Bus (production) or RabbitMQ (dev), selected via `MESSAGING_PROVIDER` env var using a factory pattern.

**Global Exception Handling**: `AllExceptionsFilter` (`src/common/filters/`) catches all exceptions and logs via Winston.

**DTO Validation**: All input DTOs use `class-validator` decorators with NestJS global `ValidationPipe`.

### Database

- **synchronize: false** — schema changes require migrations, not auto-sync
- Entities use `AbstractEntity` base class (`src/database/abstract.entity.ts`)
- SSL configurable via `POSTGRES_SSL` env var

### Configuration

Environment files: `.env.development`, `.env.production`, `.env.test`. Key variables:

| Variable | Purpose |
|----------|---------|
| `POSTGRES_*` | DB connection (host, port, user, password, db, ssl) |
| `JWT_SECRET`, `JWT_EXPIRATION` | Auth tokens |
| `MESSAGING_PROVIDER` | `servicebus` or `rabbitmq` |
| `SERVICEBUS_CONNECTION_STRING` | Azure Service Bus |
| `RABBITMQ_URL` | RabbitMQ URI |
| `MAIL_*` | Email service config |
| `FRONTEND_URL` | CORS origin |
| `USE_JSON_LOGGER` | Toggle JSON log format |
