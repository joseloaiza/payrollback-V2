import { IsString, IsOptional } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class Codes_configDto extends BaseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  category: string;
}
export class CreateCodes_configDto extends OmitType(Codes_configDto, [
  'id',
  'createdAt',
  'createUser',
  'updatedAt',
  'updateUser',
] as const) {}

export class UpdateCodes_configDto extends PartialType(CreateCodes_configDto) {}

export class ResponseCodes_configDto extends PickType(Codes_configDto, [
  'id',
  'code',
  'description',
  'category',
] as const) {}

export class FilterCodes_configDto extends PaginationDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
