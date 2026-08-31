import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { AssistanceTypeRepository } from './assistance-type.repository';
import {
  CreateAssistanceTypeDto,
  UpdateAssistanceTypeDto,
  FilterAssistanceTypeDto,
  ResponseAssistanceTypeDto,
} from './../dtos/assistance-type.dto';

@Injectable()
export class AssistanceTypeService {
  constructor(private readonly repo: AssistanceTypeRepository) {}

  /**
   * get all records of Assistance Type
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterAssistanceTypeDto,
  ): Promise<PaginatedResult<ResponseAssistanceTypeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseAssistanceTypeDto, data);
    return { data: dto, total };
  }

  /**
   * find one Assistance Type
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseAssistanceTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Assistance Type not found');
    }
    return plainToInstance(ResponseAssistanceTypeDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateAssistanceTypeDto,
  ): Promise<ResponseAssistanceTypeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseAssistanceTypeDto, newEntity);
  }

  /**
   * update an Assistance Type
   * @param id
   * @param dto UpdateAssistance TypeDto
   * @returns ResponseAssistanceTypeDto
   */
  async update(
    id: string,
    dto: UpdateAssistanceTypeDto,
  ): Promise<ResponseAssistanceTypeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseAssistanceTypeDto, updatedEntity);
  }

  /**
   * delete an Assistance Type
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Assistance Type not found');
    }
    return 'Assistance Type delete successfully';
  }
}
