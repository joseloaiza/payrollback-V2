import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diagnosis')
export class Diagnosis extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 5 })
  code: string;

  @Column({ nullable: true, length: 100 })
  description?: string;

  @Column()
  isActive: boolean;
}
