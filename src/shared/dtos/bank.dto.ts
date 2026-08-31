import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { Expose } from 'class-transformer';

export class BankDto extends BaseDto {
  @Expose()
  @ApiProperty()
  @IsUUID()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  code: string;

  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  identification: string;

  @Expose()
  @ApiProperty()
  @IsUUID()
  city_id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  address: string;

  @Expose()
  @ApiProperty()
  @IsString()
  phone: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
export class CreateBankDto {
  @Expose()
  @ApiProperty()
  @IsString()
  code: string;

  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  identification: string;

  @Expose()
  @ApiProperty()
  @IsUUID()
  city_id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  address: string;

  @Expose()
  @ApiProperty()
  @IsString()
  phone: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateBankDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  code?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  identification?: string;

  @Expose()
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  city_id?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class ResponseBankDto extends BaseDto {
  @Expose()
  @ApiProperty()
  @IsUUID()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  code?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  identification?: string;

  @Expose()
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  city_id?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class FilterBankDto extends PaginationDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  identification?: string;

  @IsOptional()
  @IsUUID()
  city_id?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
