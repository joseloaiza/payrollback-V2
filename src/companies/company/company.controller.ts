import { Controller, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  FilterCompanyDto,
  ResponseCompanyDto,
} from '../dtos/company.dto';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
//import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission.enum';

@UseGuards(PermissionsGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all company information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterCompanyDto),
    responses: [
      {
        status: 200,
        description: 'company information.',
        type: ResponseCompanyDto,
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
    @Query() query: Partial<FilterCompanyDto>,
  ): Promise<PaginatedResult<ResponseCompanyDto>> {
    const { page = 1, limit = 10 } = query;
    return await this.companyService.findAll(query, page, limit);
  }

  @RequirePermissions(Permission.COMPANIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieve company information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'company information.',
        type: ResponseCompanyDto,
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
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }
  @RequirePermissions(Permission.COMPANIES_CREATE)
  @Endpoint({
    method: 'POST',
    summary: 'Save company.',
    route: '',
    body: CreateCompanyDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'company information saved.',
        type: ResponseCompanyDto,
      },
      {
        status: 404,
        description: 'company not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @RequirePermissions(Permission.COMPANIES_UPDATE)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update company payment.',
    route: ':id',
    bodyType: UpdateCompanyDto,
    responses: [
      {
        status: 200,
        description: 'company paytmet information updated.',
        type: ResponseCompanyDto,
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
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @RequirePermissions(Permission.COMPANIES_DELETE)
  @Endpoint({
    method: 'DELETE',
    summary: 'Delete company.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'company information deleted.',
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
  remove(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}
