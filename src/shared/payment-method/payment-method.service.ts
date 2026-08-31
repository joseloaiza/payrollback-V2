import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { PaymentMethodRepository } from './payment-mathod.repository';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
  FilterPaymentMethodDto,
  ResponsePaymentMethodDto,
} from './../dtos/paymentMethod.dto';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly repo: PaymentMethodRepository) {}

  /**
   * get all records of PaymentMethod
   * @param queryFilters
   * @returns promise of PaginatedResult
   */
  async findAll(
    queryFilters: FilterPaymentMethodDto,
  ): Promise<PaginatedResult<ResponsePaymentMethodDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const dto = plainToInstance(ResponsePaymentMethodDto, data);
    return { data: dto, total };
  }

  /**
   * find one PaymentMethod
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponsePaymentMethodDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('PaymentMethod not found');
    }
    return plainToInstance(ResponsePaymentMethodDto, entity);
  }

  /**
   * create an employee contract
   * @param dto
   * @returns
   */

  async create(dto: CreatePaymentMethodDto): Promise<ResponsePaymentMethodDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponsePaymentMethodDto, newEntity);
  }

  /**
   * update an PaymentMethod
   * @param id
   * @param dto UpdatePaymentMethodDto
   * @returns ResponsePaymentMethodDto
   */
  async update(
    id: string,
    dto: UpdatePaymentMethodDto,
  ): Promise<ResponsePaymentMethodDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponsePaymentMethodDto, updatedEntity);
  }

  /**
   * delete an PaymentMethod
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('PaymentMethod not found');
    }
    return 'PaymentMethod delete successfully';
  }
}
