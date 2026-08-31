import { Controller, Body, Param, Query } from '@nestjs/common';
import { SubsidiaryService } from './subsidiary.service';
import {
  CreateSubsidiaryDto,
  UpdateSubsidiaryDto,
  FilterSubsidiaryDto,
  ResponseSubsidiaryDto,
} from './../dtos/subsidiary.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@Controller('subsidiary')
export class SubsidiaryController {
  constructor(private readonly service: SubsidiaryService) {}

  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Subsidiaries information.',
    route: '',
    queryParams: generateApiQueryFromDto(FilterSubsidiaryDto),
    responses: [
      {
        status: 200,
        description: 'Subsidiary information.',
        type: ResponseSubsidiaryDto,
      },
      {
        status: 404,
        description: 'Subsidiary not found',
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
    @Query() query: Partial<FilterSubsidiaryDto>,
  ): Promise<PaginatedResult<ResponseSubsidiaryDto>> {
    return await this.service.findAll(query);
  }
  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Subsidiary information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Subsidiary information.',
        type: ResponseSubsidiaryDto,
      },
      {
        status: 404,
        description: 'Subsidiary not found',
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
    summary: 'Save Subsidiary.',
    route: '',
    body: CreateSubsidiaryDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Subsidiary information saved.',
        type: ResponseSubsidiaryDto,
      },
      {
        status: 404,
        description: 'Subsidiary not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateSubsidiaryDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.COMPANIES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update Subsidiary information.',
    route: ':id',
    bodyType: UpdateSubsidiaryDto,
    responses: [
      {
        status: 200,
        description: 'Subsidiary information.',
        type: ResponseSubsidiaryDto,
      },
      {
        status: 404,
        description: 'Subsidiary not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateSubsidiaryDto) {
    return await this.service.update(id, dto);
  }

  @RequirePermissions(Permission.COMPANIES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete Subsidiary information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Subsidiary deleted.',
        type: String,
      },
      {
        status: 404,
        description: 'Subsidiary not found',
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
