import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { PayrollModule } from '../payroll/payroll.module';
import { ReportsModule } from '../reports/reports.module';
import { IntegrationModule } from '../integration/integration.module';
import { CostCentersModule } from '../cost-centers/cost-centers.module';
import { TimeTrackingModule } from '../time-tracking/time-tracking.module';
import { ExportsModule } from '../exports/exports.module';

// Módulos exclusivos del proceso web (API HTTP pública, Swagger, auth).
// Todo lo que también necesita el worker (Companies, Employees, Novelties,
// SocialSecurity, Movement, Concepts, Period, Jobs, Snapshot, Messaging,
// Database) queda registrado directo en AppModule, no aquí.
@Module({
  imports: [
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 60000, limit: 10 },
      { name: 'medium', ttl: 60000, limit: 100 },
      { name: 'long', ttl: 3600000, limit: 1000 },
    ]),
    AuthModule,
    UsersModule,
    MailModule,
    PayrollModule,
    ReportsModule,
    IntegrationModule,
    CostCentersModule,
    TimeTrackingModule,
    ExportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class WebModule {}
