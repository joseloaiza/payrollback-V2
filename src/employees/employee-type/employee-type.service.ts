import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { EmployeeTypeRepository } from './employee-type.repository';
import {
  CreateEmployeeTypeDto,
  UpdateEmployeeTypeDto,
  FilterEmployeeTypeDto,
  ResponseEmployeeTypeDto,
} from '../dtos/employee-type.dto';

@Injectable()
export class EmployeeTypeService {
  constructor(private readonly repo: EmployeeTypeRepository) {}

  async findAll(
    queryFilters: FilterEmployeeTypeDto,
  ): Promise<PaginatedResult<ResponseEmployeeTypeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesContractDto = plainToInstance(ResponseEmployeeTypeDto, data);
    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseEmployeeTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Employee type not found');
    }
    return plainToInstance(ResponseEmployeeTypeDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateEmployeeTypeDto): Promise<ResponseEmployeeTypeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseEmployeeTypeDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateEmployeeTypeDto,
  ): Promise<ResponseEmployeeTypeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseEmployeeTypeDto, updatedEntity);
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
    return 'Employee type delete successfully';
  }
}
