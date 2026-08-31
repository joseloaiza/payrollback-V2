import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { BankRepository } from './bank.repository';
import {
  CreateBankDto,
  UpdateBankDto,
  FilterBankDto,
  ResponseBankDto,
} from './../dtos/bank.dto';

@Injectable()
export class BankService {
  constructor(private readonly repo: BankRepository) {}

  /**
   * get all records of Bank
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterBankDto,
  ): Promise<PaginatedResult<ResponseBankDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseBankDto, data);
    return { data: dto, total };
  }

  /**
   * find one Bank
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseBankDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Bank not found');
    }
    return plainToInstance(ResponseBankDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateBankDto): Promise<ResponseBankDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseBankDto, newEntity);
  }

  /**
   * update an Bank
   * @param id
   * @param dto UpdateBankDto
   * @returns ResponseBankDto
   */
  async update(id: string, dto: UpdateBankDto): Promise<ResponseBankDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseBankDto, updatedEntity);
  }

  /**
   * delete an Bank
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Bank not found');
    }
    return 'Bank delete successfully';
  }
}
