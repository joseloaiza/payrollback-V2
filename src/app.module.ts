import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinstonModule } from 'nest-winston';
import * as dotenv from 'dotenv';
import configuration from './config/config';
import { LoggerFactory } from './common/logger/logger-factory';
import { DatabaseModule } from './database/database.module';
import { MessagingModule } from './messaging/messaging.module';
import { CompaniesModule } from './companies/companies.module';
import { EmployeesModule } from './employees/employees.module';
import { NoveltiesModule } from './novelties/novelties.module';
import { SocialSecurityModule } from './social-security/social-security.module';
import { MovementModule } from './movement/movement.module';
import { SharedModule } from './shared/shared.module';
import { SharedConfigModule } from './shared-config/shared-config.module';
import { ConceptsModule } from './concepts/concepts.module';
import { PeriodModule } from './period/period.module';
import { JobsModule } from './jobs/jobs.module';
import { SnapshotModule } from './snapshot/snapshot.module';
import { WebModule } from './web/web.module';
import { WorkerModule } from './worker/worker.module';

dotenv.config();

type ProcessType = 'web' | 'worker';

function getProcessType(): ProcessType {
  const value = (process.env.PROCESS_TYPE ?? 'web') as ProcessType;
  if (value !== 'web' && value !== 'worker') {
    throw new Error(
      `PROCESS_TYPE inválido: "${value}". Valores permitidos: "web" | "worker".`,
    );
  }
  return value;
}

const processType = getProcessType();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    // Caché en memoria (mismo comportamiento que tenía payroll-worker antes
    // de esta migración). Conectar Redis real queda como mejora futura.
    CacheModule.register({ isGlobal: true }),
    // NoveltiesModule (compartido) depende de EventEmitter2 - debe cargarse
    // en ambos procesos, no solo en el web.
    EventEmitterModule.forRoot(),
    WinstonModule.forRoot(
      LoggerFactory(processType === 'worker' ? 'PayrollWorker' : 'PayrollAPI'),
    ),
    // Compartidos: los usan tanto el CRUD web (payroll/) como el motor de
    // cálculo (payroll-processing/).
    DatabaseModule,
    MessagingModule,
    CompaniesModule,
    EmployeesModule,
    NoveltiesModule,
    SocialSecurityModule,
    MovementModule, // make it global
    SharedModule,
    SharedConfigModule,
    ConceptsModule,
    PeriodModule,
    JobsModule,
    SnapshotModule,
    // Exclusivo de cada proceso, según PROCESS_TYPE.
    ...(processType === 'web' ? [WebModule] : [WorkerModule]),
  ],
})
export class AppModule {}
