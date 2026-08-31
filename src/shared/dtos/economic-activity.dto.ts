import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';

export class CreateEconomicActivityDto {
  @ApiProperty({ example: 'EA01' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Actividad económica' })
  @IsString()
  description: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}

export class UpdateEconomicActivityDto {
  @ApiProperty({ example: 'EA01' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Actividad económica' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ResponseEconomicActivityDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'EA01' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Actividad económica' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FilterEconomicActivityDto extends PaginationDto {
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
