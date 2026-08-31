import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { ContributorSubTypeRepository } from './contributor-sub-type.repository';
import {
  CreateContributorSubTypeDto,
  UpdateContributorSubTypeDto,
  FilterContributorSubTypeDto,
  ResponseContributorSubTypeDto,
} from './../dtos/contributorSubType.dto';

@Injectable()
export class ContributorSubTypeService {
  constructor(private readonly repo: ContributorSubTypeRepository) {}

  /**
   * get all records of Contributor  Sub Type
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterContributorSubTypeDto,
  ): Promise<PaginatedResult<ResponseContributorSubTypeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseContributorSubTypeDto, data);
    return { data: dto, total };
  }

  /**
   * find one Contributor  Sub Type
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseContributorSubTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Contributor  Sub Type not found');
    }
    return plainToInstance(ResponseContributorSubTypeDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateContributorSubTypeDto,
  ): Promise<ResponseContributorSubTypeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseContributorSubTypeDto, newEntity);
  }

  /**
   * update an Contributor  Sub Type
   * @param id
   * @param dto UpdateContributor  Sub TypeDto
   * @returns ResponseContributorSubTypeDto
   */
  async update(
    id: string,
    dto: UpdateContributorSubTypeDto,
  ): Promise<ResponseContributorSubTypeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseContributorSubTypeDto, updatedEntity);
  }

  /**
   * delete an Contributor  Sub Type
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Contributor  Sub Type not found');
    }
    return 'Contributor  Sub Type delete successfully';
  }
}
