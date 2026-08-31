import { Module } from '@nestjs/common';
import { CostCenterService } from './cost-center/cost-center.service';
import { CostCenterController } from './cost-center/cost-center.controller';
import { CostCenter } from './entities/costCenter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostCenterRepository } from './cost-center/cost-center.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CostCenter])],
  providers: [CostCenterService, CostCenterRepository],
  controllers: [CostCenterController],
})
export class CostCentersModule {}
