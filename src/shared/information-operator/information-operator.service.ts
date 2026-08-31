import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { InformationOperatorRepository } from './information-operator.repository';
import {
  CreateInformationOperatorDto,
  UpdateInformationOperatorDto,
  FilterInformationOperatorDto,
  ResponseInformationOperatorDto,
} from '../dtos/information-operator.dto';

@Injectable()
export class InformationOperatorService {
  constructor(private readonly repo: InformationOperatorRepository) {}

  async findAll(
    queryFilters: FilterInformationOperatorDto,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResult<ResponseInformationOperatorDto>> {
    const { data, total } = await this.repo.findAll(queryFilters, page, limit);
    return {
      data: plainToInstance(ResponseInformationOperatorDto, data),
      total,
    };
  }

  async findOne(id: string): Promise<ResponseInformationOperatorDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) throw new NotFoundException('InformationOperator not found');
    return plainToInstance(ResponseInformationOperatorDto, entity);
  }

  async create(
    dto: CreateInformationOperatorDto,
  ): Promise<ResponseInformationOperatorDto> {
    const entity = await this.repo.create(dto);
    return plainToInstance(ResponseInformationOperatorDto, entity);
  }

  async update(
    id: string,
    dto: UpdateInformationOperatorDto,
  ): Promise<ResponseInformationOperatorDto> {
    const entity = await this.repo.update(id, dto);
    return plainToInstance(ResponseInformationOperatorDto, entity);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('InformationOperator not found');
    return 'InformationOperator deleted successfully';
  }
}
