import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NoRecurrentNoveltyService } from './non-recurring/no-recurrent-novelty.service';
import { NoRecurrentNovelyController } from './non-recurring/no-recurrent-novelty.controller';
import { RecurrentPayment } from 'src/novelties/entities/recurrent-payment.entity';
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
import { NoveltiesRepository } from './non-recurring/no-recurrent-novelty.repository';
import { AbsenteeHistoryRepository } from './absenteeism/absentee-history.repository';
import { AbsenteeTypeRepository } from './absentee-type/absentee-type.repository';
import { DiagnosisRepository } from './diagnosis/diagnosis.repository';
import { Novelties } from './entities/novelties.entity';
import { RecurrentPaymentController } from './recurrent-payment/recurrent-payment.controller';
import { RecurrentPaymentService } from './recurrent-payment/recurrent-payment.service';
import { RecurrentPaymentRepository } from './recurrent-payment/recurrent-payment.repository';
import { SharedConfigModule } from 'src/shared-config/shared-config.module';
import { CodesConfigModule } from 'src/config/codes-config.module';
import { NoveltyCreatedListener } from 'src/payroll/listeners/novelty-created.listener';
import { PayrollModule } from 'src/payroll/payroll.module';
import { VacationCalculatorController } from './vacation-calculator/vacation-calculator.controller';
import { VacationCalculatorService } from './vacation-calculator/vacation-calculator.service';
import { VacationCalculatorRepository } from './vacation-calculator/vacation-calculator.repository';
import { WorkingHour } from 'src/shared/entities/workin-hour.entity';
import { ConceptsModule } from 'src/concepts/concepts.module';
import { PeriodModule } from 'src/period/period.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { MovementModule } from 'src/movement/movement.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecurrentPayment,
      AbsenteeHistory,
      Solidarity,
      Diagnosis,
      AbsenteeHistory,
      Novelties,
      AbsenteeType,
      WorkingHour,
    ]),
    ConceptsModule,
    PeriodModule,
    EmployeesModule,
    MovementModule,
    SharedConfigModule,
    PayrollModule,
    CodesConfigModule,
    CompaniesModule,
  ],
  providers: [
    DiagnosisService,
    AbsenteeTypeService,
    AbsenteeHistoryService,
    NoRecurrentNoveltyService,
    RecurrentPaymentService,
    NoveltyCreatedListener,
    AbsenteeHistoryRepository,
    NoveltiesRepository,
    AbsenteeTypeRepository,
    DiagnosisRepository,
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
