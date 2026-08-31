import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateEmployeePaymentDto,
  UpdateEmployeePaymentDto,
  FilterEmployeePaymentDto,
} from './../dtos/employee-payment.dto';
import { BaseRepository } from 'src/database/base.repository';
import { EmployeePayment } from '../entities/employee-payment.entity';

@Injectable()
export class EmployeePaymentRepository extends BaseRepository<
  EmployeePayment,
  CreateEmployeePaymentDto,
  UpdateEmployeePaymentDto,
  FilterEmployeePaymentDto
> {
  constructor(
    @InjectRepository(EmployeePayment)
    repo: Repository<EmployeePayment>,
  ) {
    super(repo);
  }
}
