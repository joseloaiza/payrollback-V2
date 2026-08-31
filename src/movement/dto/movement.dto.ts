import { IsString, IsUUID, IsOptional } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MovementDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  employee_id: string;

  @ApiProperty()
  @IsUUID()
  period_id: string;

  @ApiProperty()
  @IsUUID()
  concept_id: string;

  @ApiProperty()
  @IsOptional()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  value: number;

  @ApiProperty()
  @IsOptional()
  year: number;

  @ApiProperty()
  @IsOptional()
  month: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  company_id: string;
}
export class CreateMovementDto extends OmitType(MovementDto, [
  'id',
  'createdAt',
  'createUser',
  'updatedAt',
  'updateUser',
] as const) {}

export class UpdateMovementDto extends PartialType(CreateMovementDto) {}

export class ResponseMovementDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  period_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  concept_id?: string;

  @ApiProperty()
  @IsOptional()
  quantity?: number;

  @ApiProperty()
  @IsOptional()
  value?: number;

  @ApiProperty()
  @IsOptional()
  year?: number;

  @ApiProperty()
  @IsOptional()
  month?: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  company_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  concept_code?: string;
}

export class FilterMovementDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @IsOptional()
  @IsUUID()
  period_id?: string;

  @IsOptional()
  @IsUUID()
  concept_id?: string;

  @IsOptional()
  quantity?: number;

  @IsOptional()
  value?: number;

  @IsOptional()
  @IsString()
  year?: number;

  @IsOptional()
  @IsString()
  month?: number;

  @IsOptional()
  @IsUUID()
  company_id?: string;
}
