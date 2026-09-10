import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { saveNoveltyDto, ResponseNoveltiesDto } from '../dtos/novelties.dto';
import { PeriodService } from '../../period/period.service';
import { ConceptService } from '../../concepts/concepts.service';
import { Movement } from '../../movement/entities/movement.entity';
import { EmployeeSalaryService } from '../../employees/employee-salary/employee-salary.service';
import { PayrollConstantsService } from '../../shared-config/constants/constants.service';
import { NoveltyCreatedEvent } from '../events/novelty-created.event';
import { MovementService } from '../../movement/movement.service';

@Injectable()
export class NoRecurrentNoveltyService {
  constructor(
    private readonly periodService: PeriodService,
    private readonly conceptService: ConceptService,
    private readonly employeeSalaryService: EmployeeSalaryService,
    private readonly payrollConstantsService: PayrollConstantsService,
    private readonly movementService: MovementService,
    private readonly dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  async save_novelty_payment(
    company_id: string,
    employee_id: string,
    conceptGroup: string,
    novelties: saveNoveltyDto[],
  ) {
    return this.saveNoveltiesBase({
      company_id,
      employee_id,
      conceptGroup,
      novelties,
      isOverTime: false,
    });
  }

  async save_novelty_overTime(
    company_id: string,
    employee_id: string,
    novelties: saveNoveltyDto[],
  ) {
    return this.saveNoveltiesBase({
      company_id,
      employee_id,
      novelties,
      isOverTime: true,
    });
  }

  private async saveNoveltiesBase({
    company_id,
    employee_id,
    conceptGroup,
    novelties,
    isOverTime,
  }: {
    company_id: string;
    employee_id: string;
    conceptGroup?: string;
    novelties: saveNoveltyDto[];
    isOverTime: boolean;
  }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [period, concepts, salary] = await Promise.all([
        this.periodService.getPeriodOnprocess(company_id),
        isOverTime
          ? this.conceptService.getNoveltyConceptsOverTimeByCompany(company_id)
          : this.conceptService.getNoveltyConceptsByCompany(
              company_id,
              conceptGroup,
            ),
        isOverTime
          ? this.employeeSalaryService.get_active_salary_employee(employee_id)
          : null,
      ]);

      const conceptIds = concepts.map((c) => c.id);
      const hourlyRate = salary ? salary.salary / 240 : 0;

      if (conceptIds.length > 0) {
        await queryRunner.manager.delete(Movement, {
          employee_id,
          company_id,
          period_id: period.id,
          concept_id: conceptIds,
        });
      }

      const { id: period_id, year: period_year, month: period_month } = period;

      const movements = novelties
        .map((novelty) => {
          const concept = concepts.find((c) => c.code === novelty.code_concept);
          return queryRunner.manager.create(Movement, {
            employee_id,
            period_id,
            concept_id: isOverTime ? concept.id : novelty.concept_id,
            quantity: isOverTime ? novelty.value : 0,
            value: isOverTime
              ? hourlyRate *
                this.payrollConstantsService.get_constant_value(
                  novelty.code_constant,
                ) *
                novelty.value
              : novelty.value,
            year: period_year,
            month: period_month,
            company_id,
            isNovelty: true,
            isOverTime,
          });
        })
        .filter((movement) => movement !== null);

      if (movements.length > 0) {
        await queryRunner.manager.save(Movement, movements);
      }

      await queryRunner.commitTransaction();
      this.eventEmitter.emit(
        'novelty.created',
        new NoveltyCreatedEvent(employee_id, company_id),
      );

      return {
        success: true,
        message: `Novelties ${isOverTime ? 'OverTime' : ''} saved successfully`,
        data: movements,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: `Failed to save novelties: ${message}`,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async get_novelties_by_employee(
    employee_id: string,
    company_id: string,
    period_id: string,
    concepGroup?: string,
  ): Promise<ResponseNoveltiesDto[]> {
    const novelties =
      await this.movementService.getMovementsNoveltiesTypeInPeriod(
        employee_id,
        company_id,
        period_id,
        concepGroup,
      );

    return novelties.map((record) =>
      plainToInstance(ResponseNoveltiesDto, {
        ...record, // ✅ Spread remaining properties
      }),
    );
  }

  async get_novelties_over_time_by_employee(
    employee_id: string,
    company_id: string,
    period_id: string,
  ): Promise<ResponseNoveltiesDto[]> {
    const novelties =
      await this.movementService.get_novelties_over_time_by_employee(
        employee_id,
        company_id,
        period_id,
      );

    return novelties.map((record) =>
      plainToInstance(ResponseNoveltiesDto, {
        ...record, // ✅ Spread remaining properties
      }),
    );
  }
}
