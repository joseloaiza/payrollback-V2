import { Inject, Injectable, LoggerService } from '@nestjs/common';

import { Period } from '../period/entities/period.entity';
import { EmployeeService } from '../employees/employee/employee.service';
import { PeriodService } from '../period/period.service';

import { PayrollRepository } from './payroll.repository';
import { PayrollJobRepository } from '../jobs/payroll-job.repository';
import { MessagingClient } from '../messaging/messaging.interface';

import {
  PayrollCalculationError,
  PayrollValidationError,
} from './exceptions/payroll.exceptions';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  cesantias_concept_codes,
  interest_cesantias_concept_codes,
  prima_concept_codes,
  vacaciones_concept_codes,
} from '../constants/constants';
import { movements } from '../interfaces/payroll.interfaces';

const PRESTACIONES_BASE_MAP: Record<
  string,
  {
    base_variable: string;
    base_fixed: string;
    base_value: string;
  }
> = {
  M037: { base_variable: '/130', base_fixed: '/131', base_value: '/132' },
  M032: { base_variable: '/123', base_fixed: '/124', base_value: '/125' },
  M036: { base_variable: '/148', base_fixed: '/147', base_value: '/146' },
};

// Todos los codigos base que deben ir al buffer (no a movements directamente)
const ALL_BASE_CODES = new Set(
  Object.values(PRESTACIONES_BASE_MAP).flatMap(
    ({ base_variable, base_fixed, base_value }) => [
      base_variable,
      base_fixed,
      base_value,
    ],
  ),
);
// resultado: Set { '/130', '/131', '/132', '/123', '/124', '/125', '/148', '/147', '/146' }

@Injectable()
export class PayrollService {
  private readonly BATCH_SIZE = 500;
  private readonly MAX_PARALLEL_BATCHES = 5;
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly periodService: PeriodService,
    private readonly payrollRepo: PayrollRepository,
    private readonly payrollJobRepository: PayrollJobRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @Inject('MESSAGING_CLIENT') private readonly messaging: MessagingClient,
  ) {}

  async calculatePayrollCompany(
    companyId: string,
    employeeId?: string,
    type?: 'payroll' | 'liquidation',
    liquidation_id?: string,
    liquidation_date?: Date,
    cause_liquidation_id?: string,
  ) {
    if (employeeId)
      this.logger.log(
        `Starting payroll calculation for company ${companyId} & employee ${employeeId}`,
      );
    else
      this.logger.log(`Starting payroll calculation for company ${companyId}`);

    this.validateCompanyId(companyId);

    //get the period to proccess
    const period = await this.getCurrentPayrollPeriod(companyId);

    this.logger.log(period);

    if (!period) {
      this.logger.error(`Period for company ${companyId} not foud`);
      throw new PayrollValidationError('Period not found');
    }

    const previousPeriod = await this.periodService.getLastPeriod(
      period.year,
      period.number,
    );

    // Get employees
    this.logger.log(
      `getting employees for company ${companyId}${employeeId ? ` & employee ${employeeId}` : ''}`,
    );
    const employeesId = employeeId
      ? [employeeId]
      : await this.employeeService.getEmployeeIdsByCompany(companyId);

    if (employeesId.length === 0) {
      this.logger.warn(
        `No employees found for payroll calculation in company ${companyId}`,
      );
      return { employeesProcessed: 0, jobId: null };
    }

    const job = await this.payrollJobRepository.create({
      type: type || 'payroll',
      companyId,
      periodId: period.id,
      totalEmployees: employeesId.length,
      processedCount: 0,
      status: 'processing',
      liquidation_date,
      cause_liquidation_id,
      liquidation_id,
      periodData: {
        id: period.id,
        number: period.number,
        year: period.year,
        month: period.month,
        initialDate: period.initialDate,
        endDate: type === 'liquidation' ? liquidation_date : period.endDate,
        isActive: period.isActive,
        previousPeriodYear: previousPeriod.year,
        previousPeriodNumber: previousPeriod.number,
      },
    });

    const payrollJobs = employeesId.map((empId) => ({
      jobId: job.id,
      employeeId: empId,
    }));

    await this.sendMessagesInOptimalBatches(
      payrollJobs,
      process.env.PAYROLL_JOBS_QUEUE,
    );

    //return job;
    this.logger.log(
      `✅ Successfully sent ${payrollJobs.length} payroll jobs for company ${companyId}`,
    );

    return {
      jobId: job.id,
      employeesProcessed: employeesId.length,
    };
  }

  async calculateLiquidationEmployee(
    companyId: string,
    employeeId: string,
    liquidation_date: Date,
    cause_liquidation_id: string,
  ) {
    this.logger.log(`Starting payroll liquidation for employee ${employeeId}`);

    this.validateCompanyId(companyId);

    //get the period to proccess
    const period = await this.getCurrentPayrollPeriod(companyId);

    this.logger.log(period);

    if (!period) {
      this.logger.error(`Period for company ${companyId} not foud`);
      throw new PayrollValidationError('Period not found');
    }

    const previousPeriod = await this.periodService.getLastPeriod(
      period.year,
      period.number,
    );

    // Get employees
    this.logger.log(
      `getting employees for company ${companyId}${employeeId ? ` & employee ${employeeId}` : ''}`,
    );
    const employeesId = [employeeId];

    if (employeesId.length === 0) {
      this.logger.warn(
        `No employees found for payroll calculation in company ${companyId}`,
      );
      return { employeesProcessed: 0, jobId: null };
    }

    const job = await this.payrollJobRepository.create({
      type: 'liquidation',
      companyId,
      periodId: period.id,
      totalEmployees: employeesId.length,
      processedCount: 0,
      status: 'processing',
      liquidation_date,
      cause_liquidation_id,
      periodData: {
        id: period.id,
        number: period.number,
        year: period.year,
        month: period.month,
        initialDate: period.initialDate,
        endDate: period.endDate,
        isActive: period.isActive,
        previousPeriodYear: previousPeriod.year,
        previousPeriodNumber: previousPeriod.number,
      },
    });

    const payrollJobs = employeesId.map((empId) => ({
      jobId: job.id,
      employeeId: empId,
    }));

    await this.sendMessagesInOptimalBatches(
      payrollJobs,
      process.env.LIQUIDATION_JOBS_QUEUE,
    );

    //return job;
    this.logger.log(
      `✅ Successfully sent ${payrollJobs.length} liquidation jobs for employee ${employeeId}`,
    );

    return {
      jobId: job.id,
      employeesProcessed: employeesId.length,
    };
  }

  private async sendMessagesInOptimalBatches(
    messages: any[],
    queueName: string,
  ): Promise<void> {
    if (messages.length === 0) {
      this.logger.warn('No messages to send');
      return;
    }

    const batches = this.chunkArray(messages, this.BATCH_SIZE);
    this.logger.log(
      `Sending ${messages.length} messages in ${batches.length} batches`,
    );

    // Send batches in parallel (with limit)
    for (let i = 0; i < batches.length; i += this.MAX_PARALLEL_BATCHES) {
      const batchGroup = batches.slice(i, i + this.MAX_PARALLEL_BATCHES);

      const results = await Promise.allSettled(
        batchGroup.map(async (batch, index) => {
          const batchNum = i + index + 1;
          try {
            await this.messaging.emitBatch(
              'calculate_payroll',
              batch,
              queueName,
            );
            this.logger.log(
              `✅ Sent batch ${batchNum}/${batches.length} (${batch.length} messages)`,
            );
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err);

            this.logger.error(
              `❌ Failed to send batch ${batchNum}: ${message}`,
            );
            throw err; // Fail fast
          }
        }),
      );
      // Check if all batches in group succeeded
      const failed = results.filter((r) => r.status === 'rejected');
      if (failed.length > 0) {
        throw new PayrollCalculationError(
          `Failed to send ${failed.length} batch(es) to message queue`,
        );
      }
    }
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, (i + 1) * size),
    );
  }

  private validateCompanyId(companyId: string) {
    if (!companyId) {
      throw new PayrollValidationError('Company ID is required');
    }
  }

  private async getCurrentPayrollPeriod(companyId: string): Promise<Period> {
    try {
      return await this.periodService.getPeriodOnprocess(companyId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      this.logger.error('Failed to get current payroll period', message);
      throw new PayrollCalculationError('Could not retrieve payroll period');
    }
  }

  async getResumePayroll(
    companyId: string,
    periodId: string,
    employeeId?: string,
  ): Promise<any[]> {
    const payrolls = await this.payrollRepo.getPayrollSummaryByEmployee(
      companyId,
      periodId,
      employeeId,
    );

    const basesBuffer: Record<string, Record<string, string>> = {};

    const groupedPayrolls = payrolls.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = {
          id: item.id,
          identification: item.identification,
          first_name: item.first_name,
          second_name: item.second_name,
          first_last_name: item.first_last_name,
          second_last_name: item.second_last_name,
          img: item.img,
          salary: item.salary || 0,
          workedDays: 0,
          NOSALARIAL: 0,
          SALARIAL: 0,
          DEDUCCION: 0,
          movements: {
            NOSALARIAL: [],
            SALARIAL: [],
            DEDUCCION: [],
            PRESTACIONESSOCIALES: [],
          },
          liquidation: null,
        };
        basesBuffer[item.id] = {};
      }

      // ── Armar objeto liquidation si existe ──
      if (item.liquidation_id && !acc[item.id].liquidation) {
        acc[item.id].liquidation = {
          id: item.liquidation_id,
          termination_date: item.termination_date,
          cause_liquidation_id: item.cause_liquidation_id,
          type: item.liquidation_type,
          reason: {
            code: item.reason_code,
            description: item.reason_description,
          },
        };
      }

      if (['M000', 'M001', 'M002', 'M003'].includes(item.concept_code)) {
        acc[item.id].workedDays = parseInt(item.quantity) || 0;
      }

      if (ALL_BASE_CODES.has(item.concept_code)) {
        basesBuffer[item.id][item.concept_code] = item.value;
        return acc;
      }

      if (item.concept_group && item.value) {
        acc[item.id][item.concept_group] += parseFloat(item.value);

        const movement: any = {
          quantity: item.quantity,
          value: item.value,
          code: item.concept_code,
          description: item.concept_description,
        };

        if (item.concept_group === 'PRESTACIONESSOCIALES') {
          const baseKeys = PRESTACIONES_BASE_MAP[item.concept_code];

          if (baseKeys) {
            const buf = basesBuffer[item.id];
            movement.base_variable_value = buf[baseKeys.base_variable] ?? null;
            movement.base_fixed_value = buf[baseKeys.base_fixed] ?? null;
            movement.base_value = buf[baseKeys.base_value] ?? null;
          }
        }

        acc[item.id].movements[item.concept_group].push(movement);
      }

      return acc;
    }, {});

    return Object.values(groupedPayrolls);
  }
  async getResumeProvisionsPayroll(
    companyId: string,
    periodId: string,
  ): Promise<any[]> {
    const payrolls = await this.payrollRepo.getProvisionsSummaryByEmployee(
      companyId,
      periodId,
    );

    const groupedPayrolls = payrolls.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = {
          id: item.id,
          identification: item.identification,
          first_name: item.first_name,
          second_name: item.second_name,
          first_last_name: item.first_last_name,
          second_last_name: item.second_last_name,
          img: item.img,
          salary: item.salary || 0,
          workedDays: 0,
          provisions: {
            CESANTIAS: [],
            INTERESES_CESANTIAS: [],
            PRIMA: [],
            VACACIONES: [],
          },
        };
      }

      const movement: movements = {
        concept_code: item.concept_code,
        concept_description: item.concept_description,
        quantity: parseFloat(item.quantity) || 0,
        value: parseFloat(item.value) || 0,
      };

      const codeMap = {
        CESANTIAS: cesantias_concept_codes,
        INTERESES_CESANTIAS: interest_cesantias_concept_codes,
        PRIMA: prima_concept_codes,
        VACACIONES: vacaciones_concept_codes,
      };

      // Then find the key where the code exists
      const targetGroup = Object.keys(codeMap).find((key) =>
        codeMap[key].includes(item.concept_code),
      );

      if (targetGroup) {
        acc[item.id].provisions[targetGroup].push(movement);
      }
      return acc;
    }, {});
    const payrollResults = Object.values(groupedPayrolls);

    return payrollResults;
  }
}
