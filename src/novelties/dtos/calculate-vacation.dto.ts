import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID } from 'class-validator';

export class CalculateVacationDto {
  @ApiProperty({ example: '3def3700-d876-11eb-b6fc-4bcffa1b4fd3' })
  @IsUUID()
  employee_id: string;

  @ApiProperty({ example: '2026-04-06' })
  @IsDateString()
  start_date: string;

  @ApiProperty({ example: '2026-04-17' })
  @IsDateString()
  end_date: string;
}

export class VacationCalculationResponseDto {
  @ApiProperty({ example: '3def3700-d876-11eb-b6fc-4bcffa1b4fd3' })
  employee_id: string;

  @ApiProperty({ example: 'MON_FRI', enum: ['MON_FRI', 'MON_SAT'] })
  work_schedule_type: 'MON_FRI' | 'MON_SAT';

  @ApiProperty({ example: '2026-04-06' })
  start_date: string;

  @ApiProperty({ example: '2026-04-17' })
  end_date: string;

  @ApiProperty({ example: 10 })
  enjoyed_days: number;

  @ApiProperty({ example: '2026-04-20' })
  return_date: string;
}
