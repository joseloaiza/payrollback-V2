import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentFrequencyService } from './payment-frequency.service';
import {
  CreatePaymentFrequencyDto,
  UpdatePaymentFrequencyDto,
  FilterPaymentFrequencyDto,
  ResponsePaymentFrequencyDto,
} from './../dtos/paymentFrequency.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('PaymentFrequency')
export class PaymentFrequencyController {
  constructor(private readonly service: PaymentFrequencyService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all PaymentFrequency information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterPaymentFrequencyDto),
    responses: [
      {
        status: 200,
        description: 'PaymentFrequency information.',
        type: ResponsePaymentFrequencyDto,
      },
      {
        status: 404,
        description: 'PaymentFrequency not found',
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
    @Query() query: Partial<FilterPaymentFrequencyDto>,
  ): Promise<PaginatedResult<ResponsePaymentFrequencyDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves PaymentFrequency information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'PaymentFrequency information.',
        type: ResponsePaymentFrequencyDto,
      },
      {
        status: 404,
        description: 'PaymentFrequency not found',
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
    summary: 'Save PaymentFrequency.',
    route: '',
    body: CreatePaymentFrequencyDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'PaymentFrequency information saved.',
        type: ResponsePaymentFrequencyDto,
      },
      {
        status: 404,
        description: 'PaymentFrequency not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'PaymentFrequency error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreatePaymentFrequencyDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'PaymentFrequency information.',
    route: ':id',
    bodyType: UpdatePaymentFrequencyDto,
    responses: [
      {
        status: 200,
        description: 'PaymentFrequency information.',
        type: ResponsePaymentFrequencyDto,
      },
      {
        status: 404,
        description: 'PaymentFrequency not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentFrequencyDto,
  ) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
