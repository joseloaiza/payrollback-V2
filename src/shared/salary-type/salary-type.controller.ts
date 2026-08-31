import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SalaryTypeService } from './salary-type.service';
import {
  CreateSalaryTypeDto,
  UpdateSalaryTypeDto,
  FilterSalaryTypeDto,
  ResponseSalaryTypeDto,
} from './../dtos/salary-type.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('SalaryType')
export class SalaryTypeController {
  constructor(private readonly service: SalaryTypeService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all SalaryType information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterSalaryTypeDto),
    responses: [
      {
        status: 200,
        description: 'SalaryType information.',
        type: ResponseSalaryTypeDto,
      },
      {
        status: 404,
        description: 'SalaryType not found',
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
    @Query() query: Partial<FilterSalaryTypeDto>,
  ): Promise<PaginatedResult<ResponseSalaryTypeDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves SalaryType information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'SalaryType information.',
        type: ResponseSalaryTypeDto,
      },
      {
        status: 404,
        description: 'SalaryType not found',
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
    summary: 'Save SalaryType.',
    route: '',
    body: CreateSalaryTypeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'SalaryType information saved.',
        type: ResponseSalaryTypeDto,
      },
      {
        status: 404,
        description: 'SalaryType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'SalaryType error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateSalaryTypeDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'SalaryType information.',
    route: ':id',
    bodyType: UpdateSalaryTypeDto,
    responses: [
      {
        status: 200,
        description: 'SalaryType information.',
        type: ResponseSalaryTypeDto,
      },
      {
        status: 404,
        description: 'SalaryType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateSalaryTypeDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
