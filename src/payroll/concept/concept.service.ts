import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { ConceptRepository } from './concept.repository';
import {
  CreateConceptDto,
  UpdateConceptDto,
  FilterConceptDto,
  ResponseConceptDto,
} from '../dto/concept.dto';

@Injectable()
export class ConceptService {
  constructor(private readonly repo: ConceptRepository) {}

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
}
