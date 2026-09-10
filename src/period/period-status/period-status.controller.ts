import { Controller, Body, Param, Delete, Query } from '@nestjs/common';

import { PeriodStatusService } from './period-status.service';
import {
  CreatePeriodStatusDto,
  UpdatePeriodStatusDto,
  FilterPeriodStatusDto,
  ResponsePeriodStatusDto,
} from '../dto/periodStatus.dto';
import { PaginatedResult } from '../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';

@Controller('period_status')
export class PeriodStatusController {
  constructor(private readonly service: PeriodStatusService) {}

  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all period status information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterPeriodStatusDto),
    responses: [
      {
        status: 200,
        description: 'period status information.',
        type: ResponsePeriodStatusDto,
      },
      {
        status: 404,
        description: 'period status not found',
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
    @Query() query: Partial<FilterPeriodStatusDto>,
  ): Promise<PaginatedResult<ResponsePeriodStatusDto>> {
    return await this.service.findAll(query);
  }

  @Endpoint({
    method: 'GET',
    summary: 'Retrieves period status information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'period status information.',
        type: ResponsePeriodStatusDto,
      },
      {
        status: 404,
        description: 'period status not found',
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

  @Endpoint({
    method: 'POST',
    summary: 'Save period status.',
    route: '',
    body: CreatePeriodStatusDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'period status information saved.',
        type: ResponsePeriodStatusDto,
      },
      {
        status: 404,
        description: 'period status not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'period status error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreatePeriodStatusDto) {
    return await this.service.create(dto);
  }

  @Endpoint({
    method: 'PATCH',
    summary: 'period status information.',
    route: ':id',
    bodyType: UpdatePeriodStatusDto,
    responses: [
      {
        status: 200,
        description: 'period status information.',
        type: ResponsePeriodStatusDto,
      },
      {
        status: 404,
        description: 'period status not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdatePeriodStatusDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
