import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('costCenter')
export class CostCenter extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  code: string;

  @Column({ length: 50 })
  description: string;

  @Column()
  spendingAccount_id: string;

  @Column()
  company_id: string;

  @Column()
  isActive: boolean;
}
