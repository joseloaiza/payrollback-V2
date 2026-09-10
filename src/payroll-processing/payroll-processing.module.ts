import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesConfigModule } from 'src/config/codes-config.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { MovementModule } from 'src/movement/movement.module';
import { PayrollJob } from 'src/jobs/payroll-jobs.entity';
import { PayrollEmployeeSnapshot } from 'src/snapshot/entitiy/payroll_employee_snapshot.entity';
import { PayrollEmployeeSnapshotInput } from 'src/snapshot/entitiy/payroll_employee_snapshot-input.entity';
import { PayrollInputCatalog } from 'src/snapshot/entitiy/payroll-input-catalog.entity';
import { Liquidation } from 'src/liquidation/entities/liquidation.entity';
import { NoveltiesModule } from 'src/novelties/novelties.module';
import { SocialSecurityModule } from 'src/social-security/social-security.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { ProvisionsModule } from 'src/provisions/provisions.module';
import { ConceptsModule } from 'src/concepts/concepts.module';
import { CorePayrollCalculatorService } from './core-payroll-calculator.service';
import { Excess1393CalculatorService } from './excess1393-calculator.service';
import { PayrollContextBuilderService } from './payroll-context-builder.service';
import { PayrollCalculationContext } from './payroll-context';
import { PayrollSchedulerService } from './payroll-scheduler.service';
import { PayrollProcessor } from './payroll.processor';
import { PayrollService } from './payroll.service';
import { TransportCalculatorService } from './transport-calculator.service';
import { PeriodModule } from 'src/period/period.module';
import { SnapshotModule } from 'src/snapshot/snapshot.module';
import { LiquidationRepository } from 'src/liquidation/liquidation.repository';
import { PayrollJobRepository } from 'src/jobs/payroll-job.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PayrollJob,
      PayrollEmployeeSnapshot,
      PayrollEmployeeSnapshotInput,
      PayrollInputCatalog,
      Liquidation,
    ]),
    ConceptsModule,
    EmployeesModule,
    MovementModule,
    CodesConfigModule,
    NoveltiesModule,
    SocialSecurityModule,
    CompaniesModule,
    ProvisionsModule,
    PeriodModule,
    SnapshotModule,
  ],
  controllers: [PayrollProcessor],
  providers: [
    CorePayrollCalculatorService,
    Excess1393CalculatorService,
    PayrollContextBuilderService,
    PayrollCalculationContext,
    PayrollSchedulerService,
    PayrollService,
    TransportCalculatorService,
    LiquidationRepository,
    PayrollJobRepository,
  ],
  exports: [PayrollService, PayrollSchedulerService],
})
export class PayrollProcessingModule {}
