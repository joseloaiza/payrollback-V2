import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { ContractTypeRepository } from './contract-type.repository';

import {
  CreateContractTypeDto,
  UpdateContractTypeDto,
  FilterContractTypeDto,
  ResponseContractTypeDto,
} from './../dtos/contractType.dto';

@Injectable()
export class ContractTypeService {
  constructor(private readonly repo: ContractTypeRepository) {}
  async findAll(
    queryFilters: FilterContractTypeDto,
  ): Promise<PaginatedResult<ResponseContractTypeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const transformedData = plainToInstance(ResponseContractTypeDto, data);
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseContractTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Subsidiary not found');
    }
    return plainToInstance(ResponseContractTypeDto, entity);
  }

  async create(dto: CreateContractTypeDto): Promise<ResponseContractTypeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseContractTypeDto, newEntity);
  }

  async update(
    id: string,
    dto: UpdateContractTypeDto,
  ): Promise<ResponseContractTypeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseContractTypeDto, updatedEntity);
  }
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Contract type not found');
    }
    return 'Contract delete successfully';
  }
}
