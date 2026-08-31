import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ContributorSubTypeDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

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
}
export class CreateContributorSubTypeDto {
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
}

export class UpdateContributorSubTypeDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class ResponseContributorSubTypeDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class FilterContributorSubTypeDto extends PaginationDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
