import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bank')
export class Bank extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 5 })
  code: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20 })
  identification: string;

  @Column()
  city_id: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  isActive: boolean;
}
