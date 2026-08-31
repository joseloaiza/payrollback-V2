import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AreaService } from './area.service';
import {
  CreateAreaDto,
  UpdateAreaDto,
  FilterAreaDto,
  ResponseAreaDto,
} from './../dtos/area.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('area')
export class AreaController {
  constructor(private readonly service: AreaService) {}

  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all areas information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterAreaDto),
    responses: [
      {
        status: 200,
        description: 'Area information.',
        type: ResponseAreaDto,
      },
      {
        status: 404,
        description: 'Area not found',
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
    @Query() query: Partial<FilterAreaDto>,
  ): Promise<PaginatedResult<ResponseAreaDto>> {
    return await this.service.findAll(query);
  }
  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Area information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Area information.',
        type: ResponseAreaDto,
      },
      {
        status: 404,
        description: 'Area not found',
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
  @RequirePermissions(Permission.COMPANIES_CREATE)
  @Endpoint({
    method: 'POST',
    summary: 'Save Area.',
    route: '',
    body: CreateAreaDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Area information saved.',
        type: ResponseAreaDto,
      },
      {
        status: 404,
        description: 'Area not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateAreaDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.COMPANIES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update Area information.',
    route: ':id',
    bodyType: UpdateAreaDto,
    responses: [
      {
        status: 200,
        description: 'Area information.',
        type: ResponseAreaDto,
      },
      {
        status: 404,
        description: 'Area not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateAreaDto) {
    return await this.service.update(id, dto);
  }

  @RequirePermissions(Permission.COMPANIES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete Area information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Area deleted.',
        type: String,
      },
      {
        status: 404,
        description: 'Area not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
