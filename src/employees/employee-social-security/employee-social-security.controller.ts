import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';

import { EmployeeSocialSecurityService } from './employee-social-security.service';
import {
  CreateEmployeeSocialSecurityDto,
  UpdateEmployeeSocialSecurityDto,
  FilterEmployeeSocialSecurityDto,
  ResponseEmployeeSocialSecurityDto,
} from './../dtos/employee-social-security.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission.enum';

@UseGuards(PermissionsGuard)
@Controller('employeeSocialSecurity')
export class EmployeeSocialSecurityController {
  constructor(private readonly service: EmployeeSocialSecurityService) {}
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all employee SocialSecurity information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterEmployeeSocialSecurityDto),
    responses: [
      {
        status: 200,
        description: 'SocialSecurity information.',
        type: ResponseEmployeeSocialSecurityDto,
      },
      {
        status: 404,
        description: 'SocialSecurity not found',
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
    @Query() query: Partial<FilterEmployeeSocialSecurityDto>,
  ): Promise<PaginatedResult<ResponseEmployeeSocialSecurityDto>> {
    return await this.service.findAll(query);
  }
  @RequirePermissions(Permission.EMPLOYEES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves SocialSecurity information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Contract information.',
        type: ResponseEmployeeSocialSecurityDto,
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
    summary: 'Save employee SocialSecurity.',
    route: '',
    body: CreateEmployeeSocialSecurityDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'SocialSecurity information saved.',
        type: ResponseEmployeeSocialSecurityDto,
      },
      {
        status: 404,
        description: 'SocialSecurity not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateEmployeeSocialSecurityDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Employee SocialSecurity information.',
    route: ':id',
    bodyType: UpdateEmployeeSocialSecurityDto,
    responses: [
      {
        status: 200,
        description: 'SocialSecurity information.',
        type: ResponseEmployeeSocialSecurityDto,
      },
      {
        status: 404,
        description: 'SocialSecurity not found',
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
    @Body() dto: UpdateEmployeeSocialSecurityDto,
  ) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.EMPLOYEES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete employee SocialSecurity information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'SocialSecurity information deleted.',
        type: ResponseEmployeeSocialSecurityDto,
      },
      {
        status: 404,
        description: 'SocialSecurity not found',
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
