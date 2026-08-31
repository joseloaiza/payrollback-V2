import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateAccountTypeDto,
  UpdateAccountTypeDto,
  FilterAccountTypeDto,
} from './../dtos/account-type.dto';
import { BaseRepository } from 'src/database/base.repository';
import { AccountType } from '../entities/account-type.entity';

@Injectable()
export class AccountTypeRepository extends BaseRepository<
  AccountType,
  CreateAccountTypeDto,
  UpdateAccountTypeDto,
  FilterAccountTypeDto
> {
  constructor(
    @InjectRepository(AccountType)
    repo: Repository<AccountType>,
  ) {
    super(repo);
  }
}
