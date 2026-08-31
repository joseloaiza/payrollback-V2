import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateEmployeeWorkingDto,
  UpdateEmployeeWorkingDto,
  FilterEmployeeWorkingDto,
} from './../dtos/employee-working.dto';
import { BaseRepository } from 'src/database/base.repository';
import { EmployeeWorking } from '../entities/employee-working.entity';

@Injectable()
export class EmployeeWorkingRepository extends BaseRepository<
  EmployeeWorking,
  CreateEmployeeWorkingDto,
  UpdateEmployeeWorkingDto,
  FilterEmployeeWorkingDto
> {
  constructor(
    @InjectRepository(EmployeeWorking)
    repo: Repository<EmployeeWorking>,
  ) {
    super(repo);
  }
}
