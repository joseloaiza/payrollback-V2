import { IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyPayrollDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  law1393: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  exoneratedCREE: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  affectAbsenteeLB: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  payday31vacation: boolean;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  assistanceType: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateCompanyPayrollDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  law1393: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  exoneratedCREE: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  affectAbsenteeLB: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  payday31vacation: boolean;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  assistanceType: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseCompanyPayrollDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  law1393: boolean;

  @ApiProperty()
  @IsBoolean()
  exoneratedCREE: boolean;

  @ApiProperty()
  @IsBoolean()
  affectAbsenteeLB: boolean;

  @ApiProperty()
  @IsBoolean()
  payday31vacation: boolean;

  @ApiProperty()
  @IsUUID()
  assistanceType: string;
}

export class FilterCompanyPayrollDto extends PaginationDto {
  @IsOptional()
  @IsBoolean()
  law1393?: boolean;

  @IsOptional()
  @IsBoolean()
  exoneratedCREE?: boolean;

  @IsOptional()
  @IsBoolean()
  affectAbsenteeLB?: boolean;

  @IsOptional()
  @IsBoolean()
  payday31vacation?: boolean;

  @IsOptional()
  @IsUUID()
  assistanceType?: string;
}
