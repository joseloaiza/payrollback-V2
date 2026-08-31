import { AbstractEntity } from '../../database/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Bank } from 'src/shared/entities/bank.entity';
import { AccountType } from 'src/shared/entities/account-type.entity';

@Entity('employeePayment')
export class EmployeePayment extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Employee, (employee) => employee.payment) // Define inverse relation
  @JoinColumn({ name: 'id' }) // Foreign key column
  employee: Employee;

  @ManyToOne(() => Bank) // Define inverse relation
  @JoinColumn({ name: 'bank_id' }) // Foreign key column
  bank: Bank;

  @ManyToOne(() => AccountType) // Define inverse relation
  @JoinColumn({ name: 'accountType_id' }) // Foreign key column
  accountType: AccountType;

  @Column()
  bank_id: string;

  @Column()
  accountType_id: string;

  @Column()
  accountNumber: string;

  @Column()
  isActive: boolean;
}
