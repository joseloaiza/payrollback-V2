import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { addDays, eachDayOfInterval, getDay, parseISO } from 'date-fns';
import { format } from 'date-fns';
import {
  CalculateVacationDto,
  VacationCalculationResponseDto,
} from '../dtos/calculate-vacation.dto';
import { VacationCalculatorRepository } from './vacation-calculator.repository';
import {
  getHolidaysInRange,
  isColombiaHoliday,
} from 'src/utils/date_utilities';

const WORK_SCHEDULE_MAP: Record<string, 'MON_FRI' | 'MON_SAT'> = {
  LV: 'MON_FRI',
  LS: 'MON_SAT',
};

@Injectable()
export class VacationCalculatorService {
  constructor(private readonly repository: VacationCalculatorRepository) {}

  async calculate(
    dto: CalculateVacationDto,
  ): Promise<VacationCalculationResponseDto> {
    const { employee_id, start_date, end_date } = dto;

    const start = parseISO(start_date);
    const end = parseISO(end_date);

    if (end < start) {
      throw new BadRequestException(
        'end_date debe ser mayor o igual a start_date',
      );
    }

    const code = await this.repository.getWorkScheduleCode(employee_id);
    if (!code) {
      throw new NotFoundException(
        `El empleado ${employee_id} no tiene jornada laboral registrada`,
      );
    }

    const scheduleType = WORK_SCHEDULE_MAP[code];
    if (!scheduleType) {
      throw new NotFoundException(
        `El código de jornada laboral '${code}' no es reconocido`,
      );
    }

    const workingDays = this.countWorkingDays(start, end, scheduleType);
    const holidays = getHolidaysInRange(start, end, 'CO');
    const enjoyed_days = Math.max(0, workingDays - holidays);

    const return_date = this.getReturnDate(end, scheduleType);

    return {
      employee_id,
      work_schedule_type: scheduleType,
      start_date,
      end_date,
      enjoyed_days,
      return_date: format(return_date, 'yyyy-MM-dd'),
    };
  }

  private countWorkingDays(
    start: Date,
    end: Date,
    schedule: 'MON_FRI' | 'MON_SAT',
  ): number {
    const days = eachDayOfInterval({ start, end });
    return days.filter((day) => this.isWorkingDay(day, schedule)).length;
  }

  private isWorkingDay(date: Date, schedule: 'MON_FRI' | 'MON_SAT'): boolean {
    const dow = getDay(date); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    if (schedule === 'MON_FRI') {
      return dow >= 1 && dow <= 5;
    }
    // MON_SAT
    return dow >= 1 && dow <= 6;
  }

  private getReturnDate(end: Date, schedule: 'MON_FRI' | 'MON_SAT'): Date {
    let candidate = addDays(end, 1);
    while (
      !this.isWorkingDay(candidate, schedule) ||
      isColombiaHoliday(candidate)
    ) {
      candidate = addDays(candidate, 1);
    }
    return candidate;
  }
}
