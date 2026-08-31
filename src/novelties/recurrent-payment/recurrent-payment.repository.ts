import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateRecurrentPaymentDto,
  UpdateRecurrentPaymentDto,
  FilterRecurrentPaymentDto,
} from './../../novelties/dtos/recurrent-payment.dto';
import { BaseRepository } from 'src/database/base.repository';
import { RecurrentPayment } from '../../novelties/entities/recurrent-payment.entity';

@Injectable()
export class RecurrentPaymentRepository extends BaseRepository<
  RecurrentPayment,
  CreateRecurrentPaymentDto,
  UpdateRecurrentPaymentDto,
  FilterRecurrentPaymentDto
> {
  constructor(
    @InjectRepository(RecurrentPayment)
    repo: Repository<RecurrentPayment>,
  ) {
    super(repo);
  }
}
