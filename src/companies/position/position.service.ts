import { Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import {
  CreatePositionDto,
  UpdatePositionDto,
  FilterPositionDto,
  ResponsePositionDto,
} from './../dtos/position.dto';
import { PositionRepository } from './position.repository';

@Injectable()
export class PositionService {
  constructor(private readonly repo: PositionRepository) {}

  async findAll(
    queryFilters: FilterPositionDto,
  ): Promise<PaginatedResult<ResponsePositionDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const transformedData = plainToInstance(ResponsePositionDto, data);
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponsePositionDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Position not  found');
    }
    return plainToInstance(ResponsePositionDto, entity);
  }

  async create(dto: CreatePositionDto): Promise<ResponsePositionDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponsePositionDto, newEntity);
  }

  async update(
    id: string,
    dto: UpdatePositionDto,
  ): Promise<ResponsePositionDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponsePositionDto, updatedEntity);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Position not found');
    }
    return 'position delete successfully';
  }
}
