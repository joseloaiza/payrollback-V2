import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateIdentificationTypeDto,
  UpdateIdentificationTypeDto,
  FilterIdentificationTypeDto,
} from './../dtos/identificationType.dto';
import { BaseRepository } from 'src/database/base.repository';
import { IdentificationType } from '../entities/identificationType.entity';

@Injectable()
export class IdetificationTypeRepository extends BaseRepository<
  IdentificationType,
  CreateIdentificationTypeDto,
  UpdateIdentificationTypeDto,
  FilterIdentificationTypeDto
> {
  constructor(
    @InjectRepository(IdentificationType)
    repo: Repository<IdentificationType>,
  ) {
    super(repo);
  }
}
