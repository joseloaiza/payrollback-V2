import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateSalaryTypeDto,
  UpdateSalaryTypeDto,
  FilterSalaryTypeDto,
} from './../dtos/salary-type.dto';
import { BaseRepository } from 'src/database/base.repository';
import { SalaryType } from '../entities/salary-type.entity';

@Injectable()
export class SalaryTypeRepository extends BaseRepository<
  SalaryType,
  CreateSalaryTypeDto,
  UpdateSalaryTypeDto,
  FilterSalaryTypeDto
> {
  constructor(
    @InjectRepository(SalaryType)
    repo: Repository<SalaryType>,
  ) {
    super(repo);
  }
}
