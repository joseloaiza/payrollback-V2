import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { PeriodStatusRepository } from './period-status.repository';
import {
  CreatePeriodStatusDto,
  UpdatePeriodStatusDto,
  FilterPeriodStatusDto,
  ResponsePeriodStatusDto,
} from '../dto/periodStatus.dto';

@Injectable()
export class PeriodStatusService {
  constructor(private readonly repo: PeriodStatusRepository) {}

  async findAll(
    queryFilters: FilterPeriodStatusDto,
  ): Promise<PaginatedResult<ResponsePeriodStatusDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesContractDto = plainToInstance(ResponsePeriodStatusDto, data);
    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponsePeriodStatusDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Period status not found');
    }
    return plainToInstance(ResponsePeriodStatusDto, entity);
  }

  async periodStatus_by_code(code: string): Promise<ResponsePeriodStatusDto> {
    const entity = await this.repo.periodStatus_by_code(code);
    if (!entity) {
      throw new NotFoundException('Period status not found');
    }
    return plainToInstance(ResponsePeriodStatusDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreatePeriodStatusDto): Promise<ResponsePeriodStatusDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponsePeriodStatusDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdatePeriodStatusDto,
  ): Promise<ResponsePeriodStatusDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponsePeriodStatusDto, updatedEntity);
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
      throw new NotFoundException('Period Status not found');
    }
    return 'Period status delete successfully';
  }
}
