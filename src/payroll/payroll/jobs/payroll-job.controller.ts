import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PayrollJobService } from './payroll-job.service';
import { JobSearchFilters } from 'src/payroll/interfaces/payroll.interfaces';

@ApiTags('Payroll Jobs')
@Controller('payroll/jobs')
export class PayrollJobController {
  constructor(private readonly jobService: PayrollJobService) {}

  /**
   * Get job status by ID (lightweight for polling)
   */
  @Get(':jobId')
  @ApiOperation({
    summary: 'Get payroll job status',
    description:
      'Lightweight endpoint for polling job status. Returns basic progress information.',
  })
  @ApiParam({ name: 'jobId', description: 'Job ID' })
  @ApiResponse({
    status: 200,
    description: 'Job status retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async getJobStatus(@Param('jobId') jobId: string) {
    return await this.jobService.getJobStatus(jobId);
  }

  /**
   * Get detailed job information
   */
  @Get(':jobId/details')
  @ApiOperation({
    summary: 'Get detailed job information',
    description:
      'Returns complete job details including individual employee results.',
  })
  @ApiParam({ name: 'jobId', description: 'Job ID' })
  @ApiResponse({
    status: 200,
    description: 'Job details retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async getJobDetails(@Param('jobId') jobId: string) {
    return await this.jobService.getJobDetails(jobId);
  }
  /**
   * Wait for job completion (long polling)
   */
  @Get(':jobId/wait')
  @ApiOperation({
    summary: 'Wait for job completion (long polling)',
    description:
      'Blocks until job completes or timeout is reached. More efficient than regular polling.',
  })
  @ApiParam({ name: 'jobId', description: 'Job ID' })
  @ApiQuery({
    name: 'timeout',
    required: false,
    description: 'Timeout in milliseconds (default: 30000)',
    example: 30000,
  })
  @ApiResponse({ status: 200, description: 'Job status retrieved' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async waitForJobCompletion(
    @Param('jobId') jobId: string,
    @Query('timeout', new DefaultValuePipe(30000), ParseIntPipe)
    timeout: number,
  ) {
    return await this.jobService.waitForJobCompletion(jobId, timeout);
  }

  /**
   * Search jobs
   */
  @Get()
  @ApiOperation({
    summary: 'Search payroll jobs',
    description: 'Search jobs with various filters.',
  })
  @ApiQuery({
    name: 'companyId',
    required: false,
    description: 'Filter by company ID',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description:
      'Filter by status (processing, completed, failed, completed_with_errors)',
  })
  @ApiQuery({
    name: 'periodId',
    required: false,
    description: 'Filter by period ID',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit results (default: 10)',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset for pagination (default: 0)',
  })
  @ApiResponse({ status: 200, description: 'Jobs retrieved successfully' })
  async searchJobs(
    @Query('companyId') companyId?: string,
    @Query('status') status?: string,
    @Query('periodId') periodId?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset?: number,
  ) {
    const filters: JobSearchFilters = {
      companyId,
      status,
      periodId,
      limit,
      offset,
    };

    return await this.jobService.searchJobs(filters);
  }
  /**
   * Get active jobs for a company
   */
  @Get('company/:companyId/active')
  @ApiOperation({
    summary: 'Get active jobs for a company',
    description: 'Returns all currently processing jobs for a company.',
  })
  @ApiParam({ name: 'companyId', description: 'Company ID' })
  @ApiResponse({
    status: 200,
    description: 'Active jobs retrieved successfully',
  })
  async getActiveJobs(@Param('companyId') companyId: string) {
    return await this.jobService.getActiveJobs(companyId);
  }

  /**
   * Get recent jobs for a company
   */
  @Get('company/:companyId/recent')
  @ApiOperation({
    summary: 'Get recent jobs for a company',
    description: 'Returns the most recent jobs for a company.',
  })
  @ApiParam({ name: 'companyId', description: 'Company ID' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of jobs to return (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Recent jobs retrieved successfully',
  })
  async getRecentJobs(
    @Param('companyId') companyId: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.jobService.getRecentJobs(companyId, limit);
  }
}
