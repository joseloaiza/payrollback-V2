import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Position } from './../entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePositionDto,
  UpdatePositionDto,
  FilterPositionDto,
} from './../dtos/position.dto';
import { BaseRepository } from 'src/database/base.repository';

@Injectable()
export class PositionRepository extends BaseRepository<
  Position,
  CreatePositionDto,
  UpdatePositionDto,
  FilterPositionDto
> {
  constructor(
    @InjectRepository(Position)
    repo: Repository<Position>,
  ) {
    super(repo);
  }
}
