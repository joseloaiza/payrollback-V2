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
import { Movement } from 'src/movement/entities/movement.entity';

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

  async processRecurrent(
    employee_id: string,
    company_id: string,
    period_id: string,
    period_year: number,
    period_month: number,
  ): Promise<Movement[]> {
    const novelties =
      await this.movementService.getMovementsNoveltiesTypeInPeriod(
        employee_id,
        company_id,
        period_id,
        'All',
      );

    const recurrentPayments = await this.repo.findActiveRecurrents(employee_id);
    const recurrentConceptIds = new Set(
      recurrentPayments.map((e) => e.concept_id),
    );
    const noveltyConceptIds = new Set(novelties.map((e) => e.concept_id));

    // Find concepts in recurrentPayments but not in novelties
    const conceptsToDelete = [...recurrentConceptIds].filter(
      (id) => !noveltyConceptIds.has(id),
    );

    // Remove outdated movements
    if (conceptsToDelete.length > 0) {
      await this.movementService.removeMovementsByConcepts(
        employee_id,
        company_id,
        period_id,
        conceptsToDelete,
      );

      // Add new movements for active recurrent payments
      recurrentPayments
        .filter((rp) => conceptsToDelete.includes(rp.concept_id) && rp.isActive)
        .map((rp) => ({
          employee_id: rp.employee_id,
          days: 0,
          value: Number(rp.value),
          concept_id: rp.concept_id,
        }));

      return await Promise.all(
        recurrentPayments.map((rp) => {
          return this.movementService.create({
            employee_id,
            quantity: 0,
            value: rp.value,
            concept_id: rp.concept_id,
            period_id,
            year: period_year,
            month: period_month,
            company_id,
          });
        }),
      );
    }
    return [];
  }
}
