import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContractRegimeService } from './contract-regime.service';
import {
  CreateContractRegimeDto,
  UpdateContractRegimeDto,
  FilterContractRegimeDto,
  ResponseContractRegimeDto,
} from './../dtos/contractRegime.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('ContractRegime')
export class ContractRegimeController {
  constructor(private readonly service: ContractRegimeService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Contract Regime information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterContractRegimeDto),
    responses: [
      {
        status: 200,
        description: 'Contract Regime information.',
        type: ResponseContractRegimeDto,
      },
      {
        status: 404,
        description: 'Contract Regime not found',
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
    @Query() query: Partial<FilterContractRegimeDto>,
  ): Promise<PaginatedResult<ResponseContractRegimeDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Contract Regime information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Contract Regime information.',
        type: ResponseContractRegimeDto,
      },
      {
        status: 404,
        description: 'Contract Regime not found',
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
    summary: 'Save Contract Regime.',
    route: '',
    body: CreateContractRegimeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Contract Regime information saved.',
        type: ResponseContractRegimeDto,
      },
      {
        status: 404,
        description: 'Contract Regime not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Contract Regime error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateContractRegimeDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Contract Regime information.',
    route: ':id',
    bodyType: UpdateContractRegimeDto,
    responses: [
      {
        status: 200,
        description: 'Contract Regime information.',
        type: ResponseContractRegimeDto,
      },
      {
        status: 404,
        description: 'Contract Regime not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateContractRegimeDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
