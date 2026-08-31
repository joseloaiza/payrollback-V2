import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { GenderRepository } from './gender.repository';
import {
  CreateGenderDto,
  UpdateGenderDto,
  FilterGenderDto,
  ResponseGenderDto,
} from '../dtos/gender.dto';

@Injectable()
export class GenderService {
  constructor(private readonly repo: GenderRepository) {}
  /**
   * get all records of gender
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterGenderDto,
  ): Promise<PaginatedResult<ResponseGenderDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesContractDto = plainToInstance(ResponseGenderDto, data);
    return { data: employeesContractDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns ResponseGenderDto
   */
  async findOne(id: string): Promise<ResponseGenderDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Employee Working not found');
    }
    return plainToInstance(ResponseGenderDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateGenderDto): Promise<ResponseGenderDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseGenderDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto UpdateGenderDto
   * @returns ResponseGenderDto
   */
  async update(id: string, dto: UpdateGenderDto): Promise<ResponseGenderDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseGenderDto, updatedEntity);
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
      throw new NotFoundException('Gender not found');
    }
    return 'Gender delete successfully';
  }
}
