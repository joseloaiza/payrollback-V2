import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
  FilterPaymentMethodDto,
} from './../dtos/paymentMethod.dto';
import { BaseRepository } from 'src/database/base.repository';
import { PaymentMethod } from '../entities/paymentMethod.entity';

@Injectable()
export class PaymentMethodRepository extends BaseRepository<
  PaymentMethod,
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
  FilterPaymentMethodDto
> {
  constructor(
    @InjectRepository(PaymentMethod)
    repo: Repository<PaymentMethod>,
  ) {
    super(repo);
  }
}
