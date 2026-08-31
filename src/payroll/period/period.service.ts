import {
  Inject,
  Injectable,
  InternalServerErrorException,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { Period } from './../entities/period.entity';
import {
  CreatePeriodDto,
  FilterPeriodDto,
  ResponsePeriodDto,
  UpdatePeriodDto,
} from './../dto/period.dto';

import { PeriodRepository } from './period.repository';
import { CompanyPaymentService } from './../../companies/company-payment/companyPayment.service';
import { PeriodStatusService } from './../period-status/period-status.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class PeriodService {
  constructor(
    private readonly companyPaymentService: CompanyPaymentService,
    private readonly periodStatusService: PeriodStatusService,
    private readonly repo: PeriodRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async findAll(
    queryFilters: FilterPeriodDto,
  ): Promise<PaginatedResult<ResponsePeriodDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
      ['periodStatus'], // Relations to join
      null, // Select all fields from main entity
      {
        periodStatus: ['code', 'description'], // Fields to select from periodStatus relation
      },
    );
    const periodDto = plainToInstance(ResponsePeriodDto, data);
    return { data: periodDto, total };
  }

  async findOne(id: string): Promise<ResponsePeriodDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Period not found');
    }
    return plainToInstance(ResponsePeriodDto, entity);
  }

  async create(companyId: string, year: number): Promise<Period> {
    // Get current date in local timezone
    const now = new Date();
    const colombiaDate = new Date(
      now.toLocaleString('en-US', {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    );
    const currentYear = colombiaDate.getFullYear();
    const currentMonth = colombiaDate.getMonth() + 1; // Months are 0-based (0-11)
    const currentDay = colombiaDate.getDate();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // Get days in current month

    try {
      // Find the most recent period for the given company and year
      const periodInProcess = await this.repo.getPeriodByStatus(
        'PR',
        year,
        companyId,
      );

      const isPastPeriod =
        !periodInProcess || colombiaDate > periodInProcess.endDate;

      const resultPeriod = isPastPeriod
        ? await this.createPeriod(
            companyId,
            currentYear,
            currentMonth,
            currentDay,
            daysInMonth,
          )
        : periodInProcess;
      return resultPeriod;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(
        `Error creando período - companyId: ${companyId}, year: ${year}`,
        err.stack,
      );
      throw new InternalServerErrorException('Error al crear el período');
    }
  }

  async getPeriodOnprocess(company_id: string): Promise<Period> {
    const period = await this.repo.getPeriodOnProcess(company_id);
    if (!period) {
      throw new NotFoundException(
        'No hay un período en proceso para esta empresa',
      );
      // const currentYear = new Date().getFullYear();
      // return await this.create(company_id, currentYear);
    }
    return period;
  }

  async getLastPeriod(
    year: number,
    periodNumber: number,
  ): Promise<ResponsePeriodDto> {
    const entity = await this.repo.getLastPeriod(year, periodNumber);
    if (!entity) {
      throw new NotFoundException('Period not found');
    }
    return plainToInstance(ResponsePeriodDto, entity);
  }

  async updatePeriodStatus(
    periodId: string,
    newStatusCode: string,
  ): Promise<ResponsePeriodDto> {
    try {
      // Find the period by ID
      const period = await this.repo.findOne(periodId);
      if (!period) {
        throw new NotFoundException('Period not found');
      }

      // Get the period status for "Closed"
      const newStatus =
        await this.periodStatusService.periodStatus_by_code(newStatusCode);
      if (!newStatus) {
        throw new NotFoundException(
          `Period status '${newStatusCode}' not found`,
        );
      }
      const updatedPeriod = {
        periodStatus_id: newStatus.id,
        description: newStatus.description,
      } as UpdatePeriodDto;

      await this.repo.update(periodId, updatedPeriod);
      const newPeriod = await this.repo.findOne(periodId, {
        relations: ['periodStatus'],
      });
      return this.convertEntityToDto(newPeriod);
    } catch (error) {
      throw error;
    }
  }

  private async createPeriod(
    companyId: string,
    currentYear: number,
    currentMonth: number,
    currentDay: number,
    daysInMonth: number,
  ): Promise<Period> {
    let periodNumber: number;
    let initialDate: Date;
    let endDate: Date;

    try {
      // Get company payment attributes
      const companyPayment =
        await this.companyPaymentService.findOne(companyId);
      if (!companyPayment) {
        throw new Error(
          `Company payment data not found for company ${companyId}`,
        );
      }

      // Determine payment frequency
      if (companyPayment.paymentFrequency.code === 'Q') {
        if (currentDay <= 15) {
          periodNumber = currentMonth * 2 - 1;
          initialDate = new Date(currentYear, currentMonth - 1, 1);
          endDate = new Date(currentYear, currentMonth - 1, 15);
        } else {
          periodNumber = currentMonth * 2;
          initialDate = new Date(currentYear, currentMonth - 1, 16);
          endDate = new Date(currentYear, currentMonth - 1, daysInMonth);
        }
      } else {
        periodNumber = currentMonth;
        initialDate = new Date(currentYear, currentMonth - 1, 1);
        endDate = new Date(currentYear, currentMonth - 1, daysInMonth);
      }

      // Get the period status
      const periodStatus =
        await this.periodStatusService.periodStatus_by_code('PR');

      if (!periodStatus) {
        throw new Error(`Period status 'PR' not found`);
      }

      const period = {
        year: currentYear,
        number: periodNumber, // Increment period number
        initialDate: initialDate,
        endDate: endDate,
        company_id: companyId,
        periodStatus_id: periodStatus.id, // Replace with real status logic
        description: periodStatus.description,
        isActive: true,
        month: currentMonth,
      };

      const dto = plainToInstance(CreatePeriodDto, period);
      return await this.repo.create(dto);
    } catch (error) {
      throw error;
    }
  }

  private async convertEntityToDto(data: Period): Promise<ResponsePeriodDto> {
    const dto = {
      id: data.id,
      year: data.year,
      number: data.number,
      initialDate: data.initialDate,
      endDate: data.endDate,
      company_id: data.company_id,
      periodStatus_id: data.periodStatus_id,
      description: data.periodStatus.description,
      periodStatus_code: data.periodStatus.code,
      isActive: data.isActive,
      month: data.month,
    } as ResponsePeriodDto;
    return dto;
  }
}
