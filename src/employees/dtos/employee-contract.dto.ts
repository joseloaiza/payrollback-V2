import { IsUUID, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmployeeContractDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  employee_id: string;

  @ApiProperty()
  @IsUUID()
  contractType_id: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  initialContractDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  endContractDate: Date;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  firstContractDate: Date;
}
export class CreateEmployeeContractDto {
  @ApiProperty()
  @IsUUID()
  employee_id: string;

  @ApiProperty()
  @IsUUID()
  contractType_id: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  initialContractDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  endContractDate: Date;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  firstContractDate: Date;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contractClassification_id?: string;
}

export class UpdateEmployeeContractDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contractType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initialContractDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endContractDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  firstContractDate?: Date;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contractClassification_id?: string;
}

export class ResponseEmployeeContractDto extends BaseDto {
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
  contractType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initialContractDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endContractDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  firstContractDate?: Date;

  @ApiProperty()
  employee: { id: string; name: string };
  @ApiProperty()
  contractType: { id: string; name: string };

  @ApiProperty()
  contractClassification: { id: string; code: string; description: string };
}

export class FilterEmployeeContractDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @IsOptional()
  @IsUUID()
  contractType_id?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initialContractDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endContractDate?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  firstContractDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contractClassification_id?: string;
}
