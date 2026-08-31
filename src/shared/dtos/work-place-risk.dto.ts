import {
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class WorkPlaceRisksDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  percentage: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
export class CreateWorkPlaceRisksDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  percentage: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateWorkPlaceRisksDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  percentage?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class ResponseWorkPlaceRisksDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  percentage?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class FilterWorkPlaceRisksDto extends PaginationDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  percentage?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
