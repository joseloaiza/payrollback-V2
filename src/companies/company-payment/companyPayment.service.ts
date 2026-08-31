import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import {
  CreateCompanyPaymentDto,
  UpdateCompanyPaymentDto,
  FilterCompanyPaymentDto,
  ResponseCompanyPaymentDto,
} from '../dtos/companyPayment.dto';
import { CompanyPaymentRepository } from './comanyPayment.respository';

@Injectable()
export class CompanyPaymentService {
  constructor(private readonly repo: CompanyPaymentRepository) {}

  async findAll(
    queryFilters: FilterCompanyPaymentDto,
  ): Promise<PaginatedResult<ResponseCompanyPaymentDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.findAll(filters, page, limit);
    const transformedData = plainToInstance(ResponseCompanyPaymentDto, data);
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseCompanyPaymentDto> {
    const entity = await this.repo.findOne(id, {
      relations: ['paymentFrequency'],
    });
    if (!entity) {
      throw new NotFoundException('CompanyPayroll not found');
    }
    return plainToInstance(ResponseCompanyPaymentDto, entity);
  }

  async create(
    dto: CreateCompanyPaymentDto,
  ): Promise<ResponseCompanyPaymentDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseCompanyPaymentDto, newEntity);
  }

  async update(
    id: string,
    dto: UpdateCompanyPaymentDto,
  ): Promise<ResponseCompanyPaymentDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseCompanyPaymentDto, updatedEntity);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Company payment not found');
    }
    return 'Company payment delete successfully';
  }
}
