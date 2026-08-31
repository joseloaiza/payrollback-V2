import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/database/base.repository';
import { EconomicActivity } from '../entities/economic-activity.entity';
import {
  CreateEconomicActivityDto,
  UpdateEconomicActivityDto,
  FilterEconomicActivityDto,
} from '../dtos/economic-activity.dto';

@Injectable()
export class EconomicActivityRepository extends BaseRepository<
  EconomicActivity,
  CreateEconomicActivityDto,
  UpdateEconomicActivityDto,
  FilterEconomicActivityDto
> {
  constructor(
    @InjectRepository(EconomicActivity)
    repo: Repository<EconomicActivity>,
  ) {
    super(repo);
  }
}
