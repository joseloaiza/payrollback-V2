import { Module } from '@nestjs/common';
import { ExportsController } from './exports.controller';
import { ExportsService } from './exports.service';
import { CompanyService } from '../companies/company/company.service';
import { CompanyRepository } from '../companies/company/company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../companies/entities/company.entity';
import { CompanyPayment } from '../companies/entities/companyPayment.entity';
import { CompanyPaymentRepository } from '../companies/company-payment/comanyPayment.respository';
import { CompanyPaymentService } from '../companies/company-payment/companyPayment.service';
import { PayrollService } from '../payroll/payroll.service';
import { PayrollRepository } from '../payroll/payroll.repository';
import { Period } from '../period/entities/period.entity';
import { Movement } from '../movement/entities/movement.entity';
import { PeriodStatus } from '../period/entities/periodStatus.entity';
import { Concept } from '../concepts/concept.entity';
import { AbsenteeHistory } from '../novelties/entities/absenteeHistory.entity';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeeSalary } from '../employees/entities/employee-salary.entity';
import { RecurrentPayment } from '../novelties/entities/recurrent-payment.entity';
import { Solidarity } from '../shared/entities/solidarity.entity';
import { MovementRepository } from '../movement/movement.repository';
import { EmployeeRepository } from '../employees/employee/employee.repository';
import { EmployeeSalaryRepository } from '../employees/employee-salary/employee-salary.repository';
import { ConceptRepository } from '../concepts/concept.repository';
import { AbsenteeHistoryRepository } from '../novelties/absenteeism/absentee-history.repository';
import { PeriodStatusRepository } from '../period/period-status/period-status.repository';
import { RecurrentPaymentRepository } from '../novelties/recurrent-payment/recurrent-payment.repository';
import { SolidarityRepository } from '../shared/solidarity/solidarity.repository';
import { PeriodRepository } from '../period/period.repository';
import { ConceptService } from '../concepts/concepts.service';
import { MovementService } from '../movement/movement.service';
import { PeriodService } from '../period/period.service';
import { PeriodStatusService } from '../period/period-status/period-status.service';
import { RecurrentPaymentService } from '../novelties/recurrent-payment/recurrent-payment.service';
import { EmployeeService } from '../employees/employee/employee.service';
import { EmployeeSalaryService } from '../employees/employee-salary/employee-salary.service';
import { AbsenteeHistoryService } from '../novelties/absenteeism/absentee-history.service';
import { SolidarityService } from '../shared/solidarity/solidarity.service';
import { AbsenteeCreatedListener } from '../payroll/listeners/absentee-created.listener';
import { EmployeePaymentService } from '../employees/employee-payment/employee-payment.service';
import { BankService } from '../shared/bank/bank.service';
import { EmployeePaymentRepository } from '../employees/employee-payment/employee-payment.repository';
import { BankRepository } from '../shared/bank/bank.repository';
import { Bank } from '../shared/entities/bank.entity';
import { EmployeePayment } from '../employees/entities/employee-payment.entity';
import { AccountType } from '../shared/entities/account-type.entity';
import { AccountTypeService } from '../shared/account-type/account-type.service';
import { AccountTypeRepository } from '../shared/account-type/accoun-type.repository';
import { CompanyPayrollRepository } from '../companies/company-payroll/company-payroll.repository';
import { CompanyPayrollService } from '../companies/company-payroll/companyPayroll.service';
import { CompanyPayroll } from '../companies/entities/companyPayroll.entity';
import { SharedConfigModule } from '../shared-config/shared-config.module';
import { PayrollModule } from 'src/payroll/payroll.module';
import { JobsModule } from 'src/jobs/jobs.module';
import { CodesConfigModule } from 'src/config/codes-config.module';
import { EmployeeFullView } from 'src/employees/entities/employee.view';
import { EmployeeContract } from 'src/employees/entities/employee-contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      CompanyPayment,
      Period,
      PeriodStatus,
      Movement,
      Concept,
      AbsenteeHistory,
      Employee,
      EmployeeFullView,
      EmployeeSalary,
      RecurrentPayment,
      Solidarity,
      Bank,
      EmployeePayment,
      AccountType,
      CompanyPayroll,
      EmployeeContract,
    ]),
    PayrollModule,
    SharedConfigModule,
    JobsModule,
    CodesConfigModule,
  ],
  controllers: [ExportsController],
  providers: [
    ExportsService,
    CompanyService,
    CompanyPaymentService,
    PayrollService,
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
    CompanyPaymentService,
    EmployeePaymentService,
    BankService,
    AccountTypeService,
    PayrollService,
    CompanyPayrollService,
    AbsenteeCreatedListener,
    CompanyRepository,
    CompanyPaymentRepository,
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
    EmployeePaymentRepository,
    BankRepository,
    AccountTypeRepository,
    PayrollRepository,
    CompanyPayrollRepository,
  ],
})
export class ExportsModule {}
