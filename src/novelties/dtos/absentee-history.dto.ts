import {
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAbsenteeHistoryDto {
  @ApiProperty()
  @IsUUID()
  employee_id: string;

  @ApiProperty()
  @IsUUID()
  absenteeType_id: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  initialAbsencesDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  endAbsencesDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  naturalDays: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  businessDays: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  accumulatedDays: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  baseAbsences: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  returnDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  diagnosis_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  referenceNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  doctorName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  doctorIdentification: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  referenceInhability: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateAbsenteeHistoryDto {
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
  absenteeType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initialAbsencesDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endAbsencesDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  naturalDays?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  businessDays?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  accumulatedDays?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  baseAbsences?: number;

  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  returnDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  diagnosis_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  referenceNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  doctorName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  doctorIdentification?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  referenceInhability?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseAbsenteeHistoryDto extends BaseDto {
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
  absenteeType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initialAbsencesDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endAbsencesDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  naturalDays?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  businessDays?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  accumulatedDays?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  baseAbsences?: number;

  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  returnDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  diagnosis_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  referenceNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  doctorName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  doctorIdentification?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  referenceInhability?: string;
}

export class FilterAbsenteeHistoryDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @IsOptional()
  @IsUUID()
  absenteeType_id?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initialAbsencesDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endAbsencesDate?: Date;

  @IsOptional()
  naturalDays?: number;

  @IsOptional()
  businessDays?: number;

  @IsOptional()
  accumulatedDays?: number;

  @IsOptional()
  quantity?: number;

  @IsOptional()
  value?: number;

  @IsOptional()
  baseAbsences?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  returnDate?: Date;

  @IsOptional()
  @IsUUID()
  diagnosis_id?: string;

  @IsOptional()
  @IsString()
  referenceNumber?: string;

  @IsOptional()
  @IsString()
  doctorName?: string;

  @IsOptional()
  @IsString()
  doctorIdentification?: string;

  @IsOptional()
  @IsUUID()
  referenceInhability?: string;

  @IsOptional()
  @IsUUID()
  iniDatePeriod?: Date;

  @IsOptional()
  @IsUUID()
  endDatePeriod?: Date;
}
