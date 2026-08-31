import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssistanceTypeService } from './assistance-type.service';
import {
  CreateAssistanceTypeDto,
  UpdateAssistanceTypeDto,
  FilterAssistanceTypeDto,
  ResponseAssistanceTypeDto,
} from './../dtos/assistance-type.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('AssistanceType')
export class AssistanceTypeController {
  constructor(private readonly service: AssistanceTypeService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all Assistance Type information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterAssistanceTypeDto),
    responses: [
      {
        status: 200,
        description: 'Assistance Type information.',
        type: ResponseAssistanceTypeDto,
      },
      {
        status: 404,
        description: 'Assistance Type not found',
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
    @Query() query: Partial<FilterAssistanceTypeDto>,
  ): Promise<PaginatedResult<ResponseAssistanceTypeDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves Assistance Type information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'Assistance Type information.',
        type: ResponseAssistanceTypeDto,
      },
      {
        status: 404,
        description: 'Assistance Type not found',
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
    summary: 'Save Assistance Type.',
    route: '',
    body: CreateAssistanceTypeDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Assistance Type information saved.',
        type: ResponseAssistanceTypeDto,
      },
      {
        status: 404,
        description: 'Assistance Type not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Assistance Type error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(@Body() dto: CreateAssistanceTypeDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'PATCH',
    summary: 'Assistance Type information.',
    route: ':id',
    bodyType: UpdateAssistanceTypeDto,
    responses: [
      {
        status: 200,
        description: 'Assistance Type information.',
        type: ResponseAssistanceTypeDto,
      },
      {
        status: 404,
        description: 'Assistance Type not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateAssistanceTypeDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
