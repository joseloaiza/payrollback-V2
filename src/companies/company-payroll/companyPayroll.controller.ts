import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CompanyPayrollService } from './companyPayroll.service';
import {
  CreateCompanyPayrollDto,
  UpdateCompanyPayrollDto,
  FilterCompanyPayrollDto,
  ResponseCompanyPayrollDto,
} from '../dtos/companyPayroll.dto';
import { PaginatedResult } from '../../utils/interfaces/paginated-result.interface';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';

import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@UseGuards(PermissionsGuard)
@Controller('companyPayroll')
export class CompanyPayrollController {
  constructor(private readonly service: CompanyPayrollService) {}

  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all company payroll information.',
    route: '',
    queryParams: generateApiQueryFromDto(FilterCompanyPayrollDto),
    responses: [
      {
        status: 200,
        description: 'company payroll information.',
        type: ResponseCompanyPayrollDto,
      },
      {
        status: 404,
        description: '',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async findAll(
    @Query() query: Partial<FilterCompanyPayrollDto>,
  ): Promise<PaginatedResult<ResponseCompanyPayrollDto>> {
    return await this.service.findAll(query);
  }

  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves company payroll information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'company payroll information.',
        type: ResponseCompanyPayrollDto,
      },
      {
        status: 404,
        description: '',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
  @RequirePermissions(Permission.COMPANIES_CREATE)
  @Endpoint({
    method: 'POST',
    summary: 'Save company payroll.',
    route: '',
    body: CreateCompanyPayrollDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'company payroll information saved.',
        type: ResponseCompanyPayrollDto,
      },
      {
        status: 404,
        description: 'company payroll not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateCompanyPayrollDto) {
    return await this.service.create(dto);
  }

  @RequirePermissions(Permission.COMPANIES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update company payroll information.',
    route: ':id',
    bodyType: UpdateCompanyPayrollDto,
    responses: [
      {
        status: 200,
        description: 'company payroll information.',
        type: ResponseCompanyPayrollDto,
      },
      {
        status: 404,
        description: '',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateCompanyPayrollDto) {
    return await this.service.update(id, dto);
  }

  @RequirePermissions(Permission.COMPANIES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete company payroll information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'company payroll deleted.',
        type: String,
      },
      {
        status: 404,
        description: '',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
