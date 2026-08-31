import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { EmployeePaymentService } from './employee-payment.service';
import {
  CreateEmployeePaymentDto,
  UpdateEmployeePaymentDto,
  FilterEmployeePaymentDto,
  ResponseEmployeePaymentDto,
} from './../dtos/employee-payment.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission.enum';

@UseGuards(PermissionsGuard)
@Controller('employeepayment')
export class EmployeePaymentController {
  constructor(private readonly service: EmployeePaymentService) {}
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all employee payment information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterEmployeePaymentDto),
    responses: [
      {
        status: 200,
        description: 'payment information.',
        type: ResponseEmployeePaymentDto,
      },
      {
        status: 404,
        description: 'payment not found',
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
    @Query() query: Partial<FilterEmployeePaymentDto>,
  ): Promise<PaginatedResult<ResponseEmployeePaymentDto>> {
    return await this.service.findAll(query);
  }

  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves payment information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Contract information.',
        type: ResponseEmployeePaymentDto,
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
    summary: 'Save employee payment.',
    route: '',
    body: CreateEmployeePaymentDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'payment information saved.',
        type: ResponseEmployeePaymentDto,
      },
      {
        status: 404,
        description: 'payment not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateEmployeePaymentDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Employee payment information.',
    route: ':id',
    bodyType: UpdateEmployeePaymentDto,
    responses: [
      {
        status: 200,
        description: 'payment information.',
        type: ResponseEmployeePaymentDto,
      },
      {
        status: 404,
        description: 'payment not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeePaymentDto) {
    return await this.service.update(id, dto);
  }

  @RequirePermissions(Permission.EMPLOYEES_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
