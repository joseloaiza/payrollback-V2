import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContractTypeDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateContractTypeDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseContractTypeDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class FilterContractTypeDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
