import {
  IsString,
  IsBoolean,
  IsOptional,
  Length,
  IsUUID,
} from 'class-validator';
import { BaseDto } from 'src/utils/dto/Base.dto';
import { PaginationDto } from 'src/utils/dto/Pagination.dto';

export class AssistanceTypeDto {
  @IsString()
  @Length(1, 5)
  code: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  description?: string;

  @IsOptional()
  @IsString()
  createUser?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateAssistanceTypeDto {
  @IsString()
  @Length(1, 5)
  code: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  description?: string;

  @IsOptional()
  @IsString()
  createUser?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
export class UpdateAssistanceTypeDto {
  @IsOptional()
  @IsString()
  @Length(1, 5)
  code?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  description?: string;

  @IsOptional()
  @IsString()
  createUser?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
export class FilterAssistanceTypeDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @Length(1, 5)
  code?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  description?: string;

  @IsOptional()
  @IsString()
  createUser?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
export class ResponseAssistanceTypeDto extends BaseDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @Length(1, 5)
  code?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  description?: string;

  @IsOptional()
  @IsString()
  createUser?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
