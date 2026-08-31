import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateEmployeeSocialSecurityDto,
  UpdateEmployeeSocialSecurityDto,
  FilterEmployeeSocialSecurityDto,
} from './../dtos/employee-social-security.dto';
import { BaseRepository } from 'src/database/base.repository';
import { EmployeeSocialSecurity } from '../entities/employee-social-security.entity';

@Injectable()
export class EmployeeSocialSecurityRepository extends BaseRepository<
  EmployeeSocialSecurity,
  CreateEmployeeSocialSecurityDto,
  UpdateEmployeeSocialSecurityDto,
  FilterEmployeeSocialSecurityDto
> {
  constructor(
    @InjectRepository(EmployeeSocialSecurity)
    repo: Repository<EmployeeSocialSecurity>,
  ) {
    super(repo);
  }
}
