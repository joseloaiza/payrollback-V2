import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { CityRepository } from './city.repository';
import {
  CreateCityDto,
  UpdateCityDto,
  FilterCityDto,
  ResponseCityDto,
} from './../dtos/city.dto';

@Injectable()
export class CityService {
  constructor(private readonly repo: CityRepository) {}

  /**
   * get all records of City
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterCityDto,
  ): Promise<PaginatedResult<ResponseCityDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseCityDto, data);
    return { data: dto, total };
  }

  /**
   * find one City
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseCityDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('City not found');
    }
    return plainToInstance(ResponseCityDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateCityDto): Promise<ResponseCityDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseCityDto, newEntity);
  }

  /**
   * update an City
   * @param id
   * @param dto UpdateCityDto
   * @returns ResponseCityDto
   */
  async update(id: string, dto: UpdateCityDto): Promise<ResponseCityDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseCityDto, updatedEntity);
  }

  /**
   * delete an City
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('City not found');
    }
    return 'City delete successfully';
  }
}
