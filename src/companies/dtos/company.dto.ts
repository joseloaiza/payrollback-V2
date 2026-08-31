import {
  IsUUID,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsEmail,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { Expose, Type } from 'class-transformer';

export class CreateCompanyDto {
  @Expose()
  @ApiProperty({ example: 'Company Name' })
  @IsString()
  name: string;

  @Expose()
  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  identification?: string;

  @ApiProperty({ example: '12345' })
  @IsOptional()
  @IsString()
  verificationNumber?: string;

  @ApiProperty({ example: 'some_address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'company@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  legalRepresentant?: string;

  @ApiProperty({ example: '2023-01-01' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fundationDate?: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: 'https://image.com/logo.png' })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  cellphone?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  cityId?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  stateId?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  countryId?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  entityRisksId?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  compensationFundId?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  identificationTypeId?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  informationOperation_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateCompanyDto {
  @Expose()
  @ApiProperty({ example: 'Company Name' })
  @IsString()
  @IsOptional()
  name: string;

  @Expose()
  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  identification?: string;

  @ApiProperty({ example: '12345' })
  @IsOptional()
  @IsString()
  verificationNumber?: string;

  @ApiProperty({ example: 'some_address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'company@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  legalRepresentant?: string;

  @ApiProperty({ example: '2023-01-01' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fundationDate?: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: 'https://image.com/logo.png' })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  cellphone?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  city_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  state_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  country_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  entityRisks_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  compensationFund_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  identificationType_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  informationOperation_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseCompanyDto extends BaseDto {
  @IsUUID()
  id: string;

  @Expose()
  @ApiProperty({ example: 'Company Name' })
  @IsString()
  name: string;

  @Expose()
  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  identification?: string;

  @ApiProperty({ example: '12345' })
  @IsOptional()
  @IsString()
  verificationNumber?: string;

  @ApiProperty({ example: 'some_address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'company@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  legalRepresentant?: string;

  @ApiProperty({ example: '2023-01-01' })
  @IsOptional()
  @IsDate()
  fundationDate?: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: 'https://image.com/logo.png' })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  cellphone?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  city_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  state_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  country_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  entityRisks_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  compensationFund_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  identificationType_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  informationOperation_id?: string;
}

export class FilterCompanyDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsUUID()
  city_id?: string;

  @IsOptional()
  @IsUUID()
  country_id?: string;

  @IsOptional()
  @IsUUID()
  informationOperation_id?: string;
}
