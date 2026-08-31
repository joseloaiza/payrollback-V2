import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SolidarityService } from './solidarity.service';
import {
  CreateSolidarityDto,
  UpdateSolidarityDto,
  FilterSolidarityDto,
  ResponseSolidarityDto,
} from './../dtos/solidarity.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

///
@Controller('Solidarity')
export class SolidarityController {
  constructor(private readonly service: SolidarityService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Solidarity information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterSolidarityDto),
    responses: [
      {
        status: 200,
        description: 'Solidarity information.',
        type: ResponseSolidarityDto,
      },
      {
        status: 404,
        description: 'Solidarity not found',
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
    @Query() query: Partial<FilterSolidarityDto>,
  ): Promise<PaginatedResult<ResponseSolidarityDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Solidarity information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Solidarity information.',
        type: ResponseSolidarityDto,
      },
      {
        status: 404,
        description: 'Solidarity not found',
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
    summary: 'Save Solidarity.',
    route: '',
    body: CreateSolidarityDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Solidarity information saved.',
        type: ResponseSolidarityDto,
      },
      {
        status: 404,
        description: 'Solidarity not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Solidarity error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateSolidarityDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Solidarity information.',
    route: ':id',
    bodyType: UpdateSolidarityDto,
    responses: [
      {
        status: 200,
        description: 'Solidarity information.',
        type: ResponseSolidarityDto,
      },
      {
        status: 404,
        description: 'Solidarity not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateSolidarityDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
