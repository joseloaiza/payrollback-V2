import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workingHour')
export class WorkingHour extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 5 })
  code: string;

  @Column({ nullable: true, length: 50 })
  description?: string;

  @Column({ nullable: true })
  isActive?: boolean;
}
