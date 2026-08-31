import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { SpendingAccountRepository } from './spending-account.repository';
import {
  CreateSpendingAccountDto,
  UpdateSpendingAccountDto,
  FilterSpendingAccountDto,
  ResponseSpendingAccountDto,
} from './../dtos/spending-account.dto';

@Injectable()
export class SpendingAccountService {
  constructor(private readonly repo: SpendingAccountRepository) {}

  /**
   * get all records of SpendingAccount
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterSpendingAccountDto,
  ): Promise<PaginatedResult<ResponseSpendingAccountDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseSpendingAccountDto, data);
    return { data: dto, total };
  }

  /**
   * find one SpendingAccount
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseSpendingAccountDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('SpendingAccount not found');
    }
    return plainToInstance(ResponseSpendingAccountDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateSpendingAccountDto,
  ): Promise<ResponseSpendingAccountDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseSpendingAccountDto, newEntity);
  }

  /**
   * update an SpendingAccount
   * @param id
   * @param dto UpdateSpendingAccountDto
   * @returns ResponseSpendingAccountDto
   */
  async update(
    id: string,
    dto: UpdateSpendingAccountDto,
  ): Promise<ResponseSpendingAccountDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseSpendingAccountDto, updatedEntity);
  }

  /**
   * delete an SpendingAccount
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('SpendingAccount not found');
    }
    return 'SpendingAccount delete successfully';
  }
}
