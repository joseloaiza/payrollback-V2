import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { CompanyEconomicActivityRiskService } from './company-economic-activity-risk.service';
import {
  CreateCompanyEconomicActivityRiskDto,
  UpdateCompanyEconomicActivityRiskDto,
  FilterCompanyEconomicActivityRiskDto,
  ResponseCompanyEconomicActivityRiskDto,
} from '../dtos/company-economic-activity-risk.dto';

@Controller('company-economic-activity-risk')
export class CompanyEconomicActivityRiskController {
  constructor(private readonly service: CompanyEconomicActivityRiskService) {}

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all CompanyEconomicActivityRisk records.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterCompanyEconomicActivityRiskDto),
    responses: [
      {
        status: 200,
        description: 'CompanyEconomicActivityRisk list.',
        type: ResponseCompanyEconomicActivityRiskDto,
      },
      { status: 404, description: 'Not found.', type: ExceptionResponse },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async findAll(
    @Query() query: Partial<FilterCompanyEconomicActivityRiskDto>,
  ): Promise<PaginatedResult<ResponseCompanyEconomicActivityRiskDto>> {
    const { page = 1, limit = 10 } = query;
    return this.service.findAll(query, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieve a single CompanyEconomicActivityRisk.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'CompanyEconomicActivityRisk found.',
        type: ResponseCompanyEconomicActivityRiskDto,
      },
      { status: 404, description: 'Not found.', type: ExceptionResponse },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'POST',
    summary: 'Create a CompanyEconomicActivityRisk.',
    route: '',
    body: CreateCompanyEconomicActivityRiskDto,
    responses: [
      {
        status: 200,
        description: 'CompanyEconomicActivityRisk created.',
        type: ResponseCompanyEconomicActivityRiskDto,
      },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async create(@Body() dto: CreateCompanyEconomicActivityRiskDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update a CompanyEconomicActivityRisk.',
    route: ':id',
    bodyType: UpdateCompanyEconomicActivityRiskDto,
    responses: [
      {
        status: 200,
        description: 'CompanyEconomicActivityRisk updated.',
        type: ResponseCompanyEconomicActivityRiskDto,
      },
      { status: 404, description: 'Not found.', type: ExceptionResponse },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyEconomicActivityRiskDto,
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete a CompanyEconomicActivityRisk.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'CompanyEconomicActivityRisk deleted.',
        type: String,
      },
      { status: 404, description: 'Not found.', type: ExceptionResponse },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
