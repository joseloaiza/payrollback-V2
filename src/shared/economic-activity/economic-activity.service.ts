import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { EconomicActivityRepository } from './economic-activity.repository';
import {
  CreateEconomicActivityDto,
  UpdateEconomicActivityDto,
  FilterEconomicActivityDto,
  ResponseEconomicActivityDto,
} from '../dtos/economic-activity.dto';

@Injectable()
export class EconomicActivityService {
  constructor(private readonly repo: EconomicActivityRepository) {}

  async findAll(
    queryFilters: FilterEconomicActivityDto,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResult<ResponseEconomicActivityDto>> {
    const { data, total } = await this.repo.findAll(queryFilters, page, limit);
    return {
      data: plainToInstance(ResponseEconomicActivityDto, data),
      total,
    };
  }

  async findOne(id: string): Promise<ResponseEconomicActivityDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) throw new NotFoundException('EconomicActivity not found');
    return plainToInstance(ResponseEconomicActivityDto, entity);
  }

  async create(
    dto: CreateEconomicActivityDto,
  ): Promise<ResponseEconomicActivityDto> {
    const entity = await this.repo.create(dto);
    return plainToInstance(ResponseEconomicActivityDto, entity);
  }

  async update(
    id: string,
    dto: UpdateEconomicActivityDto,
  ): Promise<ResponseEconomicActivityDto> {
    const entity = await this.repo.update(id, dto);
    return plainToInstance(ResponseEconomicActivityDto, entity);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('EconomicActivity not found');
    return 'EconomicActivity deleted successfully';
  }
}
