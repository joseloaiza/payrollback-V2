import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CostCenterService } from './cost-center.service';
import {
  CreateCostCenterDto,
  UpdateCostCenterDto,
  FilterCostCenterDto,
  ResponseCostCenterDto,
} from './../dtos/costCenter.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('costCenter')
export class CostCenterController {
  constructor(private readonly service: CostCenterService) {}

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Cost Center information.',
    route: '',
    queryParams: generateApiQueryFromDto(FilterCostCenterDto),
    responses: [
      {
        status: 200,
        description: 'Cost Center information.',
        type: ResponseCostCenterDto,
      },
      {
        status: 404,
        description: 'Cost Center not found',
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
    @Query() query: Partial<FilterCostCenterDto>,
  ): Promise<PaginatedResult<ResponseCostCenterDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Cost Center information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Cost Center information.',
        type: ResponseCostCenterDto,
      },
      {
        status: 404,
        description: 'Cost Center not found',
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
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'POST',
    summary: 'Save Cost Center.',
    route: '',
    body: CreateCostCenterDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Cost Center information saved.',
        type: ResponseCostCenterDto,
      },
      {
        status: 404,
        description: 'Cost Center not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateCostCenterDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update Cost Center information.',
    route: ':id',
    bodyType: UpdateCostCenterDto,
    responses: [
      {
        status: 200,
        description: 'Cost Center information.',
        type: ResponseCostCenterDto,
      },
      {
        status: 404,
        description: 'Cost Center not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateCostCenterDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete Cost Center information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Cost Center deleted.',
        type: String,
      },
      {
        status: 404,
        description: 'Cost Center not found',
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
