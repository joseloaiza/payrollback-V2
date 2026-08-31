import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { DiagnosisService } from './diagnosis.service';
import {
  CreateDiagnosisDto,
  UpdateDiagnosisDto,
  FilterDiagnosisDto,
  ResponseDiagnosisDto,
} from './../dtos/diagnosis.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly service: DiagnosisService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Diagnosis information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterDiagnosisDto),
    responses: [
      {
        status: 200,
        description: 'Diagnosis information.',
        type: ResponseDiagnosisDto,
      },
      {
        status: 404,
        description: 'Diagnosis not found',
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
    @Query() query: Partial<FilterDiagnosisDto>,
  ): Promise<PaginatedResult<ResponseDiagnosisDto>> {
    return await this.service.findAll(query);
  }

  @RequirePermissions(Permission.NOVELTIES_READ)
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Diagnosis information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Diagnosis information.',
        type: ResponseDiagnosisDto,
      },
      {
        status: 404,
        description: 'Diagnosis not found',
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
    summary: 'Save Diagnosis.',
    route: '',
    body: CreateDiagnosisDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Diagnosis information saved.',
        type: ResponseDiagnosisDto,
      },
      {
        status: 404,
        description: 'Diagnosis not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Diagnosis error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateDiagnosisDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.NOVELTIES_UPDATE)
  @Endpoint({
    method: 'PUT',
    summary: 'Diagnosis information.',
    route: ':id',
    bodyType: UpdateDiagnosisDto,
    responses: [
      {
        status: 200,
        description: 'Diagnosis information.',
        type: ResponseDiagnosisDto,
      },
      {
        status: 404,
        description: 'Diagnosis not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateDiagnosisDto) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.NOVELTIES_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
