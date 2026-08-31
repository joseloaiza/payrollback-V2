import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PeriodStatusDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
export class CreatePeriodStatusDto extends OmitType(PeriodStatusDto, [
  'id',
  'createdAt',
  'createUser',
  'updatedAt',
  'updateUser',
] as const) {}

export class UpdatePeriodStatusDto extends PartialType(CreatePeriodStatusDto) {}

export class ResponsePeriodStatusDto extends PickType(PeriodStatusDto, [
  'id',
  'code',
  'description',
  'isActive',
] as const) {}

export class FilterPeriodStatusDto extends PaginationDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
