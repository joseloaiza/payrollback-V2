import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateAbsenteeHistoryDto,
  UpdateAbsenteeHistoryDto,
  FilterAbsenteeHistoryDto,
} from './../dtos/absentee-history.dto';
import { BaseRepository } from 'src/database/base.repository';
import { AbsenteeHistory } from '../entities/absenteeHistory.entity';

@Injectable()
export class AbsenteeHistoryRepository extends BaseRepository<
  AbsenteeHistory,
  CreateAbsenteeHistoryDto,
  UpdateAbsenteeHistoryDto,
  FilterAbsenteeHistoryDto
> {
  constructor(
    @InjectRepository(AbsenteeHistory)
    repo: Repository<AbsenteeHistory>,
  ) {
    super(repo);
  }

  async get_absentees_employee_in_period_range(
    employeeId: string,
    iniDatePeriod: Date,
    endDatePeriod: Date,
  ) {
    return await this.repo.find({
      where: {
        employee_id: employeeId,
        initialAbsencesDate: LessThanOrEqual(endDatePeriod),
        endAbsencesDate: MoreThanOrEqual(iniDatePeriod),
        //initialAbsencesDate: Between(iniDatePeriod, endDatePeriod),
      },
      relations: ['absenteeType'],
      order: {
        initialAbsencesDate: 'ASC',
      },
    });
  }

  async get_absentees_employee_by_codes_in_period_range(
    employeeId: string,
    iniDate: Date,
    endDate: Date,
    codes: string[],
  ) {
    return await this.repo
      .createQueryBuilder('absenteeHistory')
      .leftJoinAndSelect('absenteeHistory.absenteeType', 'absenteeType')
      .where('absenteeHistory.employee_id = :employee_id', { employeeId })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'absenteeHistory.initialAbsencesDate BETWEEN :iniDate AND :endDate',
            {
              iniDate,
              endDate,
            },
          ).orWhere(
            'absenteeHistory.endAbsencesDate BETWEEN :iniDate AND :endDate',
            {
              iniDate,
              endDate,
            },
          );
        }),
      )
      .andWhere('absenteeType.code IN (:...codes)', { codes })
      .select([
        'absenteeHistory.id',
        'absenteeHistory.employee_id',
        'absenteeHistory.absenteeType_id',
        'absenteeHistory.initialAbsencesDate',
        'absenteeHistory.endAbsencesDate',
        'absenteeHistory.baseAbsences',
        'absenteeHistory.referenceInhability',
        'absenteeHistory.quantity',
        'absenteeHistory.isActive',
        'absenteeType.code', // Explicitly select absenteeType.code
      ])
      .orderBy('absenteeHistory.initialAbsencesDate', 'ASC')
      .getMany();
  }

  async get_absentees_by_period_range(
    employeeId: string,
    iniDate: Date,
    endDate: Date,
    code?: string,
    codes?: string[],
  ): Promise<AbsenteeHistory[]> {
    const query = this.repo
      .createQueryBuilder('absenteeHistory')
      .innerJoinAndSelect('absenteeHistory.absenteeType', 'absenteeType')
      .where('absenteeHistory.employee_id = :employeeId', { employeeId })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'absenteeHistory.initialAbsencesDate BETWEEN :iniDate AND :endDate',
            { iniDate, endDate },
          ).orWhere(
            'absenteeHistory.endAbsencesDate BETWEEN :iniDate AND :endDate',
            { iniDate, endDate },
          );
        }),
      );

    if (code) {
      query.andWhere('absenteeType.code = :code', { code });
    }

    if (codes) {
      query.andWhere('absenteeType.code IN (:...codes)', { codes });
    }

    return query
      .select([
        'absenteeHistory.id',
        'absenteeHistory.employee_id',
        'absenteeHistory.absenteeType',
        'absenteeHistory.absenteeType_id',
        'absenteeHistory.initialAbsencesDate',
        'absenteeHistory.endAbsencesDate',
        'absenteeHistory.referenceInhability',
        'absenteeHistory.quantity',
        'absenteeHistory.isActive',
        'absenteeHistory.baseAbsences',
        'absenteeType.code',
        'absenteeType.id',
      ])
      .orderBy('absenteeHistory.initialAbsencesDate', 'ASC')
      .getMany();
  }

  async get_days_initial_absentee(id: string): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('absenteeHistory')
      .select('SUM(absenteeHistory.quantity)', 'total')
      .where('absenteeHistory.id = :id', { id })
      .getRawOne();

    return result ? parseInt(result.total, 10) : 0;
  }

  async get_days_absentee_by_reference(
    referenceInhability: string,
    initialAbsencesDate: Date,
  ): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('absenteeHistory')
      .select('SUM(absenteeHistory.quantity)', 'total')
      .where('absenteeHistory.referenceInhability = :referenceInhability', {
        referenceInhability,
      })
      .andWhere('absenteeHistory.initialAbsencesDate < :initialAbsencesDate', {
        initialAbsencesDate,
      })
      .getRawOne();

    return result ? parseInt(result.total, 10) : 0;
  }
}
