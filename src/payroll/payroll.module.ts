import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PayrollService } from './payroll.service';
import { PeriodModule } from 'src/period/period.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { JobsModule } from 'src/jobs/jobs.module';
import { AbsenteeCreatedListener } from './listeners/absentee-created.listener';
import { PayrollController } from './payroll.controller';
import { PayrollRepository } from './payroll.repository';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    PeriodModule,
    EmployeesModule,
    JobsModule,
  ],
  controllers: [PayrollController],
  providers: [PayrollService, AbsenteeCreatedListener, PayrollRepository],
  exports: [PayrollService, AbsenteeCreatedListener],
})
export class PayrollModule {}
