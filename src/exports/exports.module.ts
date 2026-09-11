import { Module } from '@nestjs/common';
import { ExportsController } from './exports.controller';
import { ExportsService } from './exports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenteeHistory } from '../novelties/entities/absenteeHistory.entity';
import { RecurrentPayment } from '../novelties/entities/recurrent-payment.entity';
import { Solidarity } from '../shared/entities/solidarity.entity';
import { SolidarityRepository } from '../shared/solidarity/solidarity.repository';
import { SolidarityService } from '../shared/solidarity/solidarity.service';
import { AbsenteeCreatedListener } from '../payroll/listeners/absentee-created.listener';
import { BankService } from '../shared/bank/bank.service';
import { BankRepository } from '../shared/bank/bank.repository';
import { Bank } from '../shared/entities/bank.entity';
import { AccountType } from '../shared/entities/account-type.entity';
import { AccountTypeService } from '../shared/account-type/account-type.service';
import { AccountTypeRepository } from '../shared/account-type/accoun-type.repository';
import { SharedConfigModule } from '../shared-config/shared-config.module';
import { PayrollModule } from 'src/payroll/payroll.module';
import { CodesConfigModule } from 'src/config/codes-config.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { PeriodModule } from 'src/period/period.module';
import { MovementModule } from 'src/movement/movement.module';
import { ConceptsModule } from 'src/concepts/concepts.module';
import { NoveltiesModule } from 'src/novelties/novelties.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AbsenteeHistory,
      RecurrentPayment,
      Solidarity,
      Bank,
      AccountType,
    ]),
    PayrollModule,
    SharedConfigModule,
    CompaniesModule,
    PeriodModule,
    MovementModule,
    CodesConfigModule,
    ConceptsModule,
    NoveltiesModule,
    EmployeesModule,
  ],
  controllers: [ExportsController],
  providers: [
    ExportsService,
    SolidarityService,
    BankService,
    AccountTypeService,
    AbsenteeCreatedListener,
    SolidarityRepository,
    BankRepository,
    AccountTypeRepository,
  ],
})
export class ExportsModule {}
