import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';

export class CreateInformationOperatorDto {
  @ApiProperty({ example: 'OP01' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Operador de información' })
  @IsString()
  description: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}

export class UpdateInformationOperatorDto {
  @ApiProperty({ example: 'OP01' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Operador de información' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ResponseInformationOperatorDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'OP01' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Operador de información' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FilterInformationOperatorDto extends PaginationDto {
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
