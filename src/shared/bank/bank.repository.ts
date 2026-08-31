import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateBankDto,
  UpdateBankDto,
  FilterBankDto,
} from './../dtos/bank.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Bank } from '../entities/bank.entity';

@Injectable()
export class BankRepository extends BaseRepository<
  Bank,
  CreateBankDto,
  UpdateBankDto,
  FilterBankDto
> {
  constructor(
    @InjectRepository(Bank)
    repo: Repository<Bank>,
  ) {
    super(repo);
  }
}
