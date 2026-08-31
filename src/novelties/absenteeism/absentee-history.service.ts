import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  CreateAbsenteeHistoryDto,
  FilterAbsenteeHistoryDto,
  ResponseAbsenteeHistoryDto,
  UpdateAbsenteeHistoryDto,
} from '../dtos/absentee-history.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../../utils/interfaces/paginated-result.interface';
import { PayrollConstantsService } from '../../shared-config/constants/constants.service';
import {
  CodesConfigService,
  ConfigCode,
} from '../../shared-config/codes-config/codes-config.service';
import { EmployeeService } from '../../employees/employee/employee.service';
import { AbsenteeCreatedEvent } from '../events/absentee-created.event';
import { AbsenteeHistoryRepository } from './absentee-history.repository';
@Injectable()
export class AbsenteeHistoryService {
  private disease_absentee: string[];
  private codes: ConfigCode[];
  private constants: Record<string, number> = {};

  constructor(
    private readonly repo: AbsenteeHistoryRepository,
    private eventEmitter: EventEmitter2,
    private readonly codesConfigService: CodesConfigService,
    private readonly payrollConstantsService: PayrollConstantsService,
    private readonly employeeService: EmployeeService,
  ) {}

  private async loadCodes(category: string) {
    this.codes = this.codesConfigService.filterCodes(
      (item) => item.category === category,
    );
  }

  /**
   * add new absenteesm
   * @param CreateAbsenteeHistoryDto
   * @returns
   */

  async add_absentee(
    CreateAbsenteeHistoryDto: CreateAbsenteeHistoryDto,
  ): Promise<ResponseAbsenteeHistoryDto> {
    try {
      const absenteeHistory = await this.repo.create(CreateAbsenteeHistoryDto);
      const { id: employee_id, company } =
        await this.employeeService.getBasicData(
          CreateAbsenteeHistoryDto.employee_id,
        );

      this.eventEmitter.emit(
        'absentee.created',
        new AbsenteeCreatedEvent(employee_id, company.id),
      );
      return plainToInstance(ResponseAbsenteeHistoryDto, absenteeHistory);
    } catch (error) {
      throw new InternalServerErrorException('An error had been occurred');
    }
  }

  /**
   *
   * @param queryFilters
   * @returns
   */
  async findAll(
    queryFilters: FilterAbsenteeHistoryDto,
  ): Promise<PaginatedResult<ResponseAbsenteeHistoryDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const absenteeTypeDto = plainToInstance(ResponseAbsenteeHistoryDto, data);
    return { data: absenteeTypeDto, total };
  }

  /**
   * find one absenteesm
   * @param id
   * @returns
   */

  async findOne(id: string): Promise<ResponseAbsenteeHistoryDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('Absentee not found');
    }
    return plainToInstance(ResponseAbsenteeHistoryDto, entity);
  }

  /**
   * update an employee contract
   * @param id
   * @param dto
   * @returns
   */
  async update(
    id: string,
    dto: UpdateAbsenteeHistoryDto,
  ): Promise<ResponseAbsenteeHistoryDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseAbsenteeHistoryDto, updatedEntity);
  }

  /**
   * delete an employee contract
   * @param id
   * @returns
   *
   */
  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Absentee not found');
    }
    return 'Absentee delete successfully';
  }

  async get_absentees_period_by_employee(
    employeeId: string,
    iniDatePeriod: Date,
    endDatePeriod: Date,
  ): Promise<ResponseAbsenteeHistoryDto[]> {
    const result = await this.repo.get_absentees_employee_in_period_range(
      employeeId,
      iniDatePeriod,
      endDatePeriod,
    );

    return result.map((record) =>
      plainToInstance(ResponseAbsenteeHistoryDto, {
        ...record, // ✅ Spread remaining properties
      }),
    );
  }
  async get_absentees_period_by_codes(
    employeeId: string,
    iniDate: Date,
    endDate: Date,
    codes: string[],
  ): Promise<ResponseAbsenteeHistoryDto[]> {
    try {
      const result =
        await this.repo.get_absentees_employee_by_codes_in_period_range(
          employeeId,
          iniDate,
          endDate,
          codes,
        );
      return result.map((record) =>
        plainToInstance(ResponseAbsenteeHistoryDto, {
          ...record, // ✅ Spread remaining properties
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException('Database error occurred');
    }
  }
}
