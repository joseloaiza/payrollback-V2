import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmployeeWorking } from 'src/employees/entities/employee-working.entity';
import { WorkingHour } from 'src/shared/entities/workin-hour.entity';

@Injectable()
export class VacationCalculatorRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getWorkScheduleCode(employeeId: string): Promise<string | null> {
    const result = await this.dataSource
      .createQueryBuilder()
      .select('wh.code', 'code')
      .from(EmployeeWorking, 'ew')
      .innerJoin(WorkingHour, 'wh', 'ew.workingHour_id = wh.id')
      .where('ew.id = :employeeId', { employeeId })
      .getRawOne<{ code: string }>();

    return result?.code ?? null;
  }
}
