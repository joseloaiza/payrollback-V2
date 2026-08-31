import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReasonsContractTerminationService } from './reasons-contract-termination.service';
import {
  CreateReasonContractTerminationDto,
  UpdateReasonContractTerminationDto,
  FilterReasonContractTerminationDto,
  ResponseReasonContractTerminationDto,
} from './../dtos/resonContractTermination.dto';
import { PaginatedResult } from '../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('ResonsContractTermination')
export class ResonsContractTerminationController {
  constructor(private readonly service: ReasonsContractTerminationService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all reasons information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterReasonContractTerminationDto),
    responses: [
      {
        status: 200,
        description: 'Reasons information.',
        type: ResponseReasonContractTerminationDto,
      },
      {
        status: 404,
        description: 'Reasons not found',
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
    @Query() query: Partial<FilterReasonContractTerminationDto>,
  ): Promise<PaginatedResult<ResponseReasonContractTerminationDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves reason information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Reason information.',
        type: ResponseReasonContractTerminationDto,
      },
      {
        status: 404,
        description: 'Reason not found',
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
    summary: 'Save reason.',
    route: '',
    body: CreateReasonContractTerminationDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Reason information saved.',
        type: ResponseReasonContractTerminationDto,
      },
      {
        status: 404,
        description: 'Reason not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Reason error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateReasonContractTerminationDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Update reason information.',
    route: ':id',
    bodyType: UpdateReasonContractTerminationDto,
    responses: [
      {
        status: 200,
        description: 'Reason information updated.',
        type: ResponseReasonContractTerminationDto,
      },
      {
        status: 404,
        description: 'Reason not found',
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
    @Body() dto: UpdateReasonContractTerminationDto,
  ) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
