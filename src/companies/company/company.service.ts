import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  FilterCompanyDto,
  ResponseCompanyDto,
} from '../dtos/company.dto';
import { CompanyRepository } from './company.repository';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { plainToInstance } from 'class-transformer';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly repo: CompanyRepository) {}

  async findAll(
    queryFilters: FilterCompanyDto,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResult<ResponseCompanyDto>> {
    //are you
    const { data, total } = await this.repo.findAll(queryFilters, page, limit);
    const transformedData = plainToInstance(ResponseCompanyDto, data);
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseCompanyDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Company not found');
    }
    return plainToInstance(ResponseCompanyDto, entity);
  }

  async findOne1(companyId: string): Promise<Company> {
    return await this.repo.findOne(companyId);
  }

  async create(dto: CreateCompanyDto): Promise<ResponseCompanyDto> {
    const movement = await this.repo.create(dto);
    return plainToInstance(ResponseCompanyDto, movement);
  }

  async update(id: string, dto: UpdateCompanyDto): Promise<ResponseCompanyDto> {
    const movement = await this.repo.update(id, dto);
    return plainToInstance(ResponseCompanyDto, movement);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Company not found');
    }
    return 'Company delete successfully';
  }

  async findActiveCompanies(): Promise<Company[]> {
    return await this.repo.getActiveCompanies();
  }
}
