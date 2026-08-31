import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { EmployeeSocialSecurityRepository } from './employee-social-security.repository';
import {
  CreateEmployeeSocialSecurityDto,
  UpdateEmployeeSocialSecurityDto,
  FilterEmployeeSocialSecurityDto,
  ResponseEmployeeSocialSecurityDto,
} from '../dtos/employee-social-security.dto';

@Injectable()
export class EmployeeSocialSecurityService {
  constructor(private readonly repo: EmployeeSocialSecurityRepository) {}

  async findAll(
    queryFilters: FilterEmployeeSocialSecurityDto,
  ): Promise<PaginatedResult<ResponseEmployeeSocialSecurityDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesContractDto = plainToInstance(
      ResponseEmployeeSocialSecurityDto,
      data,
    );
    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseEmployeeSocialSecurityDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Employee job not found');
    }
    return plainToInstance(ResponseEmployeeSocialSecurityDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateEmployeeSocialSecurityDto,
  ): Promise<ResponseEmployeeSocialSecurityDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseEmployeeSocialSecurityDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateEmployeeSocialSecurityDto,
  ): Promise<ResponseEmployeeSocialSecurityDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseEmployeeSocialSecurityDto, updatedEntity);
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
      throw new NotFoundException('Social security not found');
    }
    return 'Employee social security delete successfully';
  }
}
