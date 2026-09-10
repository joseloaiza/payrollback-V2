import { AbstractEntity } from '../../database/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Concept } from '../../concepts/concept.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity('recurrentPayment')
export class RecurrentPayment extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  employee_id?: string;

  @Column()
  concept_id: string;

  @Column({ nullable: true, precision: 18, scale: 2 })
  value?: number;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Concept)
  @JoinColumn({ name: 'concept_id' })
  concept: Concept;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
