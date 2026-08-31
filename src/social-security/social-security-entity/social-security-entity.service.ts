import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { SocialSecurityEntityRepository } from './social-security-entity.repository';
import {
  CreateSocialSecurityEntityDto,
  UpdateSocialSecurityEntityDto,
  FilterSocialSecurityEntityDto,
  ResponseSocialSecurityEntityDto,
} from '../dtos/social-security-entity.dto';

import { EntityToDtoMapper } from 'src/utils/entity_to_dto_mapper';

@Injectable()
export class SocialSecurityEntityService {
  constructor(private readonly repo: SocialSecurityEntityRepository) {}

  async findAll(
    queryFilters: FilterSocialSecurityEntityDto,
  ): Promise<PaginatedResult<ResponseSocialSecurityEntityDto>> {
    const { page, limit, search, relationFilters, ...filters } = queryFilters;

    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
      ['socialSecurityEntityType'],
      null,
      { socialSecurityEntityType: ['id', 'code', 'description', 'isActive'] },
      ['code'],
      search,
      relationFilters,
    );

    const transformedData = EntityToDtoMapper.mapArrayToDto(
      ResponseSocialSecurityEntityDto,
      data,
    );
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseSocialSecurityEntityDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Recurrent payment not found');
    }
    return EntityToDtoMapper.mapToDto(ResponseSocialSecurityEntityDto, entity);
  }

  async create(
    dto: CreateSocialSecurityEntityDto,
  ): Promise<ResponseSocialSecurityEntityDto> {
    const newEntity = await this.repo.create(dto);
    return EntityToDtoMapper.mapToDto(
      ResponseSocialSecurityEntityDto,
      newEntity,
    );
  }

  async update(
    id: string,
    dto: UpdateSocialSecurityEntityDto,
  ): Promise<ResponseSocialSecurityEntityDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseSocialSecurityEntityDto, updatedEntity);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Social security entity not found');
    }
    return 'Social security entity delete successfully';
  }
}
