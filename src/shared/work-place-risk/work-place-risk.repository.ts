import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateWorkPlaceRisksDto } from './../dtos/work-place-risk.dto';
import { BaseRepository } from 'src/database/base.repository';
import { WorkPlaceRisk } from '../entities/work-place-risk.entity';

@Injectable()
export class WorkPlaceRiskRepository extends BaseRepository<
  WorkPlaceRisk,
  CreateWorkPlaceRisksDto
> {
  constructor(
    @InjectRepository(WorkPlaceRisk)
    repo: Repository<WorkPlaceRisk>,
  ) {
    super(repo);
  }
}
