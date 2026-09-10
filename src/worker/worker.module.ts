import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PayrollProcessingModule } from '../payroll-processing/payroll-processing.module';
import { HealthController } from './health/health.controller';

// Módulos exclusivos del proceso worker: el motor de cálculo (escucha la
// cola vía MessagingClient, sin importar si el proveedor activo es RabbitMQ
// o Azure Service Bus) y el cron que encola los jobs.
@Module({
  imports: [ScheduleModule.forRoot(), PayrollProcessingModule],
  controllers: [HealthController],
})
export class WorkerModule {}
