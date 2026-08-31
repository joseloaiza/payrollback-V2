import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ContractTypeService } from './contract-type.service';
import {
  CreateContractTypeDto,
  UpdateContractTypeDto,
  FilterContractTypeDto,
  ResponseContractTypeDto,
} from './../dtos/contractType.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission.enum';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@UseGuards(PermissionsGuard)
@Controller('contracType')
export class ContractTypeController {
  constructor(private readonly service: ContractTypeService) {}
  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Contracts Type information.',
    route: '',
    queryParams: generateApiQueryFromDto(FilterContractTypeDto),
    responses: [
      {
        status: 200,
        description: 'Contract Type information.',
        type: ResponseContractTypeDto,
      },
      {
        status: 404,
        description: 'Contract Type not found',
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
    @Query() query: Partial<FilterContractTypeDto>,
  ): Promise<PaginatedResult<ResponseContractTypeDto>> {
    return await this.service.findAll(query);
  }
  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Contract Type information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Contract Type information.',
        type: ResponseContractTypeDto,
      },
      {
        status: 404,
        description: 'Contract Type not found',
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
    summary: 'Save Contract Type.',
    route: '',
    body: CreateContractTypeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Contract Type information saved.',
        type: ResponseContractTypeDto,
      },
      {
        status: 404,
        description: 'Contract Type not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateContractTypeDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.COMPANIES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update Contract Type information.',
    route: ':id',
    bodyType: UpdateContractTypeDto,
    responses: [
      {
        status: 200,
        description: 'Contract Type information.',
        type: ResponseContractTypeDto,
      },
      {
        status: 404,
        description: 'Contract Type not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateContractTypeDto) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.COMPANIES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete Contract Type information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Contract Type deleted.',
        type: String,
      },
      {
        status: 404,
        description: 'Contract Type not found',
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
