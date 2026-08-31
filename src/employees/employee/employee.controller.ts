import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  FilterEmployeeDto,
  ResponseEmployeeDto,
} from './../dtos/employee.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  //
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all employees information.',
    route: '',
    queryParams: generateApiQueryFromDto(FilterEmployeeDto),
    responses: [
      {
        status: 200,
        description: 'Employee information.',
        type: ResponseEmployeeDto,
      },
      {
        status: 404,
        description: 'Employee not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async search_employees(
    @Query() query: Partial<FilterEmployeeDto>,
  ): Promise<PaginatedResult<ResponseEmployeeDto>> {
    return await this.service.search_employees(query);
  }
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Employees.',
    route: 'basic_data/by_company',
    responses: [
      {
        status: 200,
        description: 'Employees information.',
        type: ResponseEmployeeDto,
      },
      {
        status: 404,
        description: 'Employees not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async get_basic_employees_by_company(@Query('company_id') companyId: string) {
    return await this.service.getBasicDataByCompany(companyId);
  }

  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Employees.',
    route: 'full_data/by_company',
    responses: [
      {
        status: 200,
        description: 'Employees information.',
        type: ResponseEmployeeDto,
      },
      {
        status: 404,
        description: 'Employees not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async get_full_employees_by_company(@Query('company_id') companyId: string) {
    return await this.service.getFullDataByCompany(companyId);
  }
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Employee movements.',
    route: '/movements',
    responses: [
      {
        status: 200,
        description: 'Employee movements.',
        type: ResponseEmployeeDto,
      },
      {
        status: 404,
        description: 'movements not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async get_employees_movement(@Query() queryParams): Promise<any> {
    const { period_id, company_id } = queryParams;
    return await this.service.get_employees_movement(company_id, period_id);
  }
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Employee information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Employee information.',
        type: ResponseEmployeeDto,
      },
      {
        status: 404,
        description: 'Employee not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async get_full_data(@Param('id') id: string) {
    return await this.service.getFullData(id);
  }
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Employee information.',
    route: '/basic_data:id',
    responses: [
      {
        status: 200,
        description: 'Employee information.',
        type: ResponseEmployeeDto,
      },
      {
        status: 404,
        description: 'Employee not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async get_basice_data(@Param('id') id: string) {
    return await this.service.getBasicData(id);
  }
  @RequirePermissions(Permission.EMPLOYEES_CREATE)
  @Endpoint({
    method: 'POST',
    summary: 'Save Employee.',
    route: '',
    body: CreateEmployeeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Employee information saved.',
        type: ResponseEmployeeDto,
      },
      {
        status: 404,
        description: 'Employee not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateEmployeeDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update Employee information.',
    route: ':id',
    bodyType: UpdateEmployeeDto,
    responses: [
      {
        status: 200,
        description: 'Employee information.',
        type: ResponseEmployeeDto,
      },
      {
        status: 404,
        description: 'Employee not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Employee information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Employee deleted.',
        type: String,
      },
      {
        status: 404,
        description: 'Employee not found',
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
