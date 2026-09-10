import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import {
  CreateCompanyPayrollDto,
  UpdateCompanyPayrollDto,
  FilterCompanyPayrollDto,
  ResponseCompanyPayrollDto,
} from '../dtos/companyPayroll.dto';
import { CompanyPayrollRepository } from './company-payroll.repository';
import { CompanyPayroll } from '../entities/company-payroll.entity';

@Injectable()
export class CompanyPayrollService {
  constructor(private readonly repo: CompanyPayrollRepository) {}

  async findAll(
    queryFilters: FilterCompanyPayrollDto,
  ): Promise<PaginatedResult<ResponseCompanyPayrollDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.findAll(filters, page, limit);
    const transformedData = plainToInstance(ResponseCompanyPayrollDto, data);
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseCompanyPayrollDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('CompanyPayroll not found');
    }
    return plainToInstance(ResponseCompanyPayrollDto, entity);
  }

  async findOne1(id: string): Promise<CompanyPayroll> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('CompanyPayroll not found');
    }
    return entity;
  }

  async create(
    dto: CreateCompanyPayrollDto,
  ): Promise<ResponseCompanyPayrollDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseCompanyPayrollDto, newEntity);
  }

  async update(
    id: string,
    dto: UpdateCompanyPayrollDto,
  ): Promise<ResponseCompanyPayrollDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseCompanyPayrollDto, updatedEntity);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Company Payroll not found');
    }
    return 'Company delete successfully';
  }
}
