import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { CompaniesModule } from './companies/companies.module';
import { PayrollModule } from './payroll/payroll.module';
import { AttendanceModule } from './attendance/attendance.module';
import { BenefitsModule } from './benefits/benefits.module';
import { ReportsModule } from './reports/reports.module';
import { ComplianceModule } from './compliance/compliance.module';
import { NotificationsModule } from './notifications/notification.module';
import { IntegrationModule } from './integration/integration.module';
import { EmployeesModule } from './employees/employees.module';
import { SharedModule } from './shared/shared.module';
import { DeductionsModule } from './deductions/deductions.module';
import { BonusesModule } from './bonuses/bonuses.module';
import { CostCentersModule } from './cost-centers/cost-centers.module';
import { TimeTrackingModule } from './time-tracking/time-tracking.module';
import { BankingModule } from './banking/banking.module';
import { NoveltiesModule } from './novelties/novelties.module';
import configuration from './config/config';
import * as dotenv from 'dotenv';
import { SocialSecurityModule } from './social-security/social-security.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerFactory } from './common/logger/logger-factory';
import { WinstonModule } from 'nest-winston';
import { MovementModule } from './movement/movement.module';
import { ExportsModule } from './exports/exports.module';
import { SharedConfigModule } from './shared-config/shared-config.module';
import { MessagingModule } from './messaging/messaging.module';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 60000, limit: 10 },
      { name: 'medium', ttl: 60000, limit: 100 },
      { name: 'long', ttl: 3600000, limit: 1000 },
    ]),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
    MailModule,
    CompaniesModule,
    PayrollModule,
    AttendanceModule,
    BenefitsModule,
    ReportsModule,
    ComplianceModule,
    NotificationsModule,
    IntegrationModule,
    EmployeesModule,
    SharedModule,
    DeductionsModule,
    BonusesModule,
    CostCentersModule,
    TimeTrackingModule,
    BankingModule,
    NoveltiesModule,
    ConfigModule,
    SocialSecurityModule,
    WinstonModule.forRoot(LoggerFactory('PayrollAPI')),
    MovementModule, // make it global
    ExportsModule,
    SharedConfigModule,
    MessagingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  exports: [],
})
export class AppModule {}
