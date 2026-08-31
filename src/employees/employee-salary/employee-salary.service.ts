import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { EmployeeSalaryRepository } from './employee-salary.repository';
import {
  CreateEmployeeSalaryDto,
  UpdateEmployeeSalaryDto,
  FilterEmployeeSalaryDto,
  ResponseEmployeeSalaryDto,
} from '../dtos/employee-salary.dto';

@Injectable()
export class EmployeeSalaryService {
  constructor(private readonly repo: EmployeeSalaryRepository) {}

  async findAll(
    queryFilters: FilterEmployeeSalaryDto,
  ): Promise<PaginatedResult<ResponseEmployeeSalaryDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesContractDto = plainToInstance(
      ResponseEmployeeSalaryDto,
      data,
    );
    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseEmployeeSalaryDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Employee job not found');
    }
    return plainToInstance(ResponseEmployeeSalaryDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateEmployeeSalaryDto,
  ): Promise<ResponseEmployeeSalaryDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseEmployeeSalaryDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateEmployeeSalaryDto,
  ): Promise<ResponseEmployeeSalaryDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseEmployeeSalaryDto, updatedEntity);
  }

  /**
   * delete an employee contract
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Job not found');
    }
    return 'Employee job delete successfully';
  }

  async get_active_salary_employee(
    employee_id: string,
  ): Promise<ResponseEmployeeSalaryDto> {
    const entity = await this.repo.get_active_salary_employee(employee_id);
    if (!entity) {
      throw new NotFoundException('Employee Salary not found');
    }
    return plainToInstance(ResponseEmployeeSalaryDto, entity);
  }
}
