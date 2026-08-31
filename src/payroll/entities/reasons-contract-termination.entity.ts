import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// reasons-contract-termination.entity.ts
@Entity('reasonsContractTermination')
export class ReasonsContractTermination extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  description: string;
}
