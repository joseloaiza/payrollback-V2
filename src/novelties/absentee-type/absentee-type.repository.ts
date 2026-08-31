import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateAbsenteeTypeDto,
  UpdateAbsenteeTypeDto,
  FilterAbsenteeTypeDto,
} from './../dtos/absentee-type.dto';
import { BaseRepository } from 'src/database/base.repository';
import { AbsenteeType } from '../entities/absentee-type.entity';

@Injectable()
export class AbsenteeTypeRepository extends BaseRepository<
  AbsenteeType,
  CreateAbsenteeTypeDto,
  UpdateAbsenteeTypeDto,
  FilterAbsenteeTypeDto
> {
  constructor(
    @InjectRepository(AbsenteeType)
    repo: Repository<AbsenteeType>,
  ) {
    super(repo);
  }
}
