import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateSpendingAccountDto,
  UpdateSpendingAccountDto,
  FilterSpendingAccountDto,
} from './../dtos/spending-account.dto';
import { BaseRepository } from 'src/database/base.repository';
import { SpendingAccount } from '../entities/spending-account.entity';

@Injectable()
export class SpendingAccountRepository extends BaseRepository<
  SpendingAccount,
  CreateSpendingAccountDto,
  UpdateSpendingAccountDto,
  FilterSpendingAccountDto
> {
  constructor(
    @InjectRepository(SpendingAccount)
    repo: Repository<SpendingAccount>,
  ) {
    super(repo);
  }
}
