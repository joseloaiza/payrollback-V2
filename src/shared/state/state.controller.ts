import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StateService } from './state.service';
import {
  CreateStateDto,
  UpdateStateDto,
  FilterStateDto,
  ResponseStateDto,
} from './../dtos/state.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('State')
export class StateController {
  constructor(private readonly service: StateService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all State information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterStateDto),
    responses: [
      {
        status: 200,
        description: 'State information.',
        type: ResponseStateDto,
      },
      {
        status: 404,
        description: 'State not found',
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
    @Query() query: Partial<FilterStateDto>,
  ): Promise<PaginatedResult<ResponseStateDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves State information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'State information.',
        type: ResponseStateDto,
      },
      {
        status: 404,
        description: 'State not found',
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
    summary: 'Save State.',
    route: '',
    body: CreateStateDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'State information saved.',
        type: ResponseStateDto,
      },
      {
        status: 404,
        description: 'State not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'State error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateStateDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'State information.',
    route: ':id',
    bodyType: UpdateStateDto,
    responses: [
      {
        status: 200,
        description: 'State information.',
        type: ResponseStateDto,
      },
      {
        status: 404,
        description: 'State not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateStateDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
