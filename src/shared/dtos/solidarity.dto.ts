import { IsNumber, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SolidarityDto extends BaseDto {
  @ApiProperty()
  @IsNumber()
  salaryMin: number;

  @ApiProperty()
  @IsNumber()
  salaryMax: number;

  @ApiProperty()
  @IsNumber()
  percentage: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  perSolidarity: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  perSubsistence: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPensionary: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
export class CreateSolidarityDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNumber()
  salaryMin: number;

  @ApiProperty()
  @IsNumber()
  salaryMax: number;

  @ApiProperty()
  @IsNumber()
  percentage: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  perSolidarity: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  perSubsistence: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPensionary: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateSolidarityDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  salaryMin?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  salaryMax?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  percentage?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  perSolidarity?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  perSubsistence?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPensionary?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ResponseSolidarityDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  salaryMin?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  salaryMax?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  percentage?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  perSolidarity?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  perSubsistence?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPensionary?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FilterSolidarityDto extends PaginationDto {
  @IsOptional()
  salaryMin?: number;

  @IsOptional()
  salaryMax?: number;

  @IsOptional()
  percentage?: number;

  @IsOptional()
  perSolidarity?: number;

  @IsOptional()
  perSubsistence?: number;

  @IsOptional()
  @IsBoolean()
  isPensionary?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
