import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';

import { DiagnosisRepository } from './diagnosis.repository';
import {
  CreateDiagnosisDto,
  UpdateDiagnosisDto,
  FilterDiagnosisDto,
  ResponseDiagnosisDto,
} from '../dtos/diagnosis.dto';

@Injectable()
export class DiagnosisService {
  constructor(private readonly repo: DiagnosisRepository) {}

  async findAll(
    queryFilters: FilterDiagnosisDto,
  ): Promise<PaginatedResult<ResponseDiagnosisDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const absenteeTypeDto = plainToInstance(ResponseDiagnosisDto, data);
    return { data: absenteeTypeDto, total };
  }

  /**
   * find one employee contract
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseDiagnosisDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Diagnosis not found');
    }
    return plainToInstance(ResponseDiagnosisDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreateDiagnosisDto): Promise<ResponseDiagnosisDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseDiagnosisDto, newEntity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateDiagnosisDto,
  ): Promise<ResponseDiagnosisDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseDiagnosisDto, updatedEntity);
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
      throw new NotFoundException('Diagnosis not found');
    }
    return 'Diagnosis delete successfully';
  }
}
