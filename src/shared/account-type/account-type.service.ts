import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { AccountTypeRepository } from './accoun-type.repository';
import {
  CreateAccountTypeDto,
  UpdateAccountTypeDto,
  FilterAccountTypeDto,
  ResponseAccountTypeDto,
} from './../dtos/account-type.dto';

@Injectable()
export class AccountTypeService {
  constructor(private readonly repo: AccountTypeRepository) {}

  /**
   * get all records of AccountType
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterAccountTypeDto,
  ): Promise<PaginatedResult<ResponseAccountTypeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseAccountTypeDto, data);
    return { data: dto, total };
  }

  /**
   * find one AccountType
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseAccountTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('AccountType not found');
    }
    return plainToInstance(ResponseAccountTypeDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateAccountTypeDto): Promise<ResponseAccountTypeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseAccountTypeDto, newEntity);
  }

  /**
   * update an AccountType
   * @param id
   * @param dto UpdateAccountTypeDto
   * @returns ResponseAccountTypeDto
   */
  async update(
    id: string,
    dto: UpdateAccountTypeDto,
  ): Promise<ResponseAccountTypeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseAccountTypeDto, updatedEntity);
  }

  /**
   * delete an AccountType
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('AccountType not found');
    }
    return 'AccountType delete successfully';
  }
}
