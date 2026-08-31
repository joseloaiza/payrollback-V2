import { IsString, IsOptional } from 'class-validator';

export class EmployeePayrollDTO {
  id: string;
  identification: string;
  firstName: string;
  secondName?: string;
  surname: string;
  secondSurName?: string;
  salary: number;
  movements: {
    quantity: number;
    value: number;
    concept: {
      code: string;
      description: string;
      conceptGroup: string;
    };
  }[];
}

export class GetResumePayrollDto {
  @IsString()
  company_id: string;

  @IsString()
  period_id: string;

  @IsOptional()
  @IsString()
  employee_id?: string;
}
