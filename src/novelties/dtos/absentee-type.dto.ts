import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/utils/dto/Pagination.dto';

export class AbsenteeTypeDto {
  @ApiProperty({
    description: 'The unique code for the absentee type (e.g., VACATION)',
    example: 'VACA',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'A detailed description of the absentee type',
    example: 'Annual Paid Vacation ',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Indicates if the absentee type is currently active',
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description:
      'Indicates if this absentee type affects employee antiquity (seniority)',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  affectsAntiquity?: boolean;
}

export class FilterAbsenteeTypeDto extends PaginationDto {
  @IsOptional()
  @ApiProperty({
    description: 'The unique code for the absentee type (e.g., VACATION)',
    example: 'VACA',
  })
  @IsString()
  code?: string;

  @IsOptional()
  @ApiProperty({
    description: 'A detailed description of the absentee type',
    example: 'Annual Paid Vacation ',
  })
  @IsString()
  description?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Indicates if the absentee type is currently active',
    default: true,
  })
  @IsBoolean()
  isActive?: boolean;
  @IsOptional()
  @ApiProperty({
    description:
      'Indicates if this absentee type affects employee antiquity (seniority)',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  affectsAntiquity?: boolean;
}

export class CreateAbsenteeTypeDto {
  @ApiProperty({
    description: 'The unique code for the absentee type (e.g., VACATION)',
    example: 'VACA',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'A detailed description of the absentee type',
    example: 'Annual Paid Vacation ',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Indicates if the absentee type is currently active',
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description:
      'Indicates if this absentee type affects employee antiquity (seniority)',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  affectsAntiquity?: boolean;
}
export class UpdateAbsenteeTypeDto {
  @ApiProperty({
    description: 'The unique code for the absentee type (e.g., VACATION)',
    example: 'VACA',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'A detailed description of the absentee type',
    example: 'Annual Paid Vacation ',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Indicates if the absentee type is currently active',
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description:
      'Indicates if this absentee type affects employee antiquity (seniority)',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  affectsAntiquity?: boolean;
}
export class ResponseAbsenteeTypeDto {
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The unique code for the absentee type (e.g., VACATION)',
    example: 'VACA',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'A detailed description of the absentee type',
    example: 'Annual Paid Vacation ',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Indicates if the absentee type is currently active',
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description:
      'Indicates if this absentee type affects employee antiquity (seniority)',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  affectsAntiquity?: boolean;
}
