import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from './../../database/base.repository';
import {
  CreateCompanyPaymentDto,
  UpdateCompanyPaymentDto,
  FilterCompanyPaymentDto,
} from './../dtos/companyPayment.dto';
import { CompanyPayment } from '../entities/companyPayment.entity';

@Injectable()
export class CompanyPaymentRepository extends BaseRepository<
  CompanyPayment,
  CreateCompanyPaymentDto,
  UpdateCompanyPaymentDto,
  FilterCompanyPaymentDto
> {
  constructor(
    @InjectRepository(CompanyPayment)
    repo: Repository<CompanyPayment>,
  ) {
    super(repo);
  }
}
