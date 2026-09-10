import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CalculatePayrollDto } from './dto/calculateEmployeePayroll.dto';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { GetResumePayrollDto } from './dto/employeePayroll.dto';

@UseGuards(PermissionsGuard)
@Controller('payroll')
export class PayrollController {
  constructor(private readonly service: PayrollService) {}
  /**
   * calculate payroll
   * @param company_id
   * @returns
   */
  @RequirePermissions(Permission.PAYROLL_PROCESS)
  @Post('calculate_payroll')
  @ApiOperation({ summary: 'Calculate payroll for a specific employee' })
  @ApiResponse({ status: 200, description: 'Payroll calculation successful' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error ' })
  async calculatePayroll(@Query() queryParams: CalculatePayrollDto) {
    const {
      employee_id,
      company_id,
      liquidation_id,
      liquidation_date,
      cause_liquidation_id,
      type,
    } = queryParams;
    return await this.service.calculatePayrollCompany(
      company_id,
      employee_id,
      type,
      liquidation_id,
      liquidation_date,
      cause_liquidation_id,
    );
  }

  @RequirePermissions(Permission.PAYROLL_PROCESS)
  @Post('employee_liquidation')
  @ApiOperation({ summary: 'Liquidate employee' })
  @ApiResponse({ status: 200, description: 'Payroll calculation successful' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error ' })
  async liquidation(@Query() queryParams: CalculatePayrollDto) {
    const { employee_id, company_id, liquidation_date, cause_liquidation_id } =
      queryParams;
    return await this.service.calculateLiquidationEmployee(
      company_id,
      employee_id,
      liquidation_date,
      cause_liquidation_id,
    );
  }

  @RequirePermissions(Permission.PAYROLL_READ)
  @Get('get_resume_payroll')
  async getResumePayroll(@Query() queryParams: GetResumePayrollDto) {
    const { period_id, company_id, employee_id } = queryParams;
    return await this.service.getResumePayroll(
      company_id,
      period_id,
      employee_id,
    );
  }
  @RequirePermissions(Permission.PAYROLL_READ)
  @Get('resume_provisions_payroll')
  async getResumeProvisionsPayroll(@Query() queryParams: GetResumePayrollDto) {
    const { period_id, company_id } = queryParams;
    return await this.service.getResumeProvisionsPayroll(company_id, period_id);
  }
}
