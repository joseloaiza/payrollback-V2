import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { PayrollJob } from '../../entities/payroll-jobs.entity';
import { CreatePayrollJobdDto } from 'src/payroll/dto/payroll-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSearchFilters } from 'src/payroll/interfaces/payroll.interfaces';

@Injectable()
export class PayrollJobRepository {
  constructor(
    @InjectRepository(PayrollJob)
    protected readonly repo: Repository<PayrollJob>,
  ) {}

  async create(data: CreatePayrollJobdDto) {
    const job = this.repo.create({
      ...data,
      processedCount: data.processedCount ?? 0,
      failedCount: data.failedCount ?? 0,
      status: data.status ?? 'processing',
    });
    return await this.repo.save(job);
  }

  async findOne(id: string): Promise<PayrollJob> {
    return await this.repo.findOne({
      where: { id: id },
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
}
