import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable, LoggerService } from '@nestjs/common';

import { PayrollJob } from './payroll-jobs.entity';
import { CreatePayrollJobdDto } from '../jobs/payroll-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSearchFilters } from 'src/interfaces/payroll.interfaces';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';

@Injectable()
export class PayrollJobRepository {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @InjectRepository(PayrollJob)
    protected readonly repo: Repository<PayrollJob>,
    private readonly dataSource: DataSource,
  ) {}

  async create(data: CreatePayrollJobdDto): Promise<PayrollJob> {
    const job = this.repo.create({
      ...data,
      processedCount: data.processedCount ?? 0,
      failedCount: data.failedCount ?? 0,
      status: data.status ?? 'processing',
    });
    return await this.repo.save(job);
  }

  async findOne2(id: string): Promise<PayrollJob> {
    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async findOne(id: string): Promise<PayrollJob> {
    return await this.repo.findOne({
      where: { id: id },
      select: [
        'id',
        'companyId',
        'periodData',
        'type',
        'cause_liquidation_id',
        'liquidation_id',
      ],
    });
  }

  /**
   * Find a single job by ID with detailed information
   */
  async findByIdWithDetails(id: string): Promise<PayrollJob | null> {
    return await this.repo.findOne({
      where: { id },
      select: [
        'id',
        'companyId',
        'periodId',
        'totalEmployees',
        'processedCount',
        'failedCount',
        'status',
        'periodData',
        'employeeResults',
        'createdAt',
        'completedAt',
        'updatedAt',
      ],
    });
  }

  /**
   * Search jobs with filters
   */
  async search(filters: JobSearchFilters): Promise<PayrollJob[]> {
    const queryBuilder = this.repo.createQueryBuilder('job');

    // Apply filters
    if (filters.companyId) {
      queryBuilder.andWhere('job.companyId = :companyId', {
        companyId: filters.companyId,
      });
    }

    if (filters.status) {
      if (Array.isArray(filters.status)) {
        queryBuilder.andWhere('job.status IN (:...statuses)', {
          statuses: filters.status,
        });
      } else {
        queryBuilder.andWhere('job.status = :status', {
          status: filters.status,
        });
      }
    }

    if (filters.periodId) {
      queryBuilder.andWhere('job.periodId = :periodId', {
        periodId: filters.periodId,
      });
    }

    if (filters.createdAfter) {
      queryBuilder.andWhere('job.createdAt >= :createdAfter', {
        createdAfter: filters.createdAfter,
      });
    }

    if (filters.createdBefore) {
      queryBuilder.andWhere('job.createdAt <= :createdBefore', {
        createdBefore: filters.createdBefore,
      });
    }

    // Order by most recent first
    queryBuilder.orderBy('job.createdAt', 'DESC');

    // Pagination
    if (filters.limit) {
      queryBuilder.limit(filters.limit);
    }

    if (filters.offset) {
      queryBuilder.offset(filters.offset);
    }

    return await queryBuilder.getMany();
  }

  /**
   * Get all active (processing) jobs for a company
   */
  async findActiveJobsByCompany(companyId: string): Promise<PayrollJob[]> {
    return await this.repo.find({
      where: {
        companyId,
        status: 'processing',
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  /**
   * Get recent jobs for a company
   */
  async findRecentJobsByCompany(
    companyId: string,
    limit: number = 10,
  ): Promise<PayrollJob[]> {
    return await this.repo.find({
      where: { companyId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  /**
   * Count jobs by status for a company
   */
  async countByStatus(companyId: string): Promise<Record<string, number>> {
    const results = await this.repo
      .createQueryBuilder('job')
      .select('job.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('job.companyId = :companyId', { companyId })
      .groupBy('job.status')
      .getRawMany();

    return results.reduce((acc, row) => {
      acc[row.status] = parseInt(row.count, 10);
      return acc;
    }, {});
  }

  async update(payrollJob: PayrollJob): Promise<string> {
    await this.repo.update(payrollJob.id, payrollJob);
    return 'User Updated Successfully';
  }

  async updateJobProgress(
    jobId: string,
    employeeId: string,
    status: 'completed' | 'failed',
    error?: string,
  ): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        const jobRepo = manager.getRepository(PayrollJob);

        const job = await jobRepo
          .createQueryBuilder('job')
          .setLock('pessimistic_write')
          .where('job.id = :jobId', { jobId })
          .getOne();

        if (!job) {
          this.logger.error(`Job ${jobId} not found`);
          return;
        }

        // Initialize employeeResults
        if (!job.employeeResults) {
          job.employeeResults = {};
        }

        // Check duplicate
        if (job.employeeResults[employeeId]) {
          this.logger.warn(`Employee ${employeeId} already processed`);
          return;
        }

        // Record result
        job.employeeResults[employeeId] = {
          status,
          error,
          completedAt: new Date(),
        };

        // Update counts
        if (status === 'completed') {
          job.processedCount += 1;
        } else {
          job.failedCount = (job.failedCount || 0) + 1;
        }

        // Check completion
        const totalProcessed = job.processedCount + (job.failedCount || 0);
        if (totalProcessed >= job.totalEmployees) {
          job.status =
            job.failedCount > 0 ? 'completed_with_errors' : 'completed';
          job.completedAt = new Date();
        }

        await jobRepo.save(job);
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`Failed to update job progress: ${message}`);
      throw err;
    }
  }
}
