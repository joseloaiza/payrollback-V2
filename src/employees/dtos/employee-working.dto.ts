import { IsUUID, IsOptional, IsBoolean, IsNumber } from 'class-validator';

import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeWorkingDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  contractRegime_id: string;

  @ApiProperty()
  @IsUUID()
  employeeType_id: string;

  @ApiProperty()
  @IsUUID()
  companyEconomicActivityRisk_id: string;

  @ApiProperty()
  @IsUUID()
  workingHour_id: string;

  @ApiProperty()
  @IsBoolean()
  transportAssistance: boolean;

  @ApiProperty()
  @IsBoolean()
  variableSalary: boolean;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsNumber()
  vacationHistory: number;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateEmployeeWorkingDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contractRegime_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  employeeType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  companyEconomicActivityRisk_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  workingHour_id?: string;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  transportAssistance?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  variableSalary: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vacationHistory?: number;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseEmployeeWorkingDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contractRegime_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  employeeType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  companyEconomicActivityRisk_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  workingHour_id?: string;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  transportAssistance?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  variableSalary: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vacationHistory?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FilterEmployeeWorkingDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  contractRegime_id?: string;

  @IsOptional()
  @IsUUID()
  employeeType_id?: string;

  @IsOptional()
  @IsUUID()
  companyEconomicActivityRisk_id?: string;

  @IsOptional()
  @IsUUID()
  workingHour_id?: string;

  @IsOptional()
  @IsBoolean()
  transportAssistance?: boolean;

  @IsOptional()
  @IsBoolean()
  variableSalary?: boolean;

  @IsOptional()
  @IsNumber()
  vacationHistory?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
