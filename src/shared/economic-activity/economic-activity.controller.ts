import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { EconomicActivityService } from './economic-activity.service';
import {
  CreateEconomicActivityDto,
  UpdateEconomicActivityDto,
  FilterEconomicActivityDto,
  ResponseEconomicActivityDto,
} from '../dtos/economic-activity.dto';

@Controller('economic-activity')
export class EconomicActivityController {
  constructor(private readonly service: EconomicActivityService) {}

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all EconomicActivity records.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterEconomicActivityDto),
    responses: [
      {
        status: 200,
        description: 'EconomicActivity list.',
        type: ResponseEconomicActivityDto,
      },
      { status: 404, description: 'Not found.', type: ExceptionResponse },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async findAll(
    @Query() query: Partial<FilterEconomicActivityDto>,
  ): Promise<PaginatedResult<ResponseEconomicActivityDto>> {
    const { page = 1, limit = 10 } = query;
    return this.service.findAll(query, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieve a single EconomicActivity.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'EconomicActivity found.',
        type: ResponseEconomicActivityDto,
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
    summary: 'Create an EconomicActivity.',
    route: '',
    body: CreateEconomicActivityDto,
    responses: [
      {
        status: 200,
        description: 'EconomicActivity created.',
        type: ResponseEconomicActivityDto,
      },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async create(@Body() dto: CreateEconomicActivityDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update an EconomicActivity.',
    route: ':id',
    bodyType: UpdateEconomicActivityDto,
    responses: [
      {
        status: 200,
        description: 'EconomicActivity updated.',
        type: ResponseEconomicActivityDto,
      },
      { status: 404, description: 'Not found.', type: ExceptionResponse },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEconomicActivityDto,
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete an EconomicActivity.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'EconomicActivity deleted.',
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
