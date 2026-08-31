import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateEmployeeSalaryDto,
  UpdateEmployeeSalaryDto,
  FilterEmployeeSalaryDto,
} from './../dtos/employee-salary.dto';
import { BaseRepository } from 'src/database/base.repository';
import { EmployeeSalary } from '../entities/employee-salary.entity';

@Injectable()
export class EmployeeSalaryRepository extends BaseRepository<
  EmployeeSalary,
  CreateEmployeeSalaryDto,
  UpdateEmployeeSalaryDto,
  FilterEmployeeSalaryDto
> {
  constructor(
    @InjectRepository(EmployeeSalary)
    repo: Repository<EmployeeSalary>,
  ) {
    super(repo);
  }

  async get_active_salary_employee(
    employee_id: string,
  ): Promise<EmployeeSalary> {
    return await this.repo.findOne({
      where: { employee_id, isActive: true },
    });
  }
}
