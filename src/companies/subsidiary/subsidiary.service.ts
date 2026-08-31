import { Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import {
  CreateSubsidiaryDto,
  UpdateSubsidiaryDto,
  FilterSubsidiaryDto,
  ResponseSubsidiaryDto,
} from './../dtos/subsidiary.dto';
import { SubsidiaryRepository } from './subsidiary.repository';

@Injectable()
export class SubsidiaryService {
  constructor(private readonly repo: SubsidiaryRepository) {}
  async findAll(
    queryFilters: FilterSubsidiaryDto,
  ): Promise<PaginatedResult<ResponseSubsidiaryDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const transformedData = plainToInstance(ResponseSubsidiaryDto, data);
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseSubsidiaryDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Subsidiary not found');
    }
    return plainToInstance(ResponseSubsidiaryDto, entity);
  }

  async create(dto: CreateSubsidiaryDto): Promise<ResponseSubsidiaryDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseSubsidiaryDto, newEntity);
  }

  async update(
    id: string,
    dto: UpdateSubsidiaryDto,
  ): Promise<ResponseSubsidiaryDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseSubsidiaryDto, updatedEntity);
  }
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Subsidiary not found');
    }
    return 'Subsidiary delete successfully';
  }
}
