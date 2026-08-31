import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';

import { GenderService } from './gender.service';
import {
  CreateGenderDto,
  UpdateGenderDto,
  FilterGenderDto,
  ResponseGenderDto,
} from './../dtos/gender.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('gender')
export class GenderController {
  constructor(private readonly service: GenderService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all gender information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterGenderDto),
    responses: [
      {
        status: 200,
        description: 'Gender information.',
        type: ResponseGenderDto,
      },
      {
        status: 404,
        description: 'Gender not found',
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
    @Query() query: Partial<FilterGenderDto>,
  ): Promise<PaginatedResult<ResponseGenderDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves gender information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Gender information.',
        type: ResponseGenderDto,
      },
      {
        status: 404,
        description: 'Gender not found',
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
    summary: 'Save gender.',
    route: '',
    body: CreateGenderDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Gender information saved.',
        type: ResponseGenderDto,
      },
      {
        status: 404,
        description: 'Gender not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Gender error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateGenderDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Gender information.',
    route: ':id',
    bodyType: UpdateGenderDto,
    responses: [
      {
        status: 200,
        description: 'Gender information.',
        type: ResponseGenderDto,
      },
      {
        status: 404,
        description: 'Gender not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateGenderDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete gender.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Gender deleted.',
        type: ResponseGenderDto,
      },
      {
        status: 404,
        description: 'Gender not found',
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
