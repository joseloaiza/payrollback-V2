import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PayrollService } from '../payroll.service';
import { NoveltyCreatedEvent } from 'src/novelties/events/novelty-created.event';

@Injectable()
export class NoveltyCreatedListener {
  constructor(private readonly payrollService: PayrollService) {}

  @OnEvent('novelty.created')
  async handleAbsenteeCreated(event: NoveltyCreatedEvent) {
    // Call your PayrollService method here
    await this.payrollService.calculatePayrollCompany(
      event.companyId,
      event.employeeId,
    );
  }
}
