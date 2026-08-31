import { IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeSocialSecurityDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  entityHealth_id: string;

  @ApiProperty()
  @IsUUID()
  entityPension_id: string;

  @ApiProperty()
  @IsUUID()
  entitySeverance_id: string;

  @ApiProperty()
  @IsUUID()
  contributorType_id: string;

  @ApiProperty()
  @IsUUID()
  contributorSubType_id: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateEmployeeSocialSecurityDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  entityHealth_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  entityPension_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  entitySeverance_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contributorType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contributorSubType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseEmployeeSocialSecurityDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  entityHealth_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  entityPension_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  entitySeverance_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contributorType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  contributorSubType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FilterEmployeeSocialSecurityDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  entityHealth_id?: string;

  @IsOptional()
  @IsUUID()
  entityPension_id?: string;

  @IsOptional()
  @IsUUID()
  entitySeverance_id?: string;

  @IsOptional()
  @IsUUID()
  contributorType_id?: string;

  @IsOptional()
  @IsUUID()
  contributorSubType_id?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
