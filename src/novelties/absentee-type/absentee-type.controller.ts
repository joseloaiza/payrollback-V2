import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AbsenteeTypeService } from './absentee-type.service';
import {
  CreateAbsenteeTypeDto,
  UpdateAbsenteeTypeDto,
  FilterAbsenteeTypeDto,
  ResponseAbsenteeTypeDto,
} from './../dtos/absentee-type.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';

import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('absenteeType')
export class AbsenteeTypeController {
  constructor(private readonly service: AbsenteeTypeService) {}
  @RequirePermissions(Permission.NOVELTIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all absenteeType information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterAbsenteeTypeDto),
    responses: [
      {
        status: 200,
        description: 'absenteeType information.',
        type: ResponseAbsenteeTypeDto,
      },
      {
        status: 404,
        description: 'absenteeType not found',
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
    @Query() query: Partial<FilterAbsenteeTypeDto>,
  ): Promise<PaginatedResult<ResponseAbsenteeTypeDto>> {
    return await this.service.findAll(query);
  }

  @RequirePermissions(Permission.NOVELTIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves absenteeType information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'absenteeType information.',
        type: ResponseAbsenteeTypeDto,
      },
      {
        status: 404,
        description: 'absenteeType not found',
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
  @RequirePermissions(Permission.NOVELTIES_CREATE)
  @Endpoint({
    method: 'POST',
    summary: 'Save absenteeType.',
    route: '',
    body: CreateAbsenteeTypeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'absenteeType information saved.',
        type: ResponseAbsenteeTypeDto,
      },
      {
        status: 404,
        description: 'absenteeType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'absenteeType error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateAbsenteeTypeDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.NOVELTIES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'absenteeType information.',
    route: ':id',
    bodyType: UpdateAbsenteeTypeDto,
    responses: [
      {
        status: 200,
        description: 'absenteeType information.',
        type: ResponseAbsenteeTypeDto,
      },
      {
        status: 404,
        description: 'absenteeType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateAbsenteeTypeDto) {
    return await this.service.update(id, dto);
  }

  @RequirePermissions(Permission.NOVELTIES_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
