import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country')
export class Country extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 5 })
  code: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  isActive: boolean;
}
