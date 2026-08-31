import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CountryService } from './country.service';
import {
  CreateCountryDto,
  UpdateCountryDto,
  FilterCountryDto,
  ResponseCountryDto,
} from './../dtos/country.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('Country')
export class CountryController {
  constructor(private readonly service: CountryService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Country information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterCountryDto),
    responses: [
      {
        status: 200,
        description: 'Country information.',
        type: ResponseCountryDto,
      },
      {
        status: 404,
        description: 'Country not found',
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
    @Query() query: Partial<FilterCountryDto>,
  ): Promise<PaginatedResult<ResponseCountryDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Country information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Country information.',
        type: ResponseCountryDto,
      },
      {
        status: 404,
        description: 'Country not found',
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
    summary: 'Save Country.',
    route: '',
    body: CreateCountryDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Country information saved.',
        type: ResponseCountryDto,
      },
      {
        status: 404,
        description: 'Country not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Country error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateCountryDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Country information.',
    route: ':id',
    bodyType: UpdateCountryDto,
    responses: [
      {
        status: 200,
        description: 'Country information.',
        type: ResponseCountryDto,
      },
      {
        status: 404,
        description: 'Country not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
