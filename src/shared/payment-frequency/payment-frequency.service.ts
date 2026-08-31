import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { PaymentFrequencyRepository } from './payment-frecuency.repository';
import {
  CreatePaymentFrequencyDto,
  UpdatePaymentFrequencyDto,
  FilterPaymentFrequencyDto,
  ResponsePaymentFrequencyDto,
} from './../dtos/paymentFrequency.dto';
//
@Injectable()
export class PaymentFrequencyService {
  constructor(private readonly repo: PaymentFrequencyRepository) {}

  /**
   * get all records of PaymentFrequency
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterPaymentFrequencyDto,
  ): Promise<PaginatedResult<ResponsePaymentFrequencyDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponsePaymentFrequencyDto, data);
    return { data: dto, total };
  }

  /**
   * find one PaymentFrequency
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponsePaymentFrequencyDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('PaymentFrequency not found');
    }
    return plainToInstance(ResponsePaymentFrequencyDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(
    dto: CreatePaymentFrequencyDto,
  ): Promise<ResponsePaymentFrequencyDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponsePaymentFrequencyDto, newEntity);
  }

  /**
   * update an PaymentFrequency
   * @param id
   * @param dto UpdatePaymentFrequencyDto
   * @returns ResponsePaymentFrequencyDto
   */
  async update(
    id: string,
    dto: UpdatePaymentFrequencyDto,
  ): Promise<ResponsePaymentFrequencyDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponsePaymentFrequencyDto, updatedEntity);
  }

  /**
   * delete an PaymentFrequency
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Payment Frequency not found');
    }
    return 'Payment Frequency delete successfully';
  }
}
