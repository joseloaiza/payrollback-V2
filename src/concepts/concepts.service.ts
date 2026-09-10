import {
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Cache } from 'cache-manager';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { ConceptRepository } from './concept.repository';
import {
  CreateConceptDto,
  UpdateConceptDto,
  FilterConceptDto,
  ResponseConceptDto,
} from './concept.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Concept } from './concept.entity';

@Injectable()
export class ConceptService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly repo: ConceptRepository,
  ) {}

  async findAll(
    queryFilters: FilterConceptDto,
  ): Promise<PaginatedResult<ResponseConceptDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const absenteeTypeDto = plainToInstance(ResponseConceptDto, data);
    return { data: absenteeTypeDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseConceptDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Concept not found');
    }
    return plainToInstance(ResponseConceptDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateConceptDto): Promise<ResponseConceptDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseConceptDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(id: string, dto: UpdateConceptDto): Promise<ResponseConceptDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseConceptDto, updatedEntity);
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
      throw new NotFoundException('Concept not found');
    }
    return 'Concept delete successfully';
  }

  async getConceptsBase() {
    return await this.repo.getConceptsBase();
  }

  async getConceptsCalculateByCompany(company_id: string) {
    return await this.getConceptsCalculateByCompany(company_id);
  }

  async getNoveltyConceptsByCompany(company_id: string, conceptGroup: string) {
    return await this.repo.getNoveltyConceptsByCompany(
      company_id,
      conceptGroup,
    );
  }

  async getNoveltyConceptsOverTimeByCompany(company_id: string) {
    return await this.repo.getNoveltyConceptsOverTimeByCompany(company_id);
  }

  async getConcepts(companyId: string): Promise<{
    concepts: Concept[];
    conceptMap: Map<string, string>;
  }> {
    const cacheKey = `concepts-${companyId}`;
    try {
      const cachedData = await this.cacheManager.get<{
        concepts: Concept[];
        conceptMap: Map<string, string>;
      }>(cacheKey);

      if (cachedData) {
        // Convert the serialized conceptMap back to a Map
        this.logger.debug('Cache hit for concepts');
        const conceptMap = new Map(Object.entries(cachedData.conceptMap));
        return {
          concepts: cachedData.concepts,
          conceptMap: conceptMap,
        };
      }
      this.logger.debug('Cache miss → loading concepts from DB ');
      const concepts = await this.repo.getConceptsByCompany(companyId);
      const conceptMap: Map<string, string> = new Map(
        concepts.map((c) => [c.code, c.id]),
      );

      const cacheData = {
        concepts,
        conceptMap: Object.fromEntries(conceptMap),
      };

      await this.cacheManager.set(cacheKey, cacheData);
      return { concepts, conceptMap };
    } catch (error) {
      this.logger.error(
        'Failed to get company concepts',
        (error as Error).stack,
      );
      throw error;
    }
  }
}
