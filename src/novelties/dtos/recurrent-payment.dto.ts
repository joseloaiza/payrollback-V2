import { IsNumber, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ResponseConceptDto } from './../../payroll/dto/concept.dto';
import { ResponseEmployeeDto } from 'src/employees/dtos/employee.dto';

export class RecurrentPaymentDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  employee_id: string;

  @ApiProperty()
  @IsUUID()
  concept_id: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
export class CreateRecurrentPaymentDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  employee_id: string;

  @ApiProperty()
  @IsUUID()
  concept_id: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateRecurrentPaymentDto {
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
  concept_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseRecurrentPaymentDto extends BaseDto {
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
  concept_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsBoolean()
  @Type(() => ResponseConceptDto)
  concep?: ResponseConceptDto;

  @ApiProperty()
  @Type(() => ResponseEmployeeDto)
  employee?: ResponseEmployeeDto;
}

export class FilterRecurrentPaymentDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @IsOptional()
  @IsUUID()
  concept_id?: string;

  @IsOptional()
  value?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
