import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesConfig } from 'src/shared-config/entities/codes-config.entity';
import { CodesConfigService } from './codes-config/codes-config.service';
import { PayrollConstants } from 'src/shared-config/entities/payrollConstants.entity';
import { PayrollConstantsService } from './payroll-constants/payroll-constants.service';

@Module({
  imports: [TypeOrmModule.forFeature([CodesConfig, PayrollConstants])],
  providers: [CodesConfigService, PayrollConstantsService],
  exports: [CodesConfigService, PayrollConstantsService],
})
export class CodesConfigModule {}
