import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { ContributorTypeRepository } from './contributor-type.repository';
import {
  CreateContributorTypeDto,
  UpdateContributorTypeDto,
  FilterContributorTypeDto,
  ResponseContributorTypeDto,
} from './../dtos/contributorType.dto';

@Injectable()
export class ContributorTypeService {
  constructor(private readonly repo: ContributorTypeRepository) {}

  /**
   * get all records of Contributor  Sub Type
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterContributorTypeDto,
  ): Promise<PaginatedResult<ResponseContributorTypeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseContributorTypeDto, data);
    return { data: dto, total };
  }

  /**
   * find one Contributor  Sub Type
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseContributorTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Contributor  Sub Type not found');
    }
    return plainToInstance(ResponseContributorTypeDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateContributorTypeDto,
  ): Promise<ResponseContributorTypeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseContributorTypeDto, newEntity);
  }

  /**
   * update an Contributor  Sub Type
   * @param id
   * @param dto UpdateContributor  Sub TypeDto
   * @returns ResponseContributorTypeDto
   */
  async update(
    id: string,
    dto: UpdateContributorTypeDto,
  ): Promise<ResponseContributorTypeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseContributorTypeDto, updatedEntity);
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
