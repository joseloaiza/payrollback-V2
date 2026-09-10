import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NoRecurrentNoveltyService } from './non-recurring/no-recurrent-novelty.service';
import { ConceptService } from 'src/concepts/concepts.service';
import { PeriodService } from 'src/period/period.service';
import { EmployeeSalaryService } from 'src/employees/employee-salary/employee-salary.service';
import { EmployeeService } from './../employees/employee/employee.service';
import { NoRecurrentNovelyController } from './non-recurring/no-recurrent-novelty.controller';
import { Concept } from 'src/concepts/concept.entity';
import { Period } from 'src/period/entities/period.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { PeriodStatus } from 'src/period/entities/periodStatus.entity';
import { CompanyPayment } from 'src/companies/entities/companyPayment.entity';
import { Movement } from 'src/movement/entities/movement.entity';
import { RecurrentPayment } from 'src/novelties/entities/recurrent-payment.entity';
import { EmployeeSalary } from 'src/employees/entities/employee-salary.entity';
import { AbsenteeHistory } from 'src/novelties/entities/absenteeHistory.entity';
import { Solidarity } from 'src/shared/entities/solidarity.entity';
import { DiagnosisController } from './diagnosis/diagnosis.controller';
import { AbsenteeTypeController } from './absentee-type/absentee-type.controller';
import { AbsenteeHistoryController } from './absenteeism/absentee-history.controller';
import { DiagnosisService } from './diagnosis/diagnosis.service';
import { AbsenteeTypeService } from './absentee-type/absentee-type.service';
import { AbsenteeHistoryService } from './absenteeism/absentee-history.service';
import { Diagnosis } from './entities/diagnosis.entity';
import { AbsenteeType } from './entities/absentee-type.entity';
import { MovementService } from 'src/movement/movement.service';
import { MovementRepository } from 'src/movement/movement.repository';
import { NoveltiesRepository } from './non-recurring/no-recurrent-novelty.repository';
import { EmployeeRepository } from 'src/employees/employee/employee.repository';
import { EmployeeSalaryRepository } from 'src/employees/employee-salary/employee-salary.repository';
import { AbsenteeHistoryRepository } from './absenteeism/absentee-history.repository';
import { AbsenteeTypeRepository } from './absentee-type/absentee-type.repository';
import { DiagnosisRepository } from './diagnosis/diagnosis.repository';
import { Novelties } from './entities/novelties.entity';
import { ConceptRepository } from 'src/concepts/concept.repository';
import { CompanyPaymentService } from 'src/companies/company-payment/companyPayment.service';
import { PeriodRepository } from 'src/period/period.repository';
import { PeriodStatusService } from 'src/period/period-status/period-status.service';
import { CompanyPaymentRepository } from 'src/companies/company-payment/comanyPayment.respository';
import { PeriodStatusRepository } from 'src/period/period-status/period-status.repository';
import { RecurrentPaymentController } from './recurrent-payment/recurrent-payment.controller';
import { RecurrentPaymentService } from './recurrent-payment/recurrent-payment.service';
import { RecurrentPaymentRepository } from './recurrent-payment/recurrent-payment.repository';
import { SharedConfigModule } from 'src/shared-config/shared-config.module';
import { CodesConfigModule } from 'src/config/codes-config.module';
import { NoveltyCreatedListener } from 'src/payroll/listeners/novelty-created.listener';
import { PayrollModule } from 'src/payroll/payroll.module';
import { EmployeeFullView } from 'src/employees/entities/employee.view';
import { VacationCalculatorController } from './vacation-calculator/vacation-calculator.controller';
import { VacationCalculatorService } from './vacation-calculator/vacation-calculator.service';
import { VacationCalculatorRepository } from './vacation-calculator/vacation-calculator.repository';
import { EmployeeWorking } from 'src/employees/entities/employee-working.entity';
import { WorkingHour } from 'src/shared/entities/workin-hour.entity';
import { EmployeeContract } from 'src/employees/entities/employee-contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Concept,
      Period,
      Employee,
      EmployeeFullView,
      EmployeeSalary,
      PeriodStatus,
      CompanyPayment,
      Movement,
      RecurrentPayment,
      AbsenteeHistory,
      Solidarity,
      Diagnosis,
      AbsenteeHistory,
      Novelties,
      AbsenteeType,
      EmployeeWorking,
      WorkingHour,
      EmployeeContract,
    ]),
    SharedConfigModule,
    PayrollModule,
    CodesConfigModule,
  ],
  providers: [
    DiagnosisService,
    AbsenteeTypeService,
    AbsenteeHistoryService,
    NoRecurrentNoveltyService,
    ConceptService,
    PeriodService,
    ConceptService,
    EmployeeSalaryService,
    EmployeeService,
    MovementService,
    CompanyPaymentService,
    PeriodStatusService,
    RecurrentPaymentService,
    NoveltyCreatedListener,
    MovementRepository,
    EmployeeRepository,
    EmployeeSalaryRepository,
    AbsenteeHistoryRepository,
    NoveltiesRepository,
    AbsenteeTypeRepository,
    DiagnosisRepository,
    ConceptRepository,
    PeriodRepository,
    CompanyPaymentRepository,
    PeriodStatusRepository,
    RecurrentPaymentRepository,
    VacationCalculatorService,
    VacationCalculatorRepository,
  ],
  exports: [
    NoveltiesRepository,
    AbsenteeHistoryRepository,
    AbsenteeHistoryService,
    RecurrentPaymentService,
  ],
  controllers: [
    NoRecurrentNovelyController,
    DiagnosisController,
    AbsenteeTypeController,
    AbsenteeHistoryController,
    RecurrentPaymentController,
    VacationCalculatorController,
  ],
})
export class NoveltiesModule {}
