import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubsidiaryDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsUUID()
  company_id: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateSubsidiaryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  company_id: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseSubsidiaryDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsUUID()
  company_id: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class FilterSubsidiaryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  company_id?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
