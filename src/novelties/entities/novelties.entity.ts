import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('novelties')
export class Novelties extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employee_id: string;

  @Column()
  period_id: string;

  @Column()
  concept_id: string;

  @Column({ nullable: true })
  quantity?: number;

  @Column({ nullable: true })
  value?: number;

  @Column({ nullable: true })
  year?: string;

  @Column({ nullable: true })
  month?: string;

  @Column({ nullable: true })
  company_id?: string;
}
