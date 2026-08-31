import { AbstractEntity } from '../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('economicactivities')
export class EconomicActivity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 5 })
  code: string;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
