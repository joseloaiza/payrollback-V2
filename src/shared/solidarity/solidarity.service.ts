import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { SolidarityRepository } from './solidarity.repository';
import {
  CreateSolidarityDto,
  UpdateSolidarityDto,
  FilterSolidarityDto,
  ResponseSolidarityDto,
} from './../dtos/solidarity.dto';

@Injectable()
export class SolidarityService {
  constructor(private readonly repo: SolidarityRepository) {}

  /**
   * get all records of Solidarity
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterSolidarityDto,
  ): Promise<PaginatedResult<ResponseSolidarityDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseSolidarityDto, data);
    return { data: dto, total };
  }

  /**
   * find one Solidarity
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseSolidarityDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Solidarity not found');
    }
    return plainToInstance(ResponseSolidarityDto, entity);
  }

  async get_percentage_by_range_salary(
    salary: number,
    isPensionary: boolean,
  ): Promise<ResponseSolidarityDto> {
    const entity = await this.repo.get_percentage_by_range_salary(
      salary,
      isPensionary,
    );
    return plainToInstance(ResponseSolidarityDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateSolidarityDto): Promise<ResponseSolidarityDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseSolidarityDto, newEntity);
  }

  /**
   * update an Solidarity
   * @param id
   * @param dto UpdateSolidarityDto
   * @returns ResponseSolidarityDto
   */
  async update(
    id: string,
    dto: UpdateSolidarityDto,
  ): Promise<ResponseSolidarityDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseSolidarityDto, updatedEntity);
  }

  /**
   * delete an Solidarity
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Solidarity not found');
    }
    return 'Solidarity delete successfully';
  }
}
