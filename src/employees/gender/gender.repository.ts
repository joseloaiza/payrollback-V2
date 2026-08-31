import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateGenderDto,
  UpdateGenderDto,
  FilterGenderDto,
} from './../dtos/gender.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Gender } from '../entities/gender.entity';

@Injectable()
export class GenderRepository extends BaseRepository<
  Gender,
  CreateGenderDto,
  UpdateGenderDto,
  FilterGenderDto
> {
  constructor(
    @InjectRepository(Gender)
    repo: Repository<Gender>,
  ) {
    super(repo);
  }
}
