import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { RecurrentPaymentRepository } from './recurrent-payment.repository';
import {
  CreateRecurrentPaymentDto,
  UpdateRecurrentPaymentDto,
  FilterRecurrentPaymentDto,
  ResponseRecurrentPaymentDto,
} from '../../novelties/dtos/recurrent-payment.dto';
import { MovementService } from '../../movement/movement.service';
import { EntityToDtoMapper } from 'src/utils/entity_to_dto_mapper';

@Injectable()
export class RecurrentPaymentService {
  constructor(
    private readonly repo: RecurrentPaymentRepository,
    private readonly movementService: MovementService,
  ) {}

  async findAll(
    queryFilters: FilterRecurrentPaymentDto,
  ): Promise<PaginatedResult<ResponseRecurrentPaymentDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
      ['concept', 'employee'],
      null,
      {
        concept: ['code', 'description'],
        employee: ['identification', 'firstName', 'surname'],
      },
    );

    const transformedData = EntityToDtoMapper.mapArrayToDto(
      ResponseRecurrentPaymentDto,
      data,
    );
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseRecurrentPaymentDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Recurrent payment not found');
    }
    return EntityToDtoMapper.mapToDto(ResponseRecurrentPaymentDto, entity);
  }

  async create(
    dto: CreateRecurrentPaymentDto,
  ): Promise<ResponseRecurrentPaymentDto> {
    const newEntity = await this.repo.create(dto);
    return EntityToDtoMapper.mapToDto(ResponseRecurrentPaymentDto, newEntity);
  }

  async update(
    id: string,
    dto: UpdateRecurrentPaymentDto,
  ): Promise<ResponseRecurrentPaymentDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseRecurrentPaymentDto, updatedEntity);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Recurrent payment not found');
    }
    return 'Recurrent payment delete successfully';
  }
}
