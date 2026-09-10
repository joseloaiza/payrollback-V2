import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodService } from './period.service';
import { PeriodController } from './period.controller';
import { PeriodRepository } from './period.repository';
import { Period } from './entities/period.entity';
import { PeriodStatus } from './entities/periodStatus.entity';
import { PeriodStatusService } from './period-status/period-status.service';
import { PeriodStatusRepository } from './period-status/period-status.repository';
import { PeriodStatusController } from './period-status/period-status.controller';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Period, PeriodStatus]), CompaniesModule],
  providers: [
    PeriodService,
    PeriodRepository,
    PeriodStatusService,
    PeriodStatusRepository,
  ],
  controllers: [PeriodController, PeriodStatusController],
  exports: [PeriodService, PeriodStatusService],
})
export class PeriodModule {}
