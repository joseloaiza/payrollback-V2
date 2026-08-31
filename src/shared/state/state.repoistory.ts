import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateStateDto,
  UpdateStateDto,
  FilterStateDto,
} from './../dtos/state.dto';
import { BaseRepository } from 'src/database/base.repository';
import { State } from '../entities/state.entity';

@Injectable()
export class StateRepository extends BaseRepository<
  State,
  CreateStateDto,
  UpdateStateDto,
  FilterStateDto
> {
  constructor(
    @InjectRepository(State)
    repo: Repository<State>,
  ) {
    super(repo);
  }
}
