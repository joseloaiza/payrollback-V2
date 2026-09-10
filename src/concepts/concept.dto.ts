import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from './../utils/dto/Base.dto';
import { PaginationDto } from './../utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConceptDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  company_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  account: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  counterPart: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  salaryBase: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  securityBase: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  riskBase: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  parafiscalBase: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  retentionBase: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  transportBase: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  primaLegalBase: boolean;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  severanceBase: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  conceptGroup: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCalculated: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isNovelty: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isOverTime: boolean;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  absenteeType_id: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCustomer: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateConceptDto {
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
  @IsOptional()
  @IsUUID()
  company_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  account?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  counterPart?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  salaryBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  securityBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  riskBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  parafiscalBase: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  retentionBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  transportBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  primaLegalBase?: boolean;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  severanceBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  conceptGroup?: string;

  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCalculated?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isNovelty?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isOverTime?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  absenteeType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCustomer?: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseConceptDto extends BaseDto {
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
  @IsOptional()
  @IsUUID()
  company_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  account?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  counterPart?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  salaryBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  securityBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  riskBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  parafiscalBase: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  retentionBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  transportBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  primaLegalBase?: boolean;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  severanceBase?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  conceptGroup?: string;

  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCalculated?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isNovelty?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isOverTime?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  absenteeType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCustomer?: boolean;
}

export class FilterConceptDto extends PaginationDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  company_id?: string;

  @IsOptional()
  @IsString()
  account?: string;

  @IsOptional()
  @IsString()
  counterPart?: string;

  @IsOptional()
  @IsBoolean()
  salaryBase?: boolean;

  @IsOptional()
  @IsBoolean()
  securityBase?: boolean;

  @IsOptional()
  @IsBoolean()
  riskBase?: boolean;

  @IsOptional()
  @IsBoolean()
  parafiscalBase?: boolean;

  @IsOptional()
  @IsBoolean()
  retentionBase?: boolean;

  @IsOptional()
  @IsString()
  conceptGroup?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isCalculated?: boolean;

  @IsOptional()
  @IsBoolean()
  transportBase?: boolean;

  @IsOptional()
  @IsBoolean()
  isNovelty?: boolean;

  @IsOptional()
  @IsBoolean()
  isOverTime?: boolean;

  @IsOptional()
  @IsUUID()
  absenteeType_id?: string;

  @IsOptional()
  @IsBoolean()
  primaLegalBase?: boolean;

  @IsOptional()
  @IsBoolean()
  isCustomer?: boolean;

  @IsOptional()
  @IsBoolean()
  severanceBase?: boolean;
}
