import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAreaDto,
  UpdateAreaDto,
  FilterAreaDto,
} from './../dtos/area.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Area } from '../entities/area.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AreaRepository extends BaseRepository<
  Area,
  CreateAreaDto,
  UpdateAreaDto,
  FilterAreaDto
> {
  constructor(
    @InjectRepository(Area)
    repo: Repository<Area>,
  ) {
    super(repo);
  }
}
