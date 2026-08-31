import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/database/base.repository';
import { InformationOperator } from '../entities/information-operator.entity';
import {
  CreateInformationOperatorDto,
  UpdateInformationOperatorDto,
  FilterInformationOperatorDto,
} from '../dtos/information-operator.dto';

@Injectable()
export class InformationOperatorRepository extends BaseRepository<
  InformationOperator,
  CreateInformationOperatorDto,
  UpdateInformationOperatorDto,
  FilterInformationOperatorDto
> {
  constructor(
    @InjectRepository(InformationOperator)
    repo: Repository<InformationOperator>,
  ) {
    super(repo);
  }
}
