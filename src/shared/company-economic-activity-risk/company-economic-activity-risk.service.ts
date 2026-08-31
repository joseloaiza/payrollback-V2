import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { CompanyEconomicActivityRiskRepository } from './company-economic-activity-risk.repository';
import {
  CreateCompanyEconomicActivityRiskDto,
  UpdateCompanyEconomicActivityRiskDto,
  FilterCompanyEconomicActivityRiskDto,
  ResponseCompanyEconomicActivityRiskDto,
} from '../dtos/company-economic-activity-risk.dto';

@Injectable()
export class CompanyEconomicActivityRiskService {
  constructor(private readonly repo: CompanyEconomicActivityRiskRepository) {}

  async findAll(
    queryFilters: FilterCompanyEconomicActivityRiskDto,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResult<ResponseCompanyEconomicActivityRiskDto>> {
    const { data, total } = await this.repo.findAll(queryFilters, page, limit, [
      'workPlaceRisks',
    ]);
    return {
      data: plainToInstance(ResponseCompanyEconomicActivityRiskDto, data),
      total,
    };
  }

  async findOne(id: string): Promise<ResponseCompanyEconomicActivityRiskDto> {
    const entity = await this.repo.findOne(id);
    if (!entity)
      throw new NotFoundException('CompanyEconomicActivityRisk not found');
    return plainToInstance(ResponseCompanyEconomicActivityRiskDto, entity);
  }

  async create(
    dto: CreateCompanyEconomicActivityRiskDto,
  ): Promise<ResponseCompanyEconomicActivityRiskDto> {
    const entity = await this.repo.create(dto);
    return plainToInstance(ResponseCompanyEconomicActivityRiskDto, entity);
  }

  async update(
    id: string,
    dto: UpdateCompanyEconomicActivityRiskDto,
  ): Promise<ResponseCompanyEconomicActivityRiskDto> {
    const entity = await this.repo.update(id, dto);
    return plainToInstance(ResponseCompanyEconomicActivityRiskDto, entity);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('CompanyEconomicActivityRisk not found');
    return 'CompanyEconomicActivityRisk deleted successfully';
  }
}
