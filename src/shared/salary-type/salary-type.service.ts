import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { SalaryTypeRepository } from './salary-type.repository';
import {
  CreateSalaryTypeDto,
  UpdateSalaryTypeDto,
  FilterSalaryTypeDto,
  ResponseSalaryTypeDto,
} from './../dtos/salary-type.dto';

@Injectable()
export class SalaryTypeService {
  constructor(private readonly repo: SalaryTypeRepository) {}

  /**
   * get all records of SalaryType
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterSalaryTypeDto,
  ): Promise<PaginatedResult<ResponseSalaryTypeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseSalaryTypeDto, data);
    return { data: dto, total };
  }

  /**
   * find one SalaryType
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseSalaryTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('SalaryType not found');
    }
    return plainToInstance(ResponseSalaryTypeDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateSalaryTypeDto): Promise<ResponseSalaryTypeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseSalaryTypeDto, newEntity);
  }

  /**
   * update an SalaryType
   * @param id
   * @param dto UpdateSalaryTypeDto
   * @returns ResponseSalaryTypeDto
   */
  async update(
    id: string,
    dto: UpdateSalaryTypeDto,
  ): Promise<ResponseSalaryTypeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseSalaryTypeDto, updatedEntity);
  }

  /**
   * delete an SalaryType
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('SalaryType not found');
    }
    return 'SalaryType delete successfully';
  }
}
