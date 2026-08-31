import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { IdetificationTypeRepository } from './identification-type.repository';
import {
  CreateIdentificationTypeDto,
  UpdateIdentificationTypeDto,
  FilterIdentificationTypeDto,
  ResponseIdentificationTypeDto,
} from '../dtos/identificationType.dto';

@Injectable()
export class IdentificationTypeService {
  constructor(private readonly repo: IdetificationTypeRepository) {}

  async findAll(
    queryFilters: FilterIdentificationTypeDto,
  ): Promise<PaginatedResult<ResponseIdentificationTypeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesContractDto = plainToInstance(
      ResponseIdentificationTypeDto,
      data,
    );
    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseIdentificationTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Identification Type not found');
    }
    return plainToInstance(ResponseIdentificationTypeDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateIdentificationTypeDto,
  ): Promise<ResponseIdentificationTypeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseIdentificationTypeDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateIdentificationTypeDto,
  ): Promise<ResponseIdentificationTypeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseIdentificationTypeDto, updatedEntity);
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
    return 'Identification type delete successfully';
  }
}
