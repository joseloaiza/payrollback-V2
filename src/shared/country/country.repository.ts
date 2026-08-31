import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateCountryDto,
  UpdateCountryDto,
  FilterCountryDto,
} from './../dtos/country.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Country } from '../entities/country.entity';

@Injectable()
export class CountryRepository extends BaseRepository<
  Country,
  CreateCountryDto,
  UpdateCountryDto,
  FilterCountryDto
> {
  constructor(
    @InjectRepository(Country)
    repo: Repository<Country>,
  ) {
    super(repo);
  }
}
