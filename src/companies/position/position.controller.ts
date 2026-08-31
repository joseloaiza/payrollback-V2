import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PositionService } from './position.service';
import {
  CreatePositionDto,
  UpdatePositionDto,
  FilterPositionDto,
  ResponsePositionDto,
} from './../dtos/position.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('position')
export class PositionController {
  constructor(private readonly service: PositionService) {}

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all positions information',
    route: '',
    queryParams: generateApiQueryFromDto(FilterPositionDto), // Bind DTO to query params
    responses: [
      {
        status: 200,
        description: 'position payroll information.',
        type: ResponsePositionDto,
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
  async findAll(
    @Query() query: Partial<FilterPositionDto>,
  ): Promise<PaginatedResult<ResponsePositionDto>> {
    return await this.service.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieve position information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Position information.',
        type: ResponsePositionDto,
      },
      {
        status: 404,
        description: 'Position no found',
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
    summary: 'Save position.',
    route: '',
    body: CreatePositionDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Position information saved.',
        type: ResponsePositionDto,
      },
      {
        status: 404,
        description: 'position not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreatePositionDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update Positioninformation.',
    route: ':id',
    bodyType: UpdatePositionDto,
    responses: [
      {
        status: 200,
        description: 'Positioninformation.',
        type: ResponsePositionDto,
      },
      {
        status: 404,
        description: 'Position not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdatePositionDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete Position information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Position deleted.',
        type: String,
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
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
