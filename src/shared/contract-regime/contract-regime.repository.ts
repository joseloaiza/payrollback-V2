import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateContractRegimeDto,
  UpdateContractRegimeDto,
  FilterContractRegimeDto,
} from './../dtos/contractRegime.dto';
import { BaseRepository } from 'src/database/base.repository';
import { ContractRegime } from '../entities/contractRegime.entity';

@Injectable()
export class ContractRegimeRepository extends BaseRepository<
  ContractRegime,
  CreateContractRegimeDto,
  UpdateContractRegimeDto,
  FilterContractRegimeDto
> {
  constructor(
    @InjectRepository(ContractRegime)
    repo: Repository<ContractRegime>,
  ) {
    super(repo);
  }
}
