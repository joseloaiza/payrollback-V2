import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { IdentificationTypeService } from './identification-type.service';
import {
  CreateIdentificationTypeDto,
  UpdateIdentificationTypeDto,
  FilterIdentificationTypeDto,
  ResponseIdentificationTypeDto,
} from './../dtos/identificationType.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('IdentificationType')
export class IdentificationTypeController {
  constructor(private readonly service: IdentificationTypeService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all IdentificationType information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterIdentificationTypeDto),
    responses: [
      {
        status: 200,
        description: 'IdentificationType information.',
        type: ResponseIdentificationTypeDto,
      },
      {
        status: 404,
        description: 'IdentificationType not found',
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
    @Query() query: Partial<FilterIdentificationTypeDto>,
  ): Promise<PaginatedResult<ResponseIdentificationTypeDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves IdentificationType information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'IdentificationType information.',
        type: ResponseIdentificationTypeDto,
      },
      {
        status: 404,
        description: 'IdentificationType not found',
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
    summary: 'Save IdentificationType.',
    route: '',
    body: CreateIdentificationTypeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'IdentificationType information saved.',
        type: ResponseIdentificationTypeDto,
      },
      {
        status: 404,
        description: 'IdentificationType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'IdentificationType error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateIdentificationTypeDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PUT',
    summary: 'IdentificationType information.',
    route: ':id',
    bodyType: UpdateIdentificationTypeDto,
    responses: [
      {
        status: 200,
        description: 'IdentificationType information.',
        type: ResponseIdentificationTypeDto,
      },
      {
        status: 404,
        description: 'IdentificationType not found',
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
    @Body() dto: UpdateIdentificationTypeDto,
  ) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
