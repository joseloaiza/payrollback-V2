import {
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { AreaRepository } from './area.repository';

import {
  CreateAreaDto,
  UpdateAreaDto,
  FilterAreaDto,
  ResponseAreaDto,
} from './../dtos/area.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AreaService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly repo: AreaRepository,
  ) {}
  async findAll(
    queryFilters: FilterAreaDto,
  ): Promise<PaginatedResult<ResponseAreaDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const transformedData = plainToInstance(ResponseAreaDto, data);
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseAreaDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      this.logger.warn(`Area ${id} not found`);
      throw new NotFoundException('Area not found');
    }
    return plainToInstance(ResponseAreaDto, entity);
  }

  async create(dto: CreateAreaDto): Promise<ResponseAreaDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseAreaDto, newEntity);
  }

  async update(id: string, dto: UpdateAreaDto): Promise<ResponseAreaDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseAreaDto, updatedEntity);
  }
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Area not found');
    }
    return 'Area delete successfully';
  }
}
