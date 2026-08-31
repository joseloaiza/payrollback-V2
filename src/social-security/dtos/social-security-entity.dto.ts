import {
  IsString,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsObject,
} from 'class-validator';

import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SocialSecurityEntityDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  identification: string;

  @ApiProperty()
  @IsString()
  verificationNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  city_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsUUID()
  socialSecurityEntityType_id: string;
}
export class CreateSocialSecurityEntityDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  identification: string;

  @ApiProperty()
  @IsString()
  verificationNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  city_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsUUID()
  socialSecurityEntityType_id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createUser?: string;
}

export class UpdateSocialSecurityEntityDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  identification?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  verificationNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  city_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  socialSecurityEntityType_id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseSocialSecurityEntityDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  identification?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  verificationNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  city_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  socialSecurityEntityType_id: string;
}

export class FilterSocialSecurityEntityDto extends PaginationDto {
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
  @IsString()
  verificationNumber?: string;

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

  @IsOptional()
  @IsUUID()
  socialSecurityEntityType_id?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsObject()
  relationFilters?: Record<string, any>;
}
