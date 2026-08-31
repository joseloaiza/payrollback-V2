import { Module } from '@nestjs/common';
import { ConceptController } from './concept/concept.controller';
import { ConceptService } from './concept/concept.service';

import { MovementService } from './../movement/movement.service';
import { PeriodService } from './period/period.service';
import { PeriodController } from './period/period.controller';
import { RecurrentPaymentService } from './../novelties/recurrent-payment/recurrent-payment.service';
import { Concept } from './entities/concept.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenteeHistory } from './../novelties/entities/absenteeHistory.entity';
import { Movement } from './../movement/entities/movement.entity';
import { Period } from './entities/period.entity';
import { PayrollService } from './payroll/payroll.service';
import { PeriodStatusService } from './period-status/period-status.service';
import { PeriodStatusController } from './period-status/period-status.controller';
import { PeriodStatus } from './entities/periodStatus.entity';
import { CompanyPayment } from 'src/companies/entities/companyPayment.entity';
import { PayrollController } from './payroll/payroll.controller';
import { EmployeeService } from 'src/employees/employee/employee.service';
import { EmployeeSalaryService } from 'src/employees/employee-salary/employee-salary.service';
import { Employee } from 'src/employees/entities/employee.entity';
import { EmployeeSalary } from 'src/employees/entities/employee-salary.entity';
import { AbsenteeHistoryService } from 'src/novelties/absenteeism/absentee-history.service';
import { RecurrentPayment } from '../novelties/entities/recurrent-payment.entity';
import { Solidarity } from 'src/shared/entities/solidarity.entity';
import { SolidarityService } from 'src/shared/solidarity/solidarity.service';
import { AbsenteeCreatedListener } from './listeners/absentee-created.listener';
import { MovementRepository } from './../movement/movement.repository';
import { EmployeeRepository } from 'src/employees/employee/employee.repository';
import { EmployeeSalaryRepository } from 'src/employees/employee-salary/employee-salary.repository';
import { AbsenteeHistoryRepository } from 'src/novelties/absenteeism/absentee-history.repository';
import { ConceptRepository } from './concept/concept.repository';
import { PayrollRepository } from './payroll/payroll.repository';
import { CompanyPaymentService } from 'src/companies/company-payment/companyPayment.service';
import { PeriodRepository } from './period/period.repository';
import { PeriodStatusRepository } from './period-status/period-status.repository';
import { CompanyPaymentRepository } from 'src/companies/company-payment/comanyPayment.respository';
import { RecurrentPaymentRepository } from './../novelties/recurrent-payment/recurrent-payment.repository';
import { SolidarityRepository } from 'src/shared/solidarity/solidarity.repository';
import { CompanyPayrollService } from 'src/companies/company-payroll/companyPayroll.service';
import { CompanyPayrollRepository } from 'src/companies/company-payroll/company-payroll.repository';
import { CompanyPayroll } from 'src/companies/entities/companyPayroll.entity';
import { SharedConfigModule } from 'src/shared-config/shared-config.module';
//import { PayrollStatusListener } from './payroll/jobs/payroll-status-listener.service';
import { PayrollJobRepository } from './payroll/jobs/payroll-job.repository';
import { PayrollJob } from './entities/payroll-jobs.entity';
import { EmployeeFullView } from 'src/employees/entities/employee.view';

import { PayrollJobController } from './payroll/jobs/payroll-job.controller';
import { PayrollJobService } from './payroll/jobs/payroll-job.service';
import { Liquidation } from './entities/liquidation.entity';
import { ReasonContractTermination } from 'src/shared/entities/reasonContractTerminination.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Period,
      PeriodStatus,
      Movement,
      Concept,
      AbsenteeHistory,
      CompanyPayment,
      Employee,
      EmployeeFullView,
      EmployeeSalary,
      RecurrentPayment,
      Solidarity,
      CompanyPayroll,
      PayrollJob,
      Liquidation,
      ReasonContractTermination,
    ]),
    SharedConfigModule,
  ],
  controllers: [
    ConceptController,
    PeriodController,
    PeriodStatusController,
    PayrollController,
    PayrollJobController,
  ],
  providers: [
    ConceptService,
    MovementService,
    PeriodService,
    RecurrentPaymentService,
    PeriodStatusService,
    PayrollService,
    EmployeeService,
    EmployeeSalaryService,
    MovementService,
    AbsenteeHistoryService,
    SolidarityService,
    ConceptService,
    CompanyPayrollService,
    CompanyPaymentService,
    //PayrollStatusListener,
    AbsenteeCreatedListener,
    MovementRepository,
    EmployeeRepository,
    EmployeeSalaryRepository,
    AbsenteeHistoryRepository,
    ConceptRepository,
    PayrollRepository,
    PeriodRepository,
    PeriodStatusRepository,
    CompanyPaymentRepository,
    RecurrentPaymentRepository,
    SolidarityRepository,
    CompanyPayrollRepository,
    PayrollJobRepository,
    PayrollJobService,
  ],
  exports: [
    PayrollService,
    //PayrollStatusListener,
    MovementRepository,
    EmployeeRepository,
    ConceptRepository,
    CompanyPayrollRepository,
    PayrollJobRepository,
  ],
})
export class PayrollModule {}
