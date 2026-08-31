import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateContributorSubTypeDto,
  UpdateContributorSubTypeDto,
  FilterContributorSubTypeDto,
} from './../dtos/contributorSubType.dto';
import { BaseRepository } from 'src/database/base.repository';
import { ContributorSubType } from '../entities/contributorSubType.entity';

@Injectable()
export class ContributorSubTypeRepository extends BaseRepository<
  ContributorSubType,
  CreateContributorSubTypeDto,
  UpdateContributorSubTypeDto,
  FilterContributorSubTypeDto
> {
  constructor(
    @InjectRepository(ContributorSubType)
    repo: Repository<ContributorSubType>,
  ) {
    super(repo);
  }
}
