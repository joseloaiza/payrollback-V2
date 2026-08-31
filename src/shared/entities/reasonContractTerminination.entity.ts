import { AbstractEntity } from '../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reasonsContractTermination')
export class ReasonContractTermination extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 5 })
  code: string;

  @Column({ length: 50 })
  description: string;

  @Column()
  applies_indemnization: boolean;

  @Column()
  isActive: boolean;
}
