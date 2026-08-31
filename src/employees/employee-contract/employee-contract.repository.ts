import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateEmployeeContractDto,
  UpdateEmployeeContractDto,
  FilterEmployeeContractDto,
} from './../dtos/employee-contract.dto';
import { BaseRepository } from 'src/database/base.repository';
import { EmployeeContract } from '../entities/employee-contract.entity';

@Injectable()
export class EmployeeContractRepository extends BaseRepository<
  EmployeeContract,
  CreateEmployeeContractDto,
  UpdateEmployeeContractDto,
  FilterEmployeeContractDto
> {
  constructor(
    @InjectRepository(EmployeeContract)
    repo: Repository<EmployeeContract>,
  ) {
    super(repo);
  }
}
