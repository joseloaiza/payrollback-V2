import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PayrollJobRepository } from './payroll-job.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollJob } from './payroll-jobs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PayrollJob])],
  providers: [JobsService, PayrollJobRepository],
  controllers: [JobsController],
  exports: [JobsService, PayrollJobRepository],
})
export class JobsModule {}
