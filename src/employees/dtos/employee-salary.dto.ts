import {
  IsUUID,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmployeeSalaryDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  employee_id: string;

  @ApiProperty()
  @IsUUID()
  salaryType_id: string;

  @ApiProperty()
  @IsNumber()
  salary: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  initialSalaryDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  endSalaryDate: Date;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
export class CreateEmployeeSalaryDto {
  @ApiProperty()
  @IsUUID()
  employee_id: string;

  @ApiProperty()
  @IsUUID()
  salaryType_id: string;

  @ApiProperty()
  @IsNumber()
  salary: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  initialSalaryDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  endSalaryDate: Date;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateEmployeeSalaryDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  salaryType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initialSalaryDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endSalaryDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseEmployeeSalaryDto extends BaseDto {
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
  salaryType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initialSalaryDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endSalaryDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FilterEmployeeSalaryDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @IsOptional()
  @IsUUID()
  salaryType_id?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initialSalaryDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endSalaryDate?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
