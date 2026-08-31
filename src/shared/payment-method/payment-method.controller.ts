import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
  FilterPaymentMethodDto,
  ResponsePaymentMethodDto,
} from './../dtos/paymentMethod.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('PaymentMethod')
export class PaymentMethodController {
  constructor(private readonly service: PaymentMethodService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all PaymentMethod information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterPaymentMethodDto),
    responses: [
      {
        status: 200,
        description: 'PaymentMethod information.',
        type: ResponsePaymentMethodDto,
      },
      {
        status: 404,
        description: 'PaymentMethod not found',
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
    @Query() query: Partial<FilterPaymentMethodDto>,
  ): Promise<PaginatedResult<ResponsePaymentMethodDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves PaymentMethod information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'PaymentMethod information.',
        type: ResponsePaymentMethodDto,
      },
      {
        status: 404,
        description: 'PaymentMethod not found',
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
    summary: 'Save PaymentMethod.',
    route: '',
    body: CreatePaymentMethodDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'PaymentMethod information saved.',
        type: ResponsePaymentMethodDto,
      },
      {
        status: 404,
        description: 'PaymentMethod not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'PaymentMethod error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreatePaymentMethodDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'PaymentMethod information.',
    route: ':id',
    bodyType: UpdatePaymentMethodDto,
    responses: [
      {
        status: 200,
        description: 'PaymentMethod information.',
        type: ResponsePaymentMethodDto,
      },
      {
        status: 404,
        description: 'PaymentMethod not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdatePaymentMethodDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
