import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Movement } from './entities/movement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateMovementDto,
  FilterMovementDto,
  UpdateMovementDto,
} from './dto/movement.dto';
import { BaseRepository } from 'src/database/base.repository';

@Injectable()
export class MovementRepository extends BaseRepository<
  Movement,
  CreateMovementDto,
  UpdateMovementDto,
  FilterMovementDto
> {
  constructor(
    @InjectRepository(Movement)
    repo: Repository<Movement>,
  ) {
    super(repo);
  }

  /**
   * method to get an employee movement by concept
   * @param employeeId
   * @param year
   * @param month
   * @param code concept code
   * @returns
   */
  async get_movement_by_concept_month(
    employeeId: string,
    year: number,
    month: number,
    code: string,
  ): Promise<Movement | null> {
    return await this.repo
      .createQueryBuilder('movement')
      .innerJoinAndSelect(
        'movement.concept',
        'concept',
        'concept.code = :code',
        { code },
      )
      .where('movement.employee_id = :employeeId', { employeeId })
      .andWhere('movement.year = :year', { year })
      .andWhere('movement.month = :month', { month })
      .select(['movement.id', 'movement.quantity', 'movement.value']) // Selecting specific fields
      .getOne();
  }

  /**
   * method to get an employee movement by concept
   * @param employeeId
   * @param year
   * @param month
   * @param code concept code
   * @returns
   */
  async get_movement_by_concept_and_period_number(
    employeeId: string,
    periodNumber: number,
    code: string,
  ): Promise<Movement | null> {
    return await this.repo
      .createQueryBuilder('movement')
      .innerJoinAndSelect(
        'movement.period',
        'period',
        'period.number = :periodNumber',
        { periodNumber },
      )
      .innerJoinAndSelect(
        'movement.concept',
        'concept',
        'concept.code = :code',
        { code },
      )
      .where('movement.employee_id = :employeeId', { employeeId })
      .select(['movement.id', 'movement.quantity', 'movement.value']) // Selecting specific fields
      .getOne();
  }

  /**
   * Method to get all employee novelties movements
   * @param employeeId
   * @param companyId
   * @param periodId
   * @param conceptGroup
   * @returns
   */
  async get_novelties_by_employee(
    employeeId: string,
    companyId: string,
    periodId: string,
    conceptGroup?: string,
  ) {
    const query = this.repo
      .createQueryBuilder('movement')
      .leftJoinAndSelect('movement.concept', 'concept')
      .select([
        'movement.id',
        'movement.concept_id',
        'movement.quantity',
        'movement.value',
        'concept.code as concept_code',
      ])
      .where('movement.employee_id = :employeeId', { employeeId })
      .andWhere('movement.company_id = :companyId', { companyId })
      .andWhere('movement.period_id = :periodId', { periodId })
      .andWhere('concept.isNovelty = true');

    if (conceptGroup && conceptGroup !== 'All') {
      query.andWhere('concept.conceptGroup = :conceptGroup', { conceptGroup });
    }

    return query.getMany();
  }

  /**
   * Method to get all employee novelties overtime movements
   * @param employeeId
   * @param companyId
   * @param periodId
   * @param conceptGroup
   * @returns
   */
  async get_novelties_over_time_by_employee(
    employeeId: string,
    companyId: string,
    periodId: string,
  ) {
    const query = this.repo
      .createQueryBuilder('movement')
      .leftJoinAndSelect('movement.concept', 'concept')
      .select([
        'movement.id',
        'movement.concept_id',
        'movement.quantity',
        'movement.value',
        'concept.code as concept_code',
      ])
      .where('movement.employee_id = :employeeId', { employeeId })
      .andWhere('movement.company_id = :companyId', { companyId })
      .andWhere('movement.period_id = :periodId', { periodId })
      .andWhere('concept.isNovelty = true')
      .andWhere('concept.isOverTime = true');

    console.log(query.getQuery());
    return query.getRawMany();
  }

  async get_employees_with_payroll(
    companyId: string,
    periodId: string,
  ): Promise<Movement[]> {
    return await this.repo
      .createQueryBuilder('movement')
      .innerJoin('movement.concept', 'concept') // ✅ Join with concept
      .where('movement.company_id = :companyId', { companyId })
      .andWhere('movement.period_id = :periodId', { periodId })
      .andWhere('concept.isCalculated = true') // ✅ Filter by isCalculated
      .select(['movement.id', 'movement.employee_id', 'movement.period_id']) // ✅ Only return required fields
      .getMany();
  }

  /**
   * get the movements sum filter eihther by year or year and month, also
   * is possible send a querystring to filter for any other field
   * @param employeeId
   * @param year
   * @param month
   * @param queryString
   * @returns
   */
  async get_sum_movements(
    employeeId: string,
    year: number,
    month?: number,
    queryString: Record<string, any> = {},
    periodId?: string,
  ): Promise<number> {
    const query = this.repo
      .createQueryBuilder('movement')
      .select('SUM(movement.value)', 'totalMovements')
      .innerJoin('movement.concept', 'concept')
      .where('movement.employee_id = :employeeId', { employeeId })
      .andWhere('movement.year = :year', { year });

    if (month !== undefined && month !== null) {
      query.andWhere('movement.month = :month', { month });
    }

    if (periodId !== undefined && periodId !== null) {
      query.andWhere('movement.period_id = :periodId', { periodId });
    }

    // Dynamically add conditions from queryString
    Object.entries(queryString).forEach(([key, value]) => {
      query.andWhere(`concept.${key} = :${key}`, { [key]: value });
    });

    const result = await query.getRawOne();
    // Ensure the returned value is a number
    return Number(result?.totalMovements) || 0;
  }
  async get_sum_movements_month_by_concept(
    employeeId: string,
    year: number,
    month: number,
    code: string,
  ): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('movement')
      .select('SUM(movement.value)', 'totalMovements')
      .innerJoin('movement.concept', 'concept')
      .where('movement.employee_id = :employeeId', { employeeId })
      .andWhere('movement.year = :year', { year })
      .andWhere('movement.month = :month', { month })
      .andWhere('concept.code = :code', { code })
      .getRawOne<{ totalMovements: string }>();

    return result?.totalMovements ? parseFloat(result.totalMovements) : 0;
  }

  async save_movements(movements: Movement[]): Promise<void> {
    await this.repo.save(movements);
  }

  async remove_movements_by_concepts(
    employee_id: string,
    company_id: string,
    period_id: string,
    concepts: string[],
  ): Promise<void> {
    await this.repo.delete({
      employee_id,
      company_id,
      period_id,
      concept_id: In(concepts),
    });
  }
  /**
   * dfdfdfd
   * @param employee_id
   * @param period_id
   */
  async remove_all_concepts_by_employee(
    employee_id: string,
    period_id: string,
  ): Promise<void> {
    await this.repo.delete({
      employee_id,
      period_id,
    });
  }

  async get_movements_affecting_antiquity(
    month: number,
    year: number,
    employee_id: string,
  ): Promise<{ totalQuantity: number; totalValue: number }> {
    const result = await this.repo
      .createQueryBuilder('movement')
      .innerJoin('movement.concept', 'concept')
      .innerJoin(
        'absenteeType',
        'absenteeType',
        'absenteeType.id = concept.absenteeType_id',
      )
      .where('movement.month = :month', { month })
      .andWhere('movement.year = :year', { year })
      .andWhere('movement.employee_id = :employee_id', { employee_id })
      .andWhere('absenteeType.affectsAntiquity = true')
      .select('SUM(movement.quantity)', 'totalQuantity')
      .addSelect('SUM(movement.value)', 'totalValue')
      .getRawOne();

    return {
      totalQuantity: Number(result.totalQuantity ?? 0),
      totalValue: Number(result.totalValue ?? 0),
    };
  }
}
