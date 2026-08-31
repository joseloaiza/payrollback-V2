import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { WorkPlaceRiskRepository } from './work-place-risk.repository';
import {
  CreateWorkPlaceRisksDto,
  UpdateWorkPlaceRisksDto,
  FilterWorkPlaceRisksDto,
  ResponseWorkPlaceRisksDto,
} from './../dtos/work-place-risk.dto';

@Injectable()
export class WorkPlaceRisksService {
  constructor(private readonly repo: WorkPlaceRiskRepository) {}

  /**
   * get all records of WorkPlaceRisks
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterWorkPlaceRisksDto,
  ): Promise<PaginatedResult<ResponseWorkPlaceRisksDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseWorkPlaceRisksDto, data);
    return { data: dto, total };
  }

  /**
   * find one WorkPlaceRisks
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseWorkPlaceRisksDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('WorkPlaceRisks not found');
    }
    return plainToInstance(ResponseWorkPlaceRisksDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateWorkPlaceRisksDto,
  ): Promise<ResponseWorkPlaceRisksDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseWorkPlaceRisksDto, newEntity);
  }

  /**
   * update an WorkPlaceRisks
   * @param id
   * @param dto UpdateWorkPlaceRisksDto
   * @returns ResponseWorkPlaceRisksDto
   */
  async update(
    id: string,
    dto: UpdateWorkPlaceRisksDto,
  ): Promise<ResponseWorkPlaceRisksDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseWorkPlaceRisksDto, updatedEntity);
  }

  /**
   * delete an WorkPlaceRisks
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('WorkPlaceRisks not found');
    }
    return 'WorkPlaceRisks delete successfully';
  }
}
