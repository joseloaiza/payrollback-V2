import {
  Inject,
  Injectable,
  NotFoundException,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { Movement } from './entities/movement.entity';
import {
  CreateMovementDto,
  UpdateMovementDto,
  FilterMovementDto,
  ResponseMovementDto,
} from './dto/movement.dto';
import { MovementRepository } from './movement.repository';
import { IPeriod } from 'src/interfaces/payroll.interfaces';

@Injectable()
export class MovementService {
  constructor(
    private readonly movementRepository: MovementRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async findAll(
    queryFilters: FilterMovementDto,
  ): Promise<PaginatedResult<ResponseMovementDto>> {
    const { data, total } = await this.movementRepository.findAll(queryFilters);
    const transformedData = plainToInstance(ResponseMovementDto, data);
    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<ResponseMovementDto> {
    const entity = await this.movementRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('Movement not found');
    }
    return plainToInstance(ResponseMovementDto, entity);
  }

  async create(dto: CreateMovementDto): Promise<Movement> {
    const movement = this.movementRepository.create({
      ...dto,
    });
    return movement;
  }

  async createMovements(
    movementData: any[],
    employeeId: string,
    companyId: string,
    period: IPeriod,
    conceptsMap: Map<string, string>,
  ): Promise<{ successes: Movement[]; failures: string[] }> {
    const failures: string[] = [];

    // 1️⃣ Separate valid and invalid movements
    const validMovements = movementData.filter((m) => {
      const conceptId = conceptsMap.get(m.code);
      if (!conceptId) {
        this.logger.error(`Concept ID not found for code: ${m.code}`);
        failures.push(m.code);
        return false; // skip this one
      }
      return true;
    });

    // 2️⃣ Save all valid movements
    const successes = await Promise.all(
      validMovements.map((m) =>
        this.create({
          employee_id: employeeId,
          quantity: m.days,
          value: m.value,
          concept_id: conceptsMap.get(m.code)!, // safe because we filtered
          period_id: period.id,
          year: period.year,
          month: period.month,
          company_id: companyId,
        }),
      ),
    );

    // 3️⃣ Return both results
    return { successes, failures };
  }

  async saveMovements(
    ...movementArrays: (Movement[] | null | undefined)[]
  ): Promise<void> {
    // Filter out null/undefined arrays and flatten the remaining movements
    const allMovements: Movement[] = movementArrays
      .filter((arr): arr is Movement[] => Array.isArray(arr) && arr.length > 0)
      .flat();

    if (allMovements.length === 0) {
      return;
    }

    const movements_to_save = allMovements.filter(
      (mov) => !(mov.quantity === 0 && mov.value === 0),
    );

    await this.movementRepository.saveMovements(movements_to_save);
  }

  async removeMovementsByConcepts(
    employee_id: string, // Supports multiple employees
    company_id: string,
    period_id: string,
    concept_ids: string[],
  ): Promise<void> {
    return await this.movementRepository.removeMovementsByConcepts(
      employee_id,
      company_id,
      period_id,
      concept_ids,
    );
  }

  async getSumMovementsValues(
    employeeId: string,
    year: number,
    month: number,
    queryString: object,
    periodId?: string,
  ): Promise<number> {
    return this.movementRepository.getSumMovementsValues(
      employeeId,
      year,
      month,
      queryString,
      periodId,
    );
  }

  async getSumMovementsValuesBetweenDates(
    employeeId: string,
    iniDate: Date,
    endDate: Date,
    queryString: object,
  ): Promise<number> {
    return this.movementRepository.getSumMovementsValuesBetweenDates(
      employeeId,
      iniDate,
      endDate,
      queryString,
    );
  }

  async getSumMovementsQuantitiesBetweenDates(
    employeeId: string,
    iniDate: Date,
    endDate: Date,
    queryString: object,
  ): Promise<number> {
    return this.movementRepository.getSumMovementsQuantitiesBetweenDates(
      employeeId,
      iniDate,
      endDate,
      queryString,
    );
  }

  async getSumOfMonthlyMovementsByConcept(
    employeeId: string,
    year: number,
    month: number,
    code: string,
  ): Promise<number> {
    return await this.movementRepository.getSumOfMonthlyMovementsByConcept(
      employeeId,
      year,
      month,
      code,
    );
  }

  /**
   * method to get an employee movement by concept
   * @param employeeId
   * @param year
   * @param month
   * @param code
   * @returns
   */

  async getMovementByConceptMonth(
    employeeId: string,
    year: number,
    month: number,
    code: string,
  ): Promise<Movement> {
    const movement = await this.movementRepository.getMovementByConceptMonth(
      employeeId,
      year,
      month,
      code,
    );
    return movement;
  }

  async getMovementByConceptAndPeriodNumber(
    employeeId: string,
    year: number,
    periodNumber: number,
    code: string,
  ): Promise<Movement> {
    const movement =
      await this.movementRepository.getMovementByConceptAndPeriodNumber(
        employeeId,
        year,
        periodNumber,
        code,
      );

    return movement;
  }

  async getMovementsAffectingAntiquity(
    month: number,
    year: number,
    employee_id: string,
  ): Promise<{ totalQuantity: number; totalValue: number }> {
    return this.movementRepository.getMovementsAffectingAntiquity(
      month,
      year,
      employee_id,
    );
  }

  async getMovementQuantityAndValue(
    concep: string,
    employee_id: string,
    year: number,
    period_number: number,
  ): Promise<{ quantity: number; value: number }> {
    const movement = await this.getMovementByConceptAndPeriodNumber(
      employee_id,
      year,
      period_number,
      concep,
    );

    if (movement) {
      return { quantity: movement.quantity, value: movement.value };
    }
    return { quantity: 0, value: 0 };
  }

  async update(
    id: string,
    dto: UpdateMovementDto,
  ): Promise<ResponseMovementDto> {
    const movement = await this.movementRepository.update(id, dto);
    return plainToInstance(ResponseMovementDto, movement);
  }

  async delete(id: string): Promise<string> {
    const result = await this.movementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Movement not found');
    }
    return 'Movement delete successfully';
  }

  /**
   * method to get an employee movement by concept
   * @param employeeId
   * @param year
   * @param month
   * @param code
   * @returns
   */

  async get_movement_by_concept_month(
    employeeId: string,
    year: number,
    month: number,
    code: string,
  ): Promise<ResponseMovementDto> {
    const movement = await this.movementRepository.getMovementByConceptMonth(
      employeeId,
      year,
      month,
      code,
    );
    return plainToInstance(ResponseMovementDto, movement);
  }

  async get_movement_by_concept_and_period_number(
    employeeId: string,
    periodNumber: number,
    code: string,
  ): Promise<ResponseMovementDto> {
    const movement =
      await this.movementRepository.get_movement_by_concept_and_period_number(
        employeeId,
        periodNumber,
        code,
      );

    return plainToInstance(ResponseMovementDto, movement);
  }

  async getQuantityAndValue(
    concep: string,
    employee_id: string,
    period_number: number,
  ): Promise<{ quantity: number; value: number }> {
    const movement = await this.get_movement_by_concept_and_period_number(
      employee_id,
      period_number - 1,
      concep,
    );

    if (movement) {
      return { quantity: movement.quantity, value: movement.value };
    }
    return { quantity: 0, value: 0 };
  }

  /**
   * Method to get all employee novelties movements
   * @param employeeId
   * @param companyId
   * @param periodId
   * @param conceptGroup
   * @returns
   */
  async getMovementsNoveltiesTypeInPeriod(
    employeeId: string,
    companyId: string,
    periodId: string,
    conceptGroup?: string,
  ): Promise<Movement[]> {
    return await this.movementRepository.getMovementsNoveltiesTypeInPeriod(
      employeeId,
      companyId,
      periodId,
      conceptGroup,
    );
  }

  async get_novelties_over_time_by_employee(
    employeeId: string,
    companyId: string,
    periodId: string,
  ): Promise<Movement[]> {
    return await this.movementRepository.get_novelties_over_time_by_employee(
      employeeId,
      companyId,
      periodId,
    );
  }

  async get_employees_with_payroll(
    companyId: string,
    periodId: string,
  ): Promise<Movement[]> {
    return await this.movementRepository.get_employees_with_payroll(
      companyId,
      periodId,
    );
  }

  async create_movement(dto: CreateMovementDto): Promise<Movement> {
    const movement = this.movementRepository.createNosave({
      ...dto,
    });
    return movement;
  }

  async remove_all_concepts_by_employee(
    employee_id: string,
    period_id: string,
  ): Promise<void> {
    await this.movementRepository.remove_all_concepts_by_employee(
      employee_id,
      period_id,
    );
  }
}
