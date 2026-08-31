import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { SocialSecurityEntityService } from './social-security-entity.service';
import {
  CreateSocialSecurityEntityDto,
  UpdateSocialSecurityEntityDto,
  FilterSocialSecurityEntityDto,
  ResponseSocialSecurityEntityDto,
} from './../dtos/social-security-entity.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('social_security_entity')
export class SocialSecurityEntityController {
  constructor(private readonly service: SocialSecurityEntityService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Social security entity information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterSocialSecurityEntityDto),
    responses: [
      {
        status: 200,
        description: 'Social security entity information.',
        type: ResponseSocialSecurityEntityDto,
      },
      {
        status: 404,
        description: 'Social security entity not found',
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
    @Query() query: Partial<FilterSocialSecurityEntityDto>,
  ): Promise<PaginatedResult<ResponseSocialSecurityEntityDto>> {
    if (typeof query.relationFilters === 'string') {
      try {
        query.relationFilters = JSON.parse(query.relationFilters);
      } catch (e) {
        throw new BadRequestException(
          'Invalid JSON format for relationFilters',
        );
      }
    }
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Social security entity information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Social security entity information.',
        type: ResponseSocialSecurityEntityDto,
      },
      {
        status: 404,
        description: 'Social security entity not found',
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
    summary: 'Save Social security entity.',
    route: '',
    body: CreateSocialSecurityEntityDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Social security entity information saved.',
        type: ResponseSocialSecurityEntityDto,
      },
      {
        status: 404,
        description: 'Social security entity not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Social security entity error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateSocialSecurityEntityDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PUT',
    summary: 'Social security entity information.',
    route: ':id',
    bodyType: UpdateSocialSecurityEntityDto,
    responses: [
      {
        status: 200,
        description: 'Social security entity information.',
        type: ResponseSocialSecurityEntityDto,
      },
      {
        status: 404,
        description: 'Social security entity not found',
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
    @Body() dto: UpdateSocialSecurityEntityDto,
  ) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
