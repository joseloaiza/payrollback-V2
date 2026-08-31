import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SpendingAccountService } from './spending-account.service';
import {
  CreateSpendingAccountDto,
  UpdateSpendingAccountDto,
  FilterSpendingAccountDto,
  ResponseSpendingAccountDto,
} from './../dtos/spending-account.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('SpendingAccount')
export class SpendingAccountController {
  constructor(private readonly service: SpendingAccountService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all SpendingAccount information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterSpendingAccountDto),
    responses: [
      {
        status: 200,
        description: 'SpendingAccount information.',
        type: ResponseSpendingAccountDto,
      },
      {
        status: 404,
        description: 'SpendingAccount not found',
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
    @Query() query: Partial<FilterSpendingAccountDto>,
  ): Promise<PaginatedResult<ResponseSpendingAccountDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves SpendingAccount information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'SpendingAccount information.',
        type: ResponseSpendingAccountDto,
      },
      {
        status: 404,
        description: 'SpendingAccount not found',
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
    summary: 'Save SpendingAccount.',
    route: '',
    body: CreateSpendingAccountDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'SpendingAccount information saved.',
        type: ResponseSpendingAccountDto,
      },
      {
        status: 404,
        description: 'SpendingAccount not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'SpendingAccount error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateSpendingAccountDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'SpendingAccount information.',
    route: ':id',
    bodyType: UpdateSpendingAccountDto,
    responses: [
      {
        status: 200,
        description: 'SpendingAccount information.',
        type: ResponseSpendingAccountDto,
      },
      {
        status: 404,
        description: 'SpendingAccount not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateSpendingAccountDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
