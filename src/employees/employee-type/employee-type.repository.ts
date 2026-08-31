import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateEmployeeTypeDto,
  UpdateEmployeeTypeDto,
  FilterEmployeeTypeDto,
} from './../dtos/employee-type.dto';
import { BaseRepository } from 'src/database/base.repository';
import { EmployeeType } from '../entities/employee-type.entity';

@Injectable()
export class EmployeeTypeRepository extends BaseRepository<
  EmployeeType,
  CreateEmployeeTypeDto,
  UpdateEmployeeTypeDto,
  FilterEmployeeTypeDto
> {
  constructor(
    @InjectRepository(EmployeeType)
    repo: Repository<EmployeeType>,
  ) {
    super(repo);
  }
}
