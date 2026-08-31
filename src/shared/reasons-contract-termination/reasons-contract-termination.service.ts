import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { ReasonsContractTerminationRepository } from './reasons-contract-termination.repository';
import {
  CreateReasonContractTerminationDto,
  UpdateReasonContractTerminationDto,
  FilterReasonContractTerminationDto,
  ResponseReasonContractTerminationDto,
} from './../dtos/resonContractTermination.dto';

@Injectable()
export class ReasonsContractTerminationService {
  constructor(private readonly repo: ReasonsContractTerminationRepository) {}

  /**
   * get all records of ReasonContractTermination
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterReasonContractTerminationDto,
  ): Promise<PaginatedResult<ResponseReasonContractTerminationDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponseReasonContractTerminationDto, data);
    return { data: dto, total };
  }

  /**
   * find one ReasonContractTermination
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseReasonContractTerminationDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Reason not found');
    }
    return plainToInstance(ResponseReasonContractTerminationDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreateReasonContractTerminationDto,
  ): Promise<ResponseReasonContractTerminationDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseReasonContractTerminationDto, newEntity);
  }

  /**
   * update an ReasonContractTermination
   * @param id
   * @param dto UpdateReasonContractTerminationDto
   * @returns ResponseReasonContractTerminationDto
   */
  async update(
    id: string,
    dto: UpdateReasonContractTerminationDto,
  ): Promise<ResponseReasonContractTerminationDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseReasonContractTerminationDto, updatedEntity);
  }

  /**
   * delete an ReasonContractTermination
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Reason not found');
    }
    return 'Reason delete successfully';
  }
}
