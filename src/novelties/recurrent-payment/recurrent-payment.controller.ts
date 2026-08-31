import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { RecurrentPaymentService } from './recurrent-payment.service';
import {
  CreateRecurrentPaymentDto,
  UpdateRecurrentPaymentDto,
  FilterRecurrentPaymentDto,
  ResponseRecurrentPaymentDto,
} from './../../novelties/dtos/recurrent-payment.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('RecurrentPayment')
export class RecurrentPaymentController {
  constructor(private readonly service: RecurrentPaymentService) {}
  @RequirePermissions(Permission.NOVELTIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Recurrent Payment information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterRecurrentPaymentDto),
    responses: [
      {
        status: 200,
        description: 'Recurrent Payment information.',
        type: ResponseRecurrentPaymentDto,
      },
      {
        status: 404,
        description: 'Recurrent Payment not found',
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
    @Query() query: Partial<FilterRecurrentPaymentDto>,
  ): Promise<PaginatedResult<ResponseRecurrentPaymentDto>> {
    return await this.service.findAll(query);
  }

  @RequirePermissions(Permission.NOVELTIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Recurrent Payment information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Recurrent Payment information.',
        type: ResponseRecurrentPaymentDto,
      },
      {
        status: 404,
        description: 'Recurrent Payment not found',
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
    summary: 'Save Recurrent Payment.',
    route: '',
    body: CreateRecurrentPaymentDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Recurrent Payment information saved.',
        type: ResponseRecurrentPaymentDto,
      },
      {
        status: 404,
        description: 'Recurrent Payment not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Recurrent Payment error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateRecurrentPaymentDto) {
    return await this.service.create(dto);
  }
  @RequirePermissions(Permission.NOVELTIES_UPDATE)
  @Endpoint({
    method: 'PUT',
    summary: 'Recurrent Payment information.',
    route: ':id',
    bodyType: UpdateRecurrentPaymentDto,
    responses: [
      {
        status: 200,
        description: 'Recurrent Payment information.',
        type: ResponseRecurrentPaymentDto,
      },
      {
        status: 404,
        description: 'Recurrent Payment not found',
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
    @Body() dto: UpdateRecurrentPaymentDto,
  ) {
    return await this.service.update(id, dto);
  }

  @RequirePermissions(Permission.NOVELTIES_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
