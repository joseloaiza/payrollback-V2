import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateEmployeeJobDto,
  UpdateEmployeeJobDto,
  FilterEmployeeJobDto,
} from './../dtos/employee-job.dto';
import { BaseRepository } from 'src/database/base.repository';
import { EmployeeJob } from '../entities/employee-job.entity';

@Injectable()
export class EmployeeJobRepository extends BaseRepository<
  EmployeeJob,
  CreateEmployeeJobDto,
  UpdateEmployeeJobDto,
  FilterEmployeeJobDto
> {
  constructor(
    @InjectRepository(EmployeeJob)
    repo: Repository<EmployeeJob>,
  ) {
    super(repo);
  }
}
