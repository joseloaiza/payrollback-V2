import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreatePeriodDto,
  UpdatePeriodDto,
  FilterPeriodDto,
} from './dto/period.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Period } from './entities/period.entity';

@Injectable()
export class PeriodRepository extends BaseRepository<
  Period,
  CreatePeriodDto,
  UpdatePeriodDto,
  FilterPeriodDto
> {
  constructor(
    @InjectRepository(Period)
    repo: Repository<Period>,
  ) {
    super(repo);
  }

  async getPeriodByStatus(
    status: string,
    year: number,
    company_id: string,
  ): Promise<Period> {
    try {
      const period = await this.repo.findOne({
        where: {
          year,
          company_id,
          periodStatus: {
            code: status,
          },
        },
        relations: ['periodStatus'],
      });

      return period;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching Period');
    }
  }

  async getPeriodOnProcess(company_id: string): Promise<Period> {
    try {
      const period = await this.repo.findOne({
        where: {
          company_id,
          periodStatus: {
            code: 'PR',
          },
        },
        relations: ['periodStatus'],
      });

      return period;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching Period');
    }
  }
  async getLastPeriod(year: number, periodNumber: number): Promise<Period> {
    if (periodNumber == 1) {
      // Case 1: last period of previous year

      return await this.repo
        .createQueryBuilder('p')
        .where('p.year = :prevYear', { prevYear: year - 1 })
        .orderBy('p.number', 'DESC')
        .getOne();
    } else {
      // Case 2: previous period in the same year
      return await this.repo.findOne({
        where: {
          year: year,
          number: periodNumber - 1,
        },
      });
    }
  }

  async find_period_by_status(
    status: string,
    year: number,
    company_id: string,
  ): Promise<Period> {
    try {
      const period = await this.repo.findOne({
        where: {
          year,
          company_id,
          periodStatus: {
            code: status,
          },
        },
        relations: ['periodStatus'],
      });

      return period;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error fetching Period');
    }
  }
}
