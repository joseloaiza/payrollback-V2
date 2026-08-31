import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { Expose } from 'class-transformer';

export class ReasonContractTerminationDto extends BaseDto {
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
  description: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  applies_indemnization: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
export class CreateReasonContractTerminationDto {
  @Expose()
  @ApiProperty()
  @IsString()
  code: string;

  @Expose()
  @ApiProperty()
  @IsString()
  description: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  applies_indemnization: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateReasonContractTerminationDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  code?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  applies_indemnization?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class ResponseReasonContractTerminationDto extends BaseDto {
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
  description?: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  applies_indemnization?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class FilterReasonContractTerminationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  applies_indemnization?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
