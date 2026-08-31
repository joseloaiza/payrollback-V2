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
import { SocialSecurityEntityTypeService } from './social-security-entity-type.service';
import {
  CreateSocialSecurityEntityTypeDto,
  UpdateSocialSecurityEntityTypeDto,
  FilterSocialSecurityEntityTypeDto,
  ResponseSocialSecurityEntityTypeDto,
} from './../dtos/social-security-entity-type.dto';
import { PaginatedResult } from './../../utils/interfaces/paginated-result.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('socialSecurityEntityType')
export class SocialSecurityEntityTypeController {
  constructor(private readonly service: SocialSecurityEntityTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: Partial<FilterSocialSecurityEntityTypeDto>,
  ): Promise<PaginatedResult<ResponseSocialSecurityEntityTypeDto>> {
    return await this.service.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateSocialSecurityEntityTypeDto) {
    return await this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSocialSecurityEntityTypeDto,
  ) {
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
