import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';

import { EmployeeWorkingService } from './employee-working.service';
import {
  CreateEmployeeWorkingDto,
  UpdateEmployeeWorkingDto,
  FilterEmployeeWorkingDto,
  ResponseEmployeeWorkingDto,
} from './../dtos/employee-working.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission.enum';

@UseGuards(PermissionsGuard)
@Controller('employeeWorking')
export class EmployeeWorkingController {
  constructor(private readonly service: EmployeeWorkingService) {}
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all employee worgin information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterEmployeeWorkingDto),
    responses: [
      {
        status: 200,
        description: 'Working information.',
        type: ResponseEmployeeWorkingDto,
      },
      {
        status: 404,
        description: 'Working not found',
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
    @Query() query: Partial<FilterEmployeeWorkingDto>,
  ): Promise<PaginatedResult<ResponseEmployeeWorkingDto>> {
    return await this.service.findAll(query);
  }
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Working information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Working information.',
        type: ResponseEmployeeWorkingDto,
      },
      {
        status: 404,
        description: 'Working not found',
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
    summary: 'Save Working.',
    route: '',
    body: CreateEmployeeWorkingDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Working information saved.',
        type: ResponseEmployeeWorkingDto,
      },
      {
        status: 404,
        description: 'Working not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateEmployeeWorkingDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Working information.',
    route: ':id',
    bodyType: UpdateEmployeeWorkingDto,
    responses: [
      {
        status: 200,
        description: 'Working information.',
        type: ResponseEmployeeWorkingDto,
      },
      {
        status: 404,
        description: 'Working not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeWorkingDto) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete Working.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Working deleted.',
        type: ResponseEmployeeWorkingDto,
      },
      {
        status: 404,
        description: 'Working not found',
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
