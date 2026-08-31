import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { ContractRegimeRepository } from './contract-regime.repository';
import {
  CreateContractRegimeDto,
  UpdateContractRegimeDto,
  FilterContractRegimeDto,
  ResponseContractRegimeDto,
} from './../dtos/contractRegime.dto';

@Injectable()
export class ContractRegimeService {
  constructor(private readonly repo: ContractRegimeRepository) {}

  /**
   * get all records of Contract Regime
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterContractRegimeDto,
  ): Promise<PaginatedResult<ResponseContractRegimeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseContractRegimeDto, data);
    return { data: dto, total };
  }

  /**
   * find one Contract Regime
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseContractRegimeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Contract Regime not found');
    }
    return plainToInstance(ResponseContractRegimeDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateContractRegimeDto,
  ): Promise<ResponseContractRegimeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseContractRegimeDto, newEntity);
  }

  /**
   * update an Contract Regime
   * @param id
   * @param dto UpdateContract RegimeDto
   * @returns ResponseContractRegimeDto
   */
  async update(
    id: string,
    dto: UpdateContractRegimeDto,
  ): Promise<ResponseContractRegimeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseContractRegimeDto, updatedEntity);
  }

  /**
   * delete an Contract Regime
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Contract Regime not found');
    }
    return 'Contract Regime delete successfully';
  }
}
