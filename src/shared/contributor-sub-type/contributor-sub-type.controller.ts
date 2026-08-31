import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContributorSubTypeService } from './contributor-sub-type.service';
import {
  CreateContributorSubTypeDto,
  UpdateContributorSubTypeDto,
  FilterContributorSubTypeDto,
  ResponseContributorSubTypeDto,
} from './../dtos/contributorSubType.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('ContributorSubType')
export class ContributorSubTypeController {
  constructor(private readonly service: ContributorSubTypeService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Contributor Sub Type information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterContributorSubTypeDto),
    responses: [
      {
        status: 200,
        description: 'Contributor Sub Type information.',
        type: ResponseContributorSubTypeDto,
      },
      {
        status: 404,
        description: 'Contributor Sub Type not found',
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
    @Query() query: Partial<FilterContributorSubTypeDto>,
  ): Promise<PaginatedResult<ResponseContributorSubTypeDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Contributor Sub Type information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Contributor Sub Type information.',
        type: ResponseContributorSubTypeDto,
      },
      {
        status: 404,
        description: 'Contributor Sub Type not found',
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
    summary: 'Save Contributor Sub Type.',
    route: '',
    body: CreateContributorSubTypeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Contributor Sub Type information saved.',
        type: ResponseContributorSubTypeDto,
      },
      {
        status: 404,
        description: 'Contributor Sub Type not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Contributor Sub Type error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateContributorSubTypeDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Contributor Sub Type information.',
    route: ':id',
    bodyType: UpdateContributorSubTypeDto,
    responses: [
      {
        status: 200,
        description: 'Contributor Sub Type information.',
        type: ResponseContributorSubTypeDto,
      },
      {
        status: 404,
        description: 'Contributor Sub Type not found',
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
    @Body() dto: UpdateContributorSubTypeDto,
  ) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
