import { IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { WorkPlaceRisk } from '../entities/work-place-risk.entity';

export class CreateCompanyEconomicActivityRiskDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  company_id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  economicactivity_id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  workplacerisk_id: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}

export class UpdateCompanyEconomicActivityRiskDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  company_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  economicactivity_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  workplacerisk_id?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ResponseCompanyEconomicActivityRiskDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  company_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  economicactivity_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  workplacerisk_id?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  workPlaceRisk?: WorkPlaceRisk;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FilterCompanyEconomicActivityRiskDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  company_id?: string;

  @IsOptional()
  @IsUUID()
  economicactivity_id?: string;

  @IsOptional()
  @IsUUID()
  workplacerisk_id?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
