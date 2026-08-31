import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BankService } from './bank.service';
import {
  CreateBankDto,
  UpdateBankDto,
  FilterBankDto,
  ResponseBankDto,
} from './../dtos/bank.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('Bank')
export class BankController {
  constructor(private readonly service: BankService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Bank information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterBankDto),
    responses: [
      {
        status: 200,
        description: 'Bank information.',
        type: ResponseBankDto,
      },
      {
        status: 404,
        description: 'Bank not found',
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
    @Query() query: Partial<FilterBankDto>,
  ): Promise<PaginatedResult<ResponseBankDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Bank information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Bank information.',
        type: ResponseBankDto,
      },
      {
        status: 404,
        description: 'Bank not found',
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
    summary: 'Save Bank.',
    route: '',
    body: CreateBankDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Bank information saved.',
        type: ResponseBankDto,
      },
      {
        status: 404,
        description: 'Bank not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Bank error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateBankDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Bank information.',
    route: ':id',
    bodyType: UpdateBankDto,
    responses: [
      {
        status: 200,
        description: 'Bank information.',
        type: ResponseBankDto,
      },
      {
        status: 404,
        description: 'Bank not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateBankDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
