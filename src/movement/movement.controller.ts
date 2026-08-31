import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { MovementService } from './movement.service';
import {
  CreateMovementDto,
  UpdateMovementDto,
  FilterMovementDto,
  ResponseMovementDto,
} from './dto/movement.dto';
import { PaginatedResult } from './../utils/interfaces/paginated-result.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('movement')
export class MovementController {
  constructor(private readonly service: MovementService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: Partial<FilterMovementDto>,
  ): Promise<PaginatedResult<ResponseMovementDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateMovementDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMovementDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
