import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AbsenteeCreatedEvent } from '../../novelties/events/absentee-created.event';
import { PayrollService } from './../payroll/payroll.service';

@Injectable()
export class AbsenteeCreatedListener {
  constructor(private readonly payrollService: PayrollService) {}

  @OnEvent('absentee.created')
  async handleAbsenteeCreated(event: AbsenteeCreatedEvent) {
    // Call your PayrollService method here
    await this.payrollService.calculatePayrollCompany(
      event.companyId,
      event.employeeId,
    );
  }
}
