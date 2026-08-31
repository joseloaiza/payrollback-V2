import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { EmployeeSalaryService } from './employee-salary.service';
import {
  CreateEmployeeSalaryDto,
  UpdateEmployeeSalaryDto,
  FilterEmployeeSalaryDto,
  ResponseEmployeeSalaryDto,
} from './../dtos/employee-salary.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('employeeSalary')
export class EmployeeSalaryController {
  constructor(private readonly service: EmployeeSalaryService) {}
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all employee Salary information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterEmployeeSalaryDto),
    responses: [
      {
        status: 200,
        description: 'Salary information.',
        type: ResponseEmployeeSalaryDto,
      },
      {
        status: 404,
        description: 'Salary not found',
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
    @Query() query: Partial<FilterEmployeeSalaryDto>,
  ): Promise<PaginatedResult<ResponseEmployeeSalaryDto>> {
    return await this.service.findAll(query);
  }
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Salary information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Contract information.',
        type: ResponseEmployeeSalaryDto,
      },
      {
        status: 404,
        description: 'Contract not found',
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
  @RequirePermissions(Permission.EMPLOYEES_CREATE)
  @Endpoint({
    method: 'POST',
    summary: 'Save employee Salary.',
    route: '',
    body: CreateEmployeeSalaryDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Salary information saved.',
        type: ResponseEmployeeSalaryDto,
      },
      {
        status: 404,
        description: 'Salary not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateEmployeeSalaryDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Employee Salary information.',
    route: ':id',
    bodyType: UpdateEmployeeSalaryDto,
    responses: [
      {
        status: 200,
        description: 'Salary information.',
        type: ResponseEmployeeSalaryDto,
      },
      {
        status: 404,
        description: 'Salary not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeSalaryDto) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
