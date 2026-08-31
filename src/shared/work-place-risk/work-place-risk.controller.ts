import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkPlaceRisksService } from './work-place-risk.service';
import {
  CreateWorkPlaceRisksDto,
  UpdateWorkPlaceRisksDto,
  FilterWorkPlaceRisksDto,
  ResponseWorkPlaceRisksDto,
} from './../dtos/work-place-risk.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('WorkPlaceRisks')
export class WorkPlaceRisksController {
  constructor(private readonly service: WorkPlaceRisksService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all WorkPlaceRisks information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterWorkPlaceRisksDto),
    responses: [
      {
        status: 200,
        description: 'WorkPlaceRisks information.',
        type: ResponseWorkPlaceRisksDto,
      },
      {
        status: 404,
        description: 'WorkPlaceRisks not found',
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
    @Query() query: Partial<FilterWorkPlaceRisksDto>,
  ): Promise<PaginatedResult<ResponseWorkPlaceRisksDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves WorkPlaceRisks information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'WorkPlaceRisks information.',
        type: ResponseWorkPlaceRisksDto,
      },
      {
        status: 404,
        description: 'WorkPlaceRisks not found',
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
    summary: 'Save WorkPlaceRisks.',
    route: '',
    body: CreateWorkPlaceRisksDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'WorkPlaceRisks information saved.',
        type: ResponseWorkPlaceRisksDto,
      },
      {
        status: 404,
        description: 'WorkPlaceRisks not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'WorkPlaceRisks error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateWorkPlaceRisksDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'WorkPlaceRisks information.',
    route: ':id',
    bodyType: UpdateWorkPlaceRisksDto,
    responses: [
      {
        status: 200,
        description: 'WorkPlaceRisks information.',
        type: ResponseWorkPlaceRisksDto,
      },
      {
        status: 404,
        description: 'WorkPlaceRisks not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateWorkPlaceRisksDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
