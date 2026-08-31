import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCompanyPayrollDto,
  FilterCompanyPayrollDto,
  UpdateCompanyPayrollDto,
} from './../dtos/companyPayroll.dto';
import { BaseRepository } from 'src/database/base.repository';
import { CompanyPayroll } from '../entities/company-payroll.entity';

@Injectable()
export class CompanyPayrollRepository extends BaseRepository<
  CompanyPayroll,
  CreateCompanyPayrollDto,
  UpdateCompanyPayrollDto,
  FilterCompanyPayrollDto
> {
  constructor(
    @InjectRepository(CompanyPayroll)
    repo: Repository<CompanyPayroll>,
  ) {
    super(repo);
  }
}
