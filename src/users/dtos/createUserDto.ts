//import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEmail,
  Length,
  IsPhoneNumber,
  Matches,
} from 'class-validator';
import { ResponseCompanyDto } from 'src/companies/dtos/company.dto';

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsEmail()
  @Length(1, 50)
  userName: string;

  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  img?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @IsString()
  @IsOptional()
  rol_id?: string;

  @IsPhoneNumber(null)
  cellPhone: string;

  @IsString()
  companyName: string;
}
export class ResponseUserDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  userName: string;
  @Expose()
  img?: string;
  @Expose()
  isActive?: boolean = true;
  @Expose()
  rol_id?: string;
  @Expose()
  cellPhone: string;
  @Expose()
  companies: ResponseCompanyDto[];
}
