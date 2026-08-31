import { IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeJobDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  costCenter_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  area_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  subsidiary_id: string;

  @ApiProperty()
  @IsUUID()
  position_id: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
export class CreateEmployeeJobDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  costCenter_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  area_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  subsidiary_id: string;

  @ApiProperty()
  @IsUUID()
  position_id: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateEmployeeJobDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  costCenter_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  area_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  subsidiary_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  position_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseEmployeeJobDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  costCenter_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  area_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  subsidiary_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  position_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FilterEmployeeJobDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  costCenter_id?: string;

  @IsOptional()
  @IsUUID()
  area_id?: string;

  @IsOptional()
  @IsUUID()
  subsidiary_id?: string;

  @IsOptional()
  @IsUUID()
  position_id?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
