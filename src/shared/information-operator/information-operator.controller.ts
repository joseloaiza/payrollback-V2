import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { InformationOperatorService } from './information-operator.service';
import {
  CreateInformationOperatorDto,
  UpdateInformationOperatorDto,
  FilterInformationOperatorDto,
  ResponseInformationOperatorDto,
} from '../dtos/information-operator.dto';

@Controller('information-operator')
export class InformationOperatorController {
  constructor(private readonly service: InformationOperatorService) {}

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all InformationOperator records.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterInformationOperatorDto),
    responses: [
      {
        status: 200,
        description: 'InformationOperator list.',
        type: ResponseInformationOperatorDto,
      },
      { status: 404, description: 'Not found.', type: ExceptionResponse },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async findAll(
    @Query() query: Partial<FilterInformationOperatorDto>,
  ): Promise<PaginatedResult<ResponseInformationOperatorDto>> {
    const { page = 1, limit = 10 } = query;
    return this.service.findAll(query, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieve a single InformationOperator.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'InformationOperator found.',
        type: ResponseInformationOperatorDto,
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
    summary: 'Create an InformationOperator.',
    route: '',
    body: CreateInformationOperatorDto,
    responses: [
      {
        status: 200,
        description: 'InformationOperator created.',
        type: ResponseInformationOperatorDto,
      },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async create(@Body() dto: CreateInformationOperatorDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update an InformationOperator.',
    route: ':id',
    bodyType: UpdateInformationOperatorDto,
    responses: [
      {
        status: 200,
        description: 'InformationOperator updated.',
        type: ResponseInformationOperatorDto,
      },
      { status: 404, description: 'Not found.', type: ExceptionResponse },
      { status: 500, description: 'Server error.', type: ExceptionResponse },
    ],
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInformationOperatorDto,
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete an InformationOperator.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'InformationOperator deleted.',
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
