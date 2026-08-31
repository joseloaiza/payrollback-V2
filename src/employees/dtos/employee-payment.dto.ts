import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeePaymentDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  bank_id: string;

  @ApiProperty()
  @IsUUID()
  accountType_id: string;

  @ApiProperty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
export class CreateEmployeePaymentDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  bank_id: string;

  @ApiProperty()
  @IsUUID()
  accountType_id: string;

  @ApiProperty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateEmployeePaymentDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  bank_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  accountType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseEmployeePaymentDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  bank_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  accountType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FilterEmployeePaymentDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  bank_id?: string;

  @IsOptional()
  @IsUUID()
  accountType_id?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
