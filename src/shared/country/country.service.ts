import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { CountryRepository } from './country.repository';
import {
  CreateCountryDto,
  UpdateCountryDto,
  FilterCountryDto,
  ResponseCountryDto,
} from './../dtos/country.dto';

@Injectable()
export class CountryService {
  constructor(private readonly repo: CountryRepository) {}

  /**
   * get all records of Country
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterCountryDto,
  ): Promise<PaginatedResult<ResponseCountryDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseCountryDto, data);
    return { data: dto, total };
  }

  /**
   * find one Country
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseCountryDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Country not found');
    }
    return plainToInstance(ResponseCountryDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateCountryDto): Promise<ResponseCountryDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseCountryDto, newEntity);
  }

  /**
   * update an Country
   * @param id
   * @param dto UpdateCountryDto
   * @returns ResponseCountryDto
   */
  async update(id: string, dto: UpdateCountryDto): Promise<ResponseCountryDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseCountryDto, updatedEntity);
  }

  /**
   * delete an Country
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Country not found');
    }
    return 'Country delete successfully';
  }
}
