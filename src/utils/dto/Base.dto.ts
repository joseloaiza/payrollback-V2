import { IsString, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({ example: '2023-01-01' })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ example: 'admin' })
  @IsOptional()
  @IsString()
  createUser?: string;

  @ApiProperty({ example: '2023-01-01' })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ example: 'admin' })
  @IsOptional()
  @IsString()
  updateUser?: string;
}
