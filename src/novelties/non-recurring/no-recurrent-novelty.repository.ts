import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateNoveltiesDto,
  UpdateNoveltiesDto,
  FilterNoveltiesDto,
} from './../dtos/novelties.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Novelties } from '../entities/novelties.entity';

@Injectable()
export class NoveltiesRepository extends BaseRepository<
  Novelties,
  CreateNoveltiesDto,
  UpdateNoveltiesDto,
  FilterNoveltiesDto
> {
  constructor(
    @InjectRepository(Novelties)
    repo: Repository<Novelties>,
  ) {
    super(repo);
  }
}
