import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContributorTypeService } from './contributor-type.service';
import {
  CreateContributorTypeDto,
  UpdateContributorTypeDto,
  FilterContributorTypeDto,
  ResponseContributorTypeDto,
} from './../dtos/contributorType.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('ContributorType')
export class ContributorTypeController {
  constructor(private readonly service: ContributorTypeService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Contributor Type information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterContributorTypeDto),
    responses: [
      {
        status: 200,
        description: 'Contributor Type information.',
        type: ResponseContributorTypeDto,
      },
      {
        status: 404,
        description: 'Contributor Type not found',
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
    @Query() query: Partial<FilterContributorTypeDto>,
  ): Promise<PaginatedResult<ResponseContributorTypeDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Contributor Type information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Contributor Type information.',
        type: ResponseContributorTypeDto,
      },
      {
        status: 404,
        description: 'Contributor Type not found',
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
    summary: 'Save Contributor Type.',
    route: '',
    body: CreateContributorTypeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Contributor Type information saved.',
        type: ResponseContributorTypeDto,
      },
      {
        status: 404,
        description: 'Contributor Type not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Contributor Type error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateContributorTypeDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Contributor Type information.',
    route: ':id',
    bodyType: UpdateContributorTypeDto,
    responses: [
      {
        status: 200,
        description: 'Contributor Type information.',
        type: ResponseContributorTypeDto,
      },
      {
        status: 404,
        description: 'Contributor Type not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateContributorTypeDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
