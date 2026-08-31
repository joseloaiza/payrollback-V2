import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateSubsidiaryDto,
  UpdateSubsidiaryDto,
  FilterSubsidiaryDto,
} from './../dtos/subsidiary.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Subsidiary } from '../entities/subsidiary.entity';

@Injectable()
export class SubsidiaryRepository extends BaseRepository<
  Subsidiary,
  CreateSubsidiaryDto,
  UpdateSubsidiaryDto,
  FilterSubsidiaryDto
> {
  constructor(
    @InjectRepository(Subsidiary)
    repo: Repository<Subsidiary>,
  ) {
    super(repo);
  }
}
