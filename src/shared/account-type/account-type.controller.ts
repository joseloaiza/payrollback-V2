import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccountTypeService } from './account-type.service';
import {
  CreateAccountTypeDto,
  UpdateAccountTypeDto,
  FilterAccountTypeDto,
  ResponseAccountTypeDto,
} from './../dtos/account-type.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('AccountType')
export class AccountTypeController {
  constructor(private readonly service: AccountTypeService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all AccountType information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterAccountTypeDto),
    responses: [
      {
        status: 200,
        description: 'AccountType information.',
        type: ResponseAccountTypeDto,
      },
      {
        status: 404,
        description: 'AccountType not found',
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
    @Query() query: Partial<FilterAccountTypeDto>,
  ): Promise<PaginatedResult<ResponseAccountTypeDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves AccountType information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'AccountType information.',
        type: ResponseAccountTypeDto,
      },
      {
        status: 404,
        description: 'AccountType not found',
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
    summary: 'Save AccountType.',
    route: '',
    body: CreateAccountTypeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'AccountType information saved.',
        type: ResponseAccountTypeDto,
      },
      {
        status: 404,
        description: 'AccountType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'AccountType error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateAccountTypeDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'AccountType information.',
    route: ':id',
    bodyType: UpdateAccountTypeDto,
    responses: [
      {
        status: 200,
        description: 'AccountType information.',
        type: ResponseAccountTypeDto,
      },
      {
        status: 404,
        description: 'AccountType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateAccountTypeDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
