//import { IsString, IsNumber } from 'class-validator';

//import { BaseDto } from './../../utils/dto/Base.dto';

//import { ApiProperty } from '@nestjs/swagger';

export class CreatePayrollJobdDto {
  type: 'payroll' | 'liquidation';
  companyId: string;
  periodId: string;
  totalEmployees: number;
  processedCount?: number;
  failedCount?: number;
  liquidation_date?: Date;
  cause_liquidation_id?: string;
  liquidation_id?: string;
  status?: 'processing' | 'completed' | 'completed_with_errors' | 'failed';
  periodData: {
    id: string;
    number: number;
    year: number;
    month: number;
    initialDate: Date;
    endDate: Date;
    isActive: boolean;
    previousPeriodYear: number;
    previousPeriodNumber: number;
  };
}
