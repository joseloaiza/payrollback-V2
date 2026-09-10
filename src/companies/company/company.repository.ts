import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './../entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCompanyDto,
  FilterCompanyDto,
  UpdateCompanyDto,
} from './../dtos/company.dto';
import { BaseRepository } from 'src/database/base.repository';

@Injectable()
export class CompanyRepository extends BaseRepository<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
  FilterCompanyDto
> {
  constructor(
    @InjectRepository(Company)
    repo: Repository<Company>,
  ) {
    super(repo);
  }

  async getActiveCompanies(): Promise<Company[]> {
    return this.repo.find({ where: { isActive: true } });
  }

  async findOne(companyId: string): Promise<Company> {
    return this.repo.findOne({ where: { isActive: true, id: companyId } });
  }
}
