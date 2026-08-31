import { IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class NoveltiesDto extends BaseDto {
  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'id',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'employee id',
  })
  @IsUUID()
  employee_id: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Period id',
  })
  @IsUUID()
  period_id: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Concept id',
  })
  @IsUUID()
  concept_id: string;
  @ApiProperty({ example: 5.0, description: 'quantity' })
  @IsOptional()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 500.0, description: 'value of the novelty' })
  @IsOptional()
  @IsNumber()
  value: number;

  @ApiProperty({ example: 2025, description: 'year of the novelty' })
  @IsOptional()
  @IsString()
  year: string;

  @ApiProperty({ example: 3, description: 'month of the novelty' })
  @IsOptional()
  @IsString()
  month: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'company id',
  })
  @IsOptional()
  @IsUUID()
  company_id: string;
}
export class CreateNoveltiesDto {
  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Employee ID',
  })
  employee_id: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Period ID',
  })
  period_id: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Concept ID',
  })
  concept_id: string;

  @ApiProperty({ example: 5.0, description: 'Quantity' })
  quantity: number;

  @ApiProperty({ example: 500.0, description: 'Value' })
  value: number;

  @ApiProperty({ example: 2025, description: 'Year' })
  year: string;

  @ApiProperty({ example: 3, description: 'Month' })
  month: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Company ID',
  })
  company_id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateNoveltiesDto {
  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'id',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'employee id',
  })
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Period id',
  })
  @IsOptional()
  @IsUUID()
  period_id?: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Concept id',
  })
  @IsOptional()
  @IsUUID()
  concept_id?: string;
  @ApiProperty({ example: 5.0, description: 'quantity' })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({ example: 500.0, description: 'value of the novelty' })
  @IsOptional()
  @IsNumber()
  value: number;

  @ApiProperty({ example: 2025, description: 'year of the novelty' })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty({ example: 3, description: 'month of the novelty' })
  @IsOptional()
  @IsString()
  month?: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'company id',
  })
  @IsOptional()
  @IsUUID()
  company_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseNoveltiesDto extends BaseDto {
  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'id',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'employee id',
  })
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Period id',
  })
  @IsOptional()
  @IsUUID()
  period_id?: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Concept id',
  })
  @IsOptional()
  @IsUUID()
  concept_id?: string;
  @ApiProperty({ example: 5.0, description: 'quantity' })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({ example: 500.0, description: 'value of the novelty' })
  @IsOptional()
  @IsNumber()
  value: number;

  @ApiProperty({ example: 2025, description: 'year of the novelty' })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty({ example: 3, description: 'month of the novelty' })
  @IsOptional()
  @IsString()
  month?: string;

  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'company id',
  })
  @IsOptional()
  @IsUUID()
  company_id?: string;
}

export class FilterNoveltiesDto extends PaginationDto {
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
  @IsString()
  quantity?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  month?: string;

  @IsOptional()
  @IsUUID()
  company_id?: string;

  @IsOptional()
  @IsString()
  concepGroup?: string;
}

export class saveNoveltyDto {
  @ApiProperty({
    example: 'c4c1704c-bed3-428b-92b7-98641dcf75a9',
    description: 'Concept id',
  })
  @IsUUID()
  concept_id?: string;

  @ApiProperty({
    example: 'M009',
    description: 'Code Concept',
  })
  code_concept?: string;

  @ApiProperty({
    example: 'HEDO',
    description: 'Code constant',
  })
  code_constant?: string;

  @ApiProperty({ example: 500.0, description: 'Amount of the novelty' })
  value: number;
}
