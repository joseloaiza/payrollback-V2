import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/database/base.repository';
import { CompanyEconomicActivityRisk } from '../entities/company-economic-activity-risk.entity';
import {
  CreateCompanyEconomicActivityRiskDto,
  UpdateCompanyEconomicActivityRiskDto,
  FilterCompanyEconomicActivityRiskDto,
} from '../dtos/company-economic-activity-risk.dto';

@Injectable()
export class CompanyEconomicActivityRiskRepository extends BaseRepository<
  CompanyEconomicActivityRisk,
  CreateCompanyEconomicActivityRiskDto,
  UpdateCompanyEconomicActivityRiskDto,
  FilterCompanyEconomicActivityRiskDto
> {
  constructor(
    @InjectRepository(CompanyEconomicActivityRisk)
    repo: Repository<CompanyEconomicActivityRisk>,
  ) {
    super(repo);
  }
}
