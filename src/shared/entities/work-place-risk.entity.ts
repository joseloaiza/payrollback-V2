import { AbstractEntity } from '../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workPlaceRisks')
export class WorkPlaceRisk extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 5 })
  code: string;

  @Column({ length: 50 })
  description: string;

  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: false })
  percentage: number;

  @Column()
  isActive: boolean;
}
