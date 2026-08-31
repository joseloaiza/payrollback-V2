import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { EmployeeContractService } from './employee-contract.service';
import {
  CreateEmployeeContractDto,
  UpdateEmployeeContractDto,
  FilterEmployeeContractDto,
  ResponseEmployeeContractDto,
} from './../dtos/employee-contract.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission.enum';

@UseGuards(PermissionsGuard)
@Controller('employeeContract')
export class EmployeeContractController {
  constructor(private readonly service: EmployeeContractService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all employee contract information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterEmployeeContractDto),
    responses: [
      {
        status: 200,
        description: 'Contract information.',
        type: ResponseEmployeeContractDto,
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
  async findAll(
    @Query() query: Partial<FilterEmployeeContractDto>,
  ): Promise<PaginatedResult<ResponseEmployeeContractDto>> {
    return await this.service.findAll(query);
  }
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Contract information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Contract information.',
        type: ResponseEmployeeContractDto,
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
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'POST',
    summary: 'Save Contract Information.',
    route: '',
    body: CreateEmployeeContractDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Contract information saved.',
        type: ResponseEmployeeContractDto,
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
  async create(@Body() dto: CreateEmployeeContractDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Employee contract Area information.',
    route: ':id',
    bodyType: UpdateEmployeeContractDto,
    responses: [
      {
        status: 200,
        description: 'Contract information.',
        type: ResponseEmployeeContractDto,
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
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeContractDto,
  ) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
