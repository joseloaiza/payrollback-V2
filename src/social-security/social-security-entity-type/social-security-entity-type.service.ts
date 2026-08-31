import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { DynamicFilterService } from 'src/utils/DynamicFilterService';
import { SocialSecurityEntityType } from '../entities/social-security-entity-type.entity';
import {
  CreateSocialSecurityEntityTypeDto,
  UpdateSocialSecurityEntityTypeDto,
  FilterSocialSecurityEntityTypeDto,
  ResponseSocialSecurityEntityTypeDto,
} from './../dtos/social-security-entity-type.dto';

@Injectable()
export class SocialSecurityEntityTypeService extends DynamicFilterService<SocialSecurityEntityType> {
  constructor(
    @InjectRepository(SocialSecurityEntityType)
    private readonly SocialSecurityEntityTypeRepository: Repository<SocialSecurityEntityType>,
  ) {
    super(SocialSecurityEntityTypeRepository);
  }

  async findAll(
    queryFilters: FilterSocialSecurityEntityTypeDto,
  ): Promise<PaginatedResult<ResponseSocialSecurityEntityTypeDto>> {
    try {
      const { page, limit, search, ...filters } = queryFilters;
      const { data, total } = await this.filterEntities(
        filters,
        page,
        limit,
        [],
        null,
        null,
        ['code'],
        search,
      );
      const transformedData = plainToInstance(
        ResponseSocialSecurityEntityTypeDto,
        data,
      );
      return { data: transformedData, total };
    } catch (error) {
      throw new InternalServerErrorException('Database error occurred');
    }
  }

  async findOne(id: string): Promise<ResponseSocialSecurityEntityTypeDto> {
    try {
      const entity = await this.SocialSecurityEntityTypeRepository.findOne({
        where: { id },
      });
      if (!entity) {
        throw new NotFoundException('SocialSecurityEntityType not found');
      }
      return plainToInstance(ResponseSocialSecurityEntityTypeDto, entity);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching SocialSecurityEntityType',
      );
    }
  }

  async create(
    dto: CreateSocialSecurityEntityTypeDto,
  ): Promise<ResponseSocialSecurityEntityTypeDto> {
    try {
      const newEntity = this.SocialSecurityEntityTypeRepository.create(dto);
      const savedEntity =
        await this.SocialSecurityEntityTypeRepository.save(newEntity);
      return plainToInstance(ResponseSocialSecurityEntityTypeDto, savedEntity);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating SocialSecurityEntityType',
      );
    }
  }

  async update(
    id: string,
    dto: UpdateSocialSecurityEntityTypeDto,
  ): Promise<ResponseSocialSecurityEntityTypeDto> {
    try {
      const existingEntity =
        await this.SocialSecurityEntityTypeRepository.findOne({
          where: { id },
        });
      if (!existingEntity) {
        throw new NotFoundException('SocialSecurityEntityType not found');
      }
      Object.assign(existingEntity, dto);
      const updatedEntity =
        await this.SocialSecurityEntityTypeRepository.save(existingEntity);
      return plainToInstance(
        ResponseSocialSecurityEntityTypeDto,
        updatedEntity,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating SocialSecurityEntityType',
      );
    }
  }
  async delete(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const result = await this.SocialSecurityEntityTypeRepository.delete(id);
      if (result.affected === 0) {
        return {
          success: false,
          message: 'SocialSecurityEntityType not found',
        };
      }
      return {
        success: true,
        message: 'SocialSecurityEntityType delete successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error deleting SocialSecurityEntityType',
      );
    }
  }
}
