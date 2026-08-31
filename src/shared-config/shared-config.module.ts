import { Module } from '@nestjs/common';
import { CodesConfigService } from './codes-config/codes-config.service';
import { PayrollConstantsService } from './constants/constants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesConfig } from './entities/codes-config.entity';
import { PayrollConstants } from './entities/payrollConstants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CodesConfig, PayrollConstants])],
  providers: [CodesConfigService, PayrollConstantsService],
  exports: [CodesConfigService, PayrollConstantsService],
})
export class SharedConfigModule {}
