import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';

import { EmployeeTypeService } from './employee-type.service';
import {
  CreateEmployeeTypeDto,
  UpdateEmployeeTypeDto,
  FilterEmployeeTypeDto,
  ResponseEmployeeTypeDto,
} from './../dtos/employee-type.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('employeeType')
export class EmployeeTypeController {
  constructor(private readonly service: EmployeeTypeService) {}

  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all employee Type information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterEmployeeTypeDto),
    responses: [
      {
        status: 200,
        description: 'Type information.',
        type: ResponseEmployeeTypeDto,
      },
      {
        status: 404,
        description: 'Type not found',
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
    @Query() query: Partial<FilterEmployeeTypeDto>,
  ): Promise<PaginatedResult<ResponseEmployeeTypeDto>> {
    return await this.service.findAll(query);
  }
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Type information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Type information.',
        type: ResponseEmployeeTypeDto,
      },
      {
        status: 404,
        description: 'Type not found',
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
    summary: 'Save employee Type.',
    route: '',
    body: CreateEmployeeTypeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Type information saved.',
        type: ResponseEmployeeTypeDto,
      },
      {
        status: 404,
        description: 'Type not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateEmployeeTypeDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Employee Type information.',
    route: ':id',
    bodyType: UpdateEmployeeTypeDto,
    responses: [
      {
        status: 200,
        description: 'Type information.',
        type: ResponseEmployeeTypeDto,
      },
      {
        status: 404,
        description: 'Type not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeTypeDto) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete employee Type.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Type deleted.',
        type: ResponseEmployeeTypeDto,
      },
      {
        status: 404,
        description: 'Type not found',
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
