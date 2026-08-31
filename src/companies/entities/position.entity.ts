import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('position')
export class Position extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  description: string;

  @Column()
  company_id: string;

  @Column()
  isActive: boolean;
}
