import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import {
  CreateEmployeeContractDto,
  UpdateEmployeeContractDto,
  FilterEmployeeContractDto,
  ResponseEmployeeContractDto,
} from './../dtos/employee-contract.dto';
import { mapEmployeeContractToDto } from '../utils/transform';
import { EmployeeContractRepository } from './employee-contract.repository';

@Injectable()
export class EmployeeContractService {
  constructor(private readonly repo: EmployeeContractRepository) {}

  async findAll(
    queryFilters: FilterEmployeeContractDto,
  ): Promise<PaginatedResult<ResponseEmployeeContractDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
      ['employee', 'contractType', 'contractClassification'],
    );
    const employeesContractDto = data.map((employee) =>
      mapEmployeeContractToDto(employee),
    );

    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseEmployeeContractDto> {
    const entity = await this.repo.findOne(id, {
      relations: ['employee', 'contractType', 'contractClassification'],
    });
    if (!entity) {
      throw new NotFoundException('Employee contract not found');
    }
    return mapEmployeeContractToDto(entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateEmployeeContractDto,
  ): Promise<ResponseEmployeeContractDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseEmployeeContractDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateEmployeeContractDto,
  ): Promise<ResponseEmployeeContractDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseEmployeeContractDto, updatedEntity);
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
      throw new NotFoundException('Employee contract not found');
    }
    return 'Contract delete successfully';
  }
}
