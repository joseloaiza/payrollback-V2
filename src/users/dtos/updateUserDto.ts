import {
  IsString,
  IsOptional,
  IsBoolean,
  Length,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  userName?: string;

  @IsOptional()
  @IsString()
  @Length(8, 255)
  password?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  img?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  rol_id?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  cellPhone?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
