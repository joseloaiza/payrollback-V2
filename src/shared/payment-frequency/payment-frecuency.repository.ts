import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreatePaymentFrequencyDto,
  UpdatePaymentFrequencyDto,
  FilterPaymentFrequencyDto,
} from './../dtos/paymentFrequency.dto';
import { BaseRepository } from 'src/database/base.repository';
import { PaymentFrequency } from '../entities/paymentFrequency.entity';

@Injectable()
export class PaymentFrequencyRepository extends BaseRepository<
  PaymentFrequency,
  CreatePaymentFrequencyDto,
  UpdatePaymentFrequencyDto,
  FilterPaymentFrequencyDto
> {
  constructor(
    @InjectRepository(PaymentFrequency)
    repo: Repository<PaymentFrequency>,
  ) {
    super(repo);
  }
}
