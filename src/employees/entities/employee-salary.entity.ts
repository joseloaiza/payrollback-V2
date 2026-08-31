import { AbstractEntity } from './../../database/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { SalaryType } from 'src/shared/entities/salary-type.entity';

@Entity('employeeSalary')
export class EmployeeSalary extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employee_id: string;

  @Column()
  salaryType_id: string;

  @Column()
  salary: number;

  @Column()
  initialSalaryDate: Date;

  @Column()
  endSalaryDate: Date;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Employee, (employee) => employee.salaries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => SalaryType)
  @JoinColumn({ name: 'salaryType_id' })
  salaryType: SalaryType;
}
