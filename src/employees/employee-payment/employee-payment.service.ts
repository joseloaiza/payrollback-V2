import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { EmployeePaymentRepository } from './employee-payment.repository';
import {
  CreateEmployeePaymentDto,
  UpdateEmployeePaymentDto,
  FilterEmployeePaymentDto,
  ResponseEmployeePaymentDto,
} from '../dtos/employee-payment.dto';

@Injectable()
export class EmployeePaymentService {
  constructor(private readonly repo: EmployeePaymentRepository) {}

  async findAll(
    queryFilters: FilterEmployeePaymentDto,
  ): Promise<PaginatedResult<ResponseEmployeePaymentDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesContractDto = plainToInstance(
      ResponseEmployeePaymentDto,
      data,
    );
    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseEmployeePaymentDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Employee job not found');
    }
    return plainToInstance(ResponseEmployeePaymentDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateEmployeePaymentDto,
  ): Promise<ResponseEmployeePaymentDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseEmployeePaymentDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateEmployeePaymentDto,
  ): Promise<ResponseEmployeePaymentDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseEmployeePaymentDto, updatedEntity);
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
