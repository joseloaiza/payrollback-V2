import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import {
  CreateCityDto,
  UpdateCityDto,
  FilterCityDto,
  ResponseCityDto,
} from './../dtos/city.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('City')
export class CityController {
  constructor(private readonly service: CityService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all City information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterCityDto),
    responses: [
      {
        status: 200,
        description: 'City information.',
        type: ResponseCityDto,
      },
      {
        status: 404,
        description: 'City not found',
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
    @Query() query: Partial<FilterCityDto>,
  ): Promise<PaginatedResult<ResponseCityDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves City information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'City information.',
        type: ResponseCityDto,
      },
      {
        status: 404,
        description: 'City not found',
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
    summary: 'Save City.',
    route: '',
    body: CreateCityDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'City information saved.',
        type: ResponseCityDto,
      },
      {
        status: 404,
        description: 'City not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'City error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateCityDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'City information.',
    route: ':id',
    bodyType: UpdateCityDto,
    responses: [
      {
        status: 200,
        description: 'City information.',
        type: ResponseCityDto,
      },
      {
        status: 404,
        description: 'City not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateCityDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
