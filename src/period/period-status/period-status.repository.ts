import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreatePeriodStatusDto,
  UpdatePeriodStatusDto,
  FilterPeriodStatusDto,
} from '../dto/periodStatus.dto';
import { BaseRepository } from 'src/database/base.repository';
import { PeriodStatus } from '../entities/periodStatus.entity';

@Injectable()
export class PeriodStatusRepository extends BaseRepository<
  PeriodStatus,
  CreatePeriodStatusDto,
  UpdatePeriodStatusDto,
  FilterPeriodStatusDto
> {
  constructor(
    @InjectRepository(PeriodStatus)
    repo: Repository<PeriodStatus>,
  ) {
    super(repo);
  }

  async periodStatus_by_code(code: string) {
    return this.repo.findOne({ where: { code: code } });
  }
}
