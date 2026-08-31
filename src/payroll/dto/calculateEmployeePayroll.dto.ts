import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CalculatePayrollDto {
  @IsOptional() // <-- Add this decorator
  @IsString()
  employee_id: string;

  @IsNotEmpty()
  @IsString()
  company_id: string;

  @IsOptional()
  @IsString()
  liquidation_date: Date;

  @IsOptional()
  @IsString()
  cause_liquidation_id: string;

  @IsOptional()
  @IsString()
  type: 'payroll' | 'liquidation';

  @IsOptional()
  @IsString()
  liquidation_id: string;
}
