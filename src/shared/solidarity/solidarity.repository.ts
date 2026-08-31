import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateSolidarityDto,
  UpdateSolidarityDto,
  FilterSolidarityDto,
} from '../dtos/solidarity.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Solidarity } from '../entities/solidarity.entity';

@Injectable()
export class SolidarityRepository extends BaseRepository<
  Solidarity,
  CreateSolidarityDto,
  UpdateSolidarityDto,
  FilterSolidarityDto
> {
  constructor(
    @InjectRepository(Solidarity)
    repo: Repository<Solidarity>,
  ) {
    super(repo);
  }

  async get_percentage_by_range_salary(
    salary: number,
    isPensionary: boolean,
  ): Promise<Solidarity | null> {
    return await this.repo.findOne({
      where: {
        salaryMin: LessThanOrEqual(salary), // Salary should be >= salaryMin
        salaryMax: MoreThanOrEqual(salary), // Salary should be <= salaryMax
        isPensionary,
      },
      select: ['id', 'percentage', 'perSolidarity', 'perSubsistence'],
    });
  }
}
