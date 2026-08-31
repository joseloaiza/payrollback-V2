import { AbstractEntity } from './../../database/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AbsenteeType } from './absentee-type.entity';

@Entity('absenteeHistory')
export class AbsenteeHistory extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employee_id: string;

  @Column()
  absenteeType_id: string;

  @Column()
  initialAbsencesDate: Date;

  @Column()
  endAbsencesDate: Date;

  @Column({ precision: 5, scale: 0, nullable: true })
  naturalDays?: number;

  @Column({ precision: 5, scale: 0, nullable: true })
  businessDays?: number;

  @Column({ precision: 5, scale: 0, nullable: true })
  accumulatedDays?: number;

  @Column({ precision: 5, scale: 0, nullable: true })
  quantity?: number;

  @Column({ precision: 18, scale: 0, nullable: true })
  value?: number;

  @Column({ precision: 18, scale: 0, nullable: true })
  baseAbsences?: number;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  returnDate?: Date;

  @Column({ nullable: true })
  diagnosis_id?: string;

  @Column({ nullable: true, length: 50 })
  referenceNumber?: string;

  @Column({ nullable: true, length: 50 })
  doctorName?: string;

  @Column({ nullable: true, length: 50 })
  doctorIdentification?: string;

  @Column({ nullable: true })
  referenceInhability?: string;

  @ManyToOne(() => AbsenteeType)
  @JoinColumn({ name: 'absenteeType_id' })
  absenteeType?: AbsenteeType;
}
