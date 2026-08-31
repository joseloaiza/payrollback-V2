import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateContractTypeDto,
  UpdateContractTypeDto,
  FilterContractTypeDto,
} from './../dtos/contractType.dto';
import { BaseRepository } from 'src/database/base.repository';
import { ContractType } from '../entities/contractType.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractTypeRepository extends BaseRepository<
  ContractType,
  CreateContractTypeDto,
  UpdateContractTypeDto,
  FilterContractTypeDto
> {
  constructor(
    @InjectRepository(ContractType)
    repo: Repository<ContractType>,
  ) {
    super(repo);
  }
}
