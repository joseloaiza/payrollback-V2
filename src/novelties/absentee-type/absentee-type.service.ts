import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { AbsenteeTypeRepository } from './absentee-type.repository';
import {
  CreateAbsenteeTypeDto,
  UpdateAbsenteeTypeDto,
  FilterAbsenteeTypeDto,
  ResponseAbsenteeTypeDto,
} from '../dtos/absentee-type.dto';

@Injectable()
export class AbsenteeTypeService {
  constructor(private readonly repo: AbsenteeTypeRepository) {}

  async findAll(
    queryFilters: FilterAbsenteeTypeDto,
  ): Promise<PaginatedResult<ResponseAbsenteeTypeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const absenteeTypeDto = plainToInstance(ResponseAbsenteeTypeDto, data);
    return { data: absenteeTypeDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseAbsenteeTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Absentee type not found');
    }
    return plainToInstance(ResponseAbsenteeTypeDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateAbsenteeTypeDto): Promise<ResponseAbsenteeTypeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseAbsenteeTypeDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateAbsenteeTypeDto,
  ): Promise<ResponseAbsenteeTypeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseAbsenteeTypeDto, updatedEntity);
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
      throw new NotFoundException('Absentee type not found');
    }
    return 'Absentee type delete successfully';
  }
}
