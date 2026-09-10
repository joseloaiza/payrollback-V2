import {
  IsString,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';

import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreatePeriodDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsUUID()
  company_id: string;
}

export class UpdatePeriodDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  year: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  number: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  initialDate: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  endDate: Date;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  company_id: string;

  @ApiProperty()
  @IsUUID()
  periodStatus_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  month: number;
}

export class ResponsePeriodDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsString()
  number: number;

  @ApiProperty()
  @IsDate()
  initialDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsUUID()
  company_id: string;

  @ApiProperty()
  @IsUUID()
  periodStatus_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  periodStatus_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  month: number;
}

export class FilterPeriodDto extends PaginationDto {
  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsDate()
  initialDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsUUID()
  company_id?: string;

  @IsOptional()
  @IsUUID()
  periodStatus_id?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  month?: string;
}
