import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateCityDto,
  UpdateCityDto,
  FilterCityDto,
} from './../dtos/city.dto';
import { BaseRepository } from 'src/database/base.repository';
import { City } from '../entities/city.entity';

@Injectable()
export class CityRepository extends BaseRepository<
  City,
  CreateCityDto,
  UpdateCityDto,
  FilterCityDto
> {
  constructor(
    @InjectRepository(City)
    repo: Repository<City>,
  ) {
    super(repo);
  }
}
