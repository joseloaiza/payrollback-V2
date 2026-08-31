import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { NoRecurrentNoveltyService } from './no-recurrent-novelty.service';
import { saveNoveltyDto, ResponseNoveltiesDto } from '../dtos/novelties.dto';
import { Endpoint } from '../../utils/decorators/Endpoint';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('no-recurrent-novelties')
export class NoRecurrentNovelyController {
  constructor(private readonly service: NoRecurrentNoveltyService) {}
  @RequirePermissions(Permission.NOVELTIES_CREATE)
  @Endpoint({
    method: 'POST',
    summary: 'Save novelty salarial payment or no salarial payment',
    route: '/payment/:company_id/:employee_id',
    bodyType: {
      schema: {
        type: 'object',
        properties: {
          conceptGroup: { type: 'string', example: 'Salary Adjustments' },
          novelties: {
            type: 'array',
            items: { $ref: '#/components/schemas/SaveNoveltyDto' },
          },
        },
      },
    },
    responses: [
      {
        status: 200,
        description: 'novelty information saved.',
        type: null,
      },
      {
        status: 404,
        description: '',
        type: ExceptionResponse,
      },
    ],
  })
  async save_novelty_payment(
    @Param('company_id') company_id: string,
    @Param('employee_id') employee_id: string,
    @Body('conceptGroup') conceptGroup: string,
    @Body('novelties') novelties: saveNoveltyDto[],
  ) {
    return this.service.save_novelty_payment(
      company_id,
      employee_id,
      conceptGroup,
      novelties,
    );
  }
  @RequirePermissions(Permission.NOVELTIES_CREATE)
  @Endpoint({
    method: 'POST',
    summary: 'Save novelty overtime',
    route: '/overtime',
    bodyType: {
      schema: {
        type: 'object',
        properties: {
          conceptGroup: { type: 'string', example: 'Salary Adjustments' },
          novelties: {
            type: 'array',
            items: { $ref: '#/components/schemas/SaveNoveltyDto' },
          },
        },
      },
    },
    queryParams: [
      {
        name: 'company_id',
        required: true,
        type: String,
        description: 'Company id',
      },
      {
        name: 'employee_id',
        required: true,
        type: String,
        description: 'Employee id',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'novelty information saved.',
        type: null,
      },
      {
        status: 404,
        description: '',
        type: ExceptionResponse,
      },
    ],
  })
  async save_novelty_overTime(
    @Query() queryParams,
    @Body('novelties') novelties: saveNoveltyDto[],
  ) {
    const { company_id, employee_id } = queryParams;
    return this.service.save_novelty_overTime(
      company_id,
      employee_id,
      novelties,
    );
  }
  @RequirePermissions(Permission.NOVELTIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves novelties information.',
    route: '',
    responses: [
      {
        status: 200,
        description: 'Novelties information.',
        type: ResponseNoveltiesDto,
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
    queryParams: [
      {
        name: 'employee_id',
        required: true,
        type: String,
        description: 'Employee id',
      },
      {
        name: 'company_id',
        required: true,
        type: String,
        description: 'Company id',
      },
      {
        name: 'period_id',
        required: true,
        type: String,
        description: 'Period id',
      },
      {
        name: 'concepGroup',
        required: false,
        type: String,
        description: 'Concept Group',
      },
    ],
  })
  async get_novelties_by_employee(@Query() queryParams) {
    const { employee_id, company_id, period_id, concepGroup } = queryParams;
    return this.service.get_novelties_by_employee(
      employee_id,
      company_id,
      period_id,
      concepGroup,
    );
  }
  @RequirePermissions(Permission.NOVELTIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves novelties overtime information.',
    route: '/overtime',
    queryParams: [
      {
        name: 'employee_id',
        required: true,
        type: String,
        description: 'Employee id',
      },
      {
        name: 'company_id',
        required: true,
        type: String,
        description: 'Company id',
      },
      {
        name: 'period_id',
        required: true,
        type: String,
        description: 'Period id',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Novelties overtime information.',
        type: ResponseNoveltiesDto,
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
  async get_novelties_over_time_by_employee(@Query() queryParams) {
    const { employee_id, company_id, period_id } = queryParams;
    return this.service.get_novelties_over_time_by_employee(
      employee_id,
      company_id,
      period_id,
    );
  }
}
