import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCostCenterDto,
  UpdateCostCenterDto,
  FilterCostCenterDto,
} from './../dtos/costCenter.dto';
import { BaseRepository } from 'src/database/base.repository';
import { CostCenter } from '../entities/costCenter.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CostCenterRepository extends BaseRepository<
  CostCenter,
  CreateCostCenterDto,
  UpdateCostCenterDto,
  FilterCostCenterDto
> {
  constructor(
    @InjectRepository(CostCenter)
    repo: Repository<CostCenter>,
  ) {
    super(repo);
  }
}
