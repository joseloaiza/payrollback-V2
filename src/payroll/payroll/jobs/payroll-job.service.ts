import { Injectable, NotFoundException } from '@nestjs/common';
import { PayrollJobRepository } from './payroll-job.repository';
import {
  JobDetailResponse,
  JobSearchFilters,
  JobStatusResponse,
} from 'src/payroll/interfaces/payroll.interfaces';

@Injectable()
export class PayrollJobService {
  constructor(private readonly payrollJobRepository: PayrollJobRepository) {}

  async getJobStatus(jobId: string): Promise<JobStatusResponse> {
    const job = await this.payrollJobRepository.findOne(jobId);
    if (!job) {
      throw new NotFoundException(`Job ${jobId} not found`);
    }
    const totalProcessed = job.processedCount + (job.failedCount || 0);
    const progress =
      job.totalEmployees > 0
        ? Math.round((totalProcessed / job.totalEmployees) * 100)
        : 0;

    // Estimate time remaining (simple calculation based on average processing time)
    let estimatedTimeRemaining: number | undefined;
    if (job.status === 'processing' && totalProcessed > 0) {
      const elapsedTime = new Date().getTime() - job.createdAt.getTime();
      const avgTimePerEmployee = elapsedTime / totalProcessed;
      const remainingEmployees = job.totalEmployees - totalProcessed;
      estimatedTimeRemaining = Math.round(
        (avgTimePerEmployee * remainingEmployees) / 1000,
      ); // in seconds
    }
    return {
      jobId: job.id,
      companyId: job.companyId,
      periodId: job.periodId,
      status: job.status,
      progress,
      totalEmployees: job.totalEmployees,
      processedCount: job.processedCount,
      failedCount: job.failedCount || 0,
      createdAt: job.createdAt,
      completedAt: job.completedAt,
      updatedAt: job.updatedAt,
      estimatedTimeRemaining,
      periodData: job.periodData
        ? {
            id: job.periodData.id,
            number: job.periodData.number,
            year: job.periodData.year,
            month: job.periodData.month,
            initialDate: job.periodData.initialDate,
            endDate: job.periodData.endDate,
          }
        : undefined,
    };
  }

  async getJobDetails(jobId: string): Promise<JobDetailResponse | null> {
    const job = await this.payrollJobRepository.findByIdWithDetails(jobId);
    if (!job) {
      throw new NotFoundException(`Job ${jobId} not found`);
    }

    const totalProcessed = job.processedCount + (job.failedCount || 0);
    const progress =
      job.totalEmployees > 0
        ? Math.round((totalProcessed / job.totalEmployees) * 100)
        : 0;

    // Parse employee results
    const failedEmployees: Array<{
      employeeId: string;
      error: string;
      completedAt: Date;
    }> = [];
    const completedEmployees: Array<{
      employeeId: string;
      completedAt: Date;
    }> = [];

    const completedWithErrorsEmployees: Array<{
      employeeId: string;
      completedAt: Date;
    }> = [];

    if (job.employeeResults) {
      Object.entries(job.employeeResults).forEach(([employeeId, result]) => {
        if (result.status === 'failed') {
          failedEmployees.push({
            employeeId,
            error: result.error || 'Unknown error',
            completedAt: result.completedAt,
          });
        } else if (result.status === 'completed') {
          completedEmployees.push({
            employeeId,
            completedAt: result.completedAt,
          });
        } else if (result.status === 'completed_with_errors') {
          completedWithErrorsEmployees.push({
            employeeId,
            completedAt: result.completedAt,
          });
        }
      });
    }

    return {
      jobId: job.id,
      companyId: job.companyId,
      periodId: job.periodId,
      status: job.status,
      progress,
      totalEmployees: job.totalEmployees,
      processedCount: job.processedCount,
      failedCount: job.failedCount || 0,
      createdAt: job.createdAt,
      completedAt: job.completedAt,
      updatedAt: job.updatedAt,
      periodData: job.periodData
        ? {
            id: job.periodData.id,
            number: job.periodData.number,
            year: job.periodData.year,
            month: job.periodData.month,
            initialDate: job.periodData.initialDate,
            endDate: job.periodData.endDate,
          }
        : undefined,
      employeeResults: job.employeeResults,
      failedEmployees,
      completedEmployees,
      completedWithErrorsEmployees,
    };
  }

  async searchJobs(filters: JobSearchFilters): Promise<JobStatusResponse[]> {
    const jobs = await this.payrollJobRepository.search(filters);

    return jobs.map((job) => {
      const totalProcessed = job.processedCount + (job.failedCount || 0);
      const progress =
        job.totalEmployees > 0
          ? Math.round((totalProcessed / job.totalEmployees) * 100)
          : 0;

      return {
        jobId: job.id,
        companyId: job.companyId,
        periodId: job.periodId,
        status: job.status,
        progress,
        totalEmployees: job.totalEmployees,
        processedCount: job.processedCount,
        failedCount: job.failedCount || 0,
        createdAt: job.createdAt,
        completedAt: job.completedAt,
        updatedAt: job.updatedAt,
      };
    });
  }
  /**
   * Get active jobs for a company
   */
  async getActiveJobs(companyId: string): Promise<JobStatusResponse[]> {
    return this.searchJobs({
      companyId,
      status: 'processing',
    });
  }

  /**
   * Get recent jobs for a company
   */
  async getRecentJobs(
    companyId: string,
    limit: number = 10,
  ): Promise<JobStatusResponse[]> {
    return this.searchJobs({
      companyId,
      limit,
    });
  }

  /**
   * Wait for job completion (long polling)
   */
  async waitForJobCompletion(
    jobId: string,
    timeout: number = 30000,
  ): Promise<JobStatusResponse> {
    const startTime = Date.now();
    const pollInterval = 2000; // Check every 2 seconds

    while (Date.now() - startTime < timeout) {
      const status = await this.getJobStatus(jobId);

      if (
        ['completed', 'completed_with_errors', 'failed'].includes(status.status)
      ) {
        return status;
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    // Timeout reached, return current status
    return this.getJobStatus(jobId);
  }
}
