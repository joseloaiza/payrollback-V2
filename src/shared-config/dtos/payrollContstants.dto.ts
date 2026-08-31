import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PayrollConstantsDto extends BaseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Value is required' }) // Ensures the value is not empty
  @IsNumber({}, { message: 'Value must be a number' }) // Ensures the value is a number
  @Min(0, { message: 'Value must be greater than or equal to 0' }) // Ensures the value is not negative
  value: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  initialDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsString()
  type: string;
}
export class CreatePayrollConstantsDto extends OmitType(PayrollConstantsDto, [
  'id',
  'createdAt',
  'createUser',
  'updatedAt',
  'updateUser',
] as const) {}

export class UpdatePayrollConstantsDto extends PartialType(
  CreatePayrollConstantsDto,
) {}

export class ResponsePayrollConstantsDto extends PickType(PayrollConstantsDto, [
  'id',
  'description',
  'value',
  'initialDate',
  'endDate',
  'isActive',
  'type',
] as const) {}

export class FilterPayrollConstantsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsDate()
  initialDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  type?: string;
}
