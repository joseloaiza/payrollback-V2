import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { WorkingHourService } from './working-hour.service';
import {
  CreateWorkingHourDto,
  UpdateWorkingHourDto,
  FilterWorkingHourDto,
  ResponseWorkingHourDto,
} from './../dtos/working-hour.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('workingHour')
export class WorkingHourController {
  constructor(private readonly service: WorkingHourService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: Partial<FilterWorkingHourDto>,
  ): Promise<PaginatedResult<ResponseWorkingHourDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateWorkingHourDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateWorkingHourDto) {
    return await this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.delete(id);
    if (!result.success) {
      return res.status(404).json({ deleted: false, message: result.message });
    }
    return res.status(200).json({ deleted: false, message: result.message });
  }
}
