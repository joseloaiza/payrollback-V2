import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollEmployeeSnapshotInput } from './entitiy/payroll_employee_snapshot-input.entity';
import { PayrollEmployeeSnapshot } from './entitiy/payroll_employee_snapshot.entity';
import { PayrollInputCatalog } from './entitiy/payroll-input-catalog.entity';
import { SnapshotService } from './snapshot.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PayrollEmployeeSnapshotInput,
      PayrollEmployeeSnapshot,
      PayrollInputCatalog,
    ]),
  ],
  providers: [SnapshotService],
  controllers: [],
  exports: [SnapshotService],
})
export class SnapshotModule {}
