import { IsString, IsUUID, IsOptional } from 'class-validator';
import { BaseDto } from '../../utils/dto/Base.dto';
import { PaginationDto } from '../../utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaymentFrequencyDto } from 'src/shared/dtos/paymentFrequency.dto';
import { Type } from 'class-transformer';

export class CreateCompanyPaymentDto {
  @ApiProperty()
  @IsUUID()
  paymentFrequency_id: string;
  @ApiProperty()
  @IsUUID()
  paymentMethod_id: string;
  @ApiProperty()
  @IsUUID()
  bank_id: string;
  @ApiProperty()
  @IsUUID()
  accountType_id: string;
  @ApiProperty()
  @IsString()
  accountNumber: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateCompanyPaymentDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  paymentFrequency_id: string;
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  paymentMethod_id: string;
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  bank_id: string;
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  accountType_id: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  accountNumber: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseCompanyPaymentDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;
  @ApiProperty()
  paymentFrequency_id: string;
  @ApiProperty()
  paymentMethod_id: string;
  @ApiProperty()
  bank_id: string;
  @ApiProperty()
  accountType_id: string;
  @ApiProperty()
  accountNumber: string;
  @Type(() => ResponsePaymentFrequencyDto)
  paymentFrequency: ResponsePaymentFrequencyDto;
}

export class FilterCompanyPaymentDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  paymentFrequency_id?: string;

  @IsOptional()
  @IsUUID()
  paymentMethod_id?: string;

  @IsOptional()
  @IsUUID()
  bank_id?: string;

  @IsOptional()
  @IsUUID()
  accountType_id?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;
}
