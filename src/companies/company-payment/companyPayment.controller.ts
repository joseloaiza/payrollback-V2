import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CompanyPaymentService } from './companyPayment.service';
import {
  CreateCompanyPaymentDto,
  UpdateCompanyPaymentDto,
  FilterCompanyPaymentDto,
  ResponseCompanyPaymentDto,
} from '../dtos/companyPayment.dto';
import { PaginatedResult } from '../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission.enum';

@UseGuards(PermissionsGuard)
@Controller('companyPayment')
export class CompanyPaymentController {
  constructor(private readonly service: CompanyPaymentService) {}

  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all company payment information.',
    route: '',
    queryParams: generateApiQueryFromDto(FilterCompanyPaymentDto),
    responses: [
      {
        status: 200,
        description: 'company payment information.',
        type: ResponseCompanyPaymentDto,
      },
      {
        status: 404,
        description: '',
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
    @Query() query: Partial<FilterCompanyPaymentDto>,
  ): Promise<PaginatedResult<ResponseCompanyPaymentDto>> {
    return await this.service.findAll(query);
  }

  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieve company payment information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'company payment information.',
        type: ResponseCompanyPaymentDto,
      },
      {
        status: 404,
        description: '',
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
    summary: 'Save company payment.',
    route: '',
    body: CreateCompanyPaymentDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'company payment information saved.',
        type: ResponseCompanyPaymentDto,
      },
      {
        status: 404,
        description: 'company payment not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateCompanyPaymentDto) {
    return await this.service.create(dto);
  }

  @RequirePermissions(Permission.COMPANIES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update company payment.',
    route: ':id',
    bodyType: UpdateCompanyPaymentDto,
    responses: [
      {
        status: 200,
        description: 'company paytmet information updated.',
        type: ResponseCompanyPaymentDto,
      },
      {
        status: 404,
        description: '',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateCompanyPaymentDto) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.COMPANIES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete company payment.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'company payment information deleted.',
        type: String,
      },
      {
        status: 404,
        description: '',
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
