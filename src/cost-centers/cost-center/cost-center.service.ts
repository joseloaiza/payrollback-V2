import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { CostCenterRepository } from './cost-center.repository';

import {
  CreateCostCenterDto,
  UpdateCostCenterDto,
  FilterCostCenterDto,
  ResponseCostCenterDto,
} from './../dtos/costCenter.dto';

@Injectable()
export class CostCenterService {
  constructor(private readonly repo: CostCenterRepository) {}
  async findAll(
    queryFilters: FilterCostCenterDto,
  ): Promise<PaginatedResult<ResponseCostCenterDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const transformedData = plainToInstance(ResponseCostCenterDto, data);
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseCostCenterDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Subsidiary not found');
    }
    return plainToInstance(ResponseCostCenterDto, entity);
  }

  async create(dto: CreateCostCenterDto): Promise<ResponseCostCenterDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseCostCenterDto, newEntity);
  }

  async update(
    id: string,
    dto: UpdateCostCenterDto,
  ): Promise<ResponseCostCenterDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseCostCenterDto, updatedEntity);
  }
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Cost Center not found');
    }
    return 'Cost Center delete successfully';
  }
}
