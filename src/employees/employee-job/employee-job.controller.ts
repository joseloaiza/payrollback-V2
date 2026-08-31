import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { EmployeeJobService } from './employee-job.service';
import {
  CreateEmployeeJobDto,
  UpdateEmployeeJobDto,
  FilterEmployeeJobDto,
  ResponseEmployeeJobDto,
} from './../dtos/employee-job.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission.enum';

@UseGuards(PermissionsGuard)
@Controller('employeeJob')
export class EmployeeJobController {
  constructor(private readonly service: EmployeeJobService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all employee job information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterEmployeeJobDto),
    responses: [
      {
        status: 200,
        description: 'Job information.',
        type: ResponseEmployeeJobDto,
      },
      {
        status: 404,
        description: 'Job not found',
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
    @Query() query: Partial<FilterEmployeeJobDto>,
  ): Promise<PaginatedResult<ResponseEmployeeJobDto>> {
    return await this.service.findAll(query);
  }

  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Job information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Job information.',
        type: ResponseEmployeeJobDto,
      },
      {
        status: 404,
        description: 'Job Information not found',
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
    summary: 'Save employee job.',
    route: '',
    body: CreateEmployeeJobDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Job information saved.',
        type: ResponseEmployeeJobDto,
      },
      {
        status: 404,
        description: 'Job not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateEmployeeJobDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Employee job information.',
    route: ':id',
    bodyType: UpdateEmployeeJobDto,
    responses: [
      {
        status: 200,
        description: 'Job information.',
        type: ResponseEmployeeJobDto,
      },
      {
        status: 404,
        description: 'Job not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeJobDto) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
