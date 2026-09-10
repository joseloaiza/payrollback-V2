import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ConceptService } from './concepts.service';
import {
  CreateConceptDto,
  UpdateConceptDto,
  FilterConceptDto,
  ResponseConceptDto,
} from './concept.dto';
import { PaginatedResult } from './../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('concept')
export class ConceptsController {
  constructor(private readonly service: ConceptService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Concept information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterConceptDto),
    responses: [
      {
        status: 200,
        description: 'Concept information.',
        type: ResponseConceptDto,
      },
      {
        status: 404,
        description: 'Concept not found',
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
    @Query() query: Partial<FilterConceptDto>,
  ): Promise<PaginatedResult<ResponseConceptDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Concept information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Concept information.',
        type: ResponseConceptDto,
      },
      {
        status: 404,
        description: 'Concept not found',
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
    summary: 'Save Concept.',
    route: '',
    body: CreateConceptDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Concept information saved.',
        type: ResponseConceptDto,
      },
      {
        status: 404,
        description: 'Concept not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Concept error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateConceptDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Concept information.',
    route: ':id',
    bodyType: UpdateConceptDto,
    responses: [
      {
        status: 200,
        description: 'Concept information.',
        type: ResponseConceptDto,
      },
      {
        status: 404,
        description: 'Concept not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateConceptDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
