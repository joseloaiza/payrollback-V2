import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import {
  CreateEmployeeJobDto,
  UpdateEmployeeJobDto,
  FilterEmployeeJobDto,
  ResponseEmployeeJobDto,
} from './../dtos/employee-job.dto';

import { EmployeeJobRepository } from './employee-job.repository';

@Injectable()
export class EmployeeJobService {
  constructor(private readonly repo: EmployeeJobRepository) {}

  async findAll(
    queryFilters: FilterEmployeeJobDto,
  ): Promise<PaginatedResult<ResponseEmployeeJobDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesContractDto = plainToInstance(ResponseEmployeeJobDto, data);
    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseEmployeeJobDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Employee job not found');
    }
    return plainToInstance(ResponseEmployeeJobDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateEmployeeJobDto): Promise<ResponseEmployeeJobDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseEmployeeJobDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateEmployeeJobDto,
  ): Promise<ResponseEmployeeJobDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseEmployeeJobDto, updatedEntity);
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
}
