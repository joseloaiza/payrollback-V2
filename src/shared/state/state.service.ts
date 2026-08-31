import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { StateRepository } from './state.repoistory';
import {
  CreateStateDto,
  UpdateStateDto,
  FilterStateDto,
  ResponseStateDto,
} from './../dtos/state.dto';

@Injectable()
export class StateService {
  constructor(private readonly repo: StateRepository) {}

  /**
   * get all records of State
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterStateDto,
  ): Promise<PaginatedResult<ResponseStateDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseStateDto, data);
    return { data: dto, total };
  }

  /**
   * find one State
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseStateDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('State not found');
    }
    return plainToInstance(ResponseStateDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateStateDto): Promise<ResponseStateDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseStateDto, newEntity);
  }

  /**
   * update an State
   * @param id
   * @param dto UpdateStateDto
   * @returns ResponseStateDto
   */
  async update(id: string, dto: UpdateStateDto): Promise<ResponseStateDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseStateDto, updatedEntity);
  }

  /**
   * delete an State
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('State not found');
    }
    return 'State delete successfully';
  }
}
