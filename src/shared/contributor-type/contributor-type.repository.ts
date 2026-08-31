import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateContributorTypeDto,
  UpdateContributorTypeDto,
  FilterContributorTypeDto,
} from '../dtos/contributorType.dto';
import { BaseRepository } from 'src/database/base.repository';
import { ContributorType } from '../entities/contributorType.entity';

@Injectable()
export class ContributorTypeRepository extends BaseRepository<
  ContributorType,
  CreateContributorTypeDto,
  UpdateContributorTypeDto,
  FilterContributorTypeDto
> {
  constructor(
    @InjectRepository(ContributorType)
    repo: Repository<ContributorType>,
  ) {
    super(repo);
  }
}
