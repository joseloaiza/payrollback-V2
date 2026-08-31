import { AbstractEntity } from './../../database/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Employee } from './employee.entity';
import { ContractType } from './contractType.entity';
import { ContractClassification } from './contractClassification.entity';

@Entity('employeeContract')
export class EmployeeContract extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employee_id: string;

  @Column()
  contractType_id: string;

  @Column()
  initialContractDate: Date;

  @Column()
  endContractDate: Date;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  firstContractDate?: Date;

  @Column()
  contractClassification_id: string;

  @ManyToOne(() => Employee, (employee) => employee.contracts)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => ContractType)
  @JoinColumn({ name: 'contractType_id' })
  contractType: ContractType;

  @ManyToOne(() => ContractClassification)
  @JoinColumn({ name: 'contractClassification_id' })
  contractClassification: ContractClassification;
}
