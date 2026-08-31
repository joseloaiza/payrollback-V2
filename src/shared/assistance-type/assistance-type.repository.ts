import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateAssistanceTypeDto,
  UpdateAssistanceTypeDto,
  FilterAssistanceTypeDto,
} from './../dtos/assistance-type.dto';
import { BaseRepository } from 'src/database/base.repository';
import { AssistanceType } from '../entities/assistance-type.entity';

@Injectable()
export class AssistanceTypeRepository extends BaseRepository<
  AssistanceType,
  CreateAssistanceTypeDto,
  UpdateAssistanceTypeDto,
  FilterAssistanceTypeDto
> {
  constructor(
    @InjectRepository(AssistanceType)
    repo: Repository<AssistanceType>,
  ) {
    super(repo);
  }
}
