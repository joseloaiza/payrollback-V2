import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { EmployeeWorkingRepository } from './employee-working.repository';
import {
  CreateEmployeeWorkingDto,
  UpdateEmployeeWorkingDto,
  FilterEmployeeWorkingDto,
  ResponseEmployeeWorkingDto,
} from '../dtos/employee-working.dto';

@Injectable()
export class EmployeeWorkingService {
  constructor(private readonly repo: EmployeeWorkingRepository) {}

  async findAll(
    queryFilters: FilterEmployeeWorkingDto,
  ): Promise<PaginatedResult<ResponseEmployeeWorkingDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesContractDto = plainToInstance(
      ResponseEmployeeWorkingDto,
      data,
    );
    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseEmployeeWorkingDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Employee Working not found');
    }
    return plainToInstance(ResponseEmployeeWorkingDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateEmployeeWorkingDto,
  ): Promise<ResponseEmployeeWorkingDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseEmployeeWorkingDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateEmployeeWorkingDto,
  ): Promise<ResponseEmployeeWorkingDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseEmployeeWorkingDto, updatedEntity);
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
    return 'Employee Working delete successfully';
  }
}
