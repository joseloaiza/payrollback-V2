import { Optional } from '@nestjs/common';
import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('accountType')
export class AccountType extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 5, unique: true })
  code: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Optional()
  @Column({ length: 50, nullable: true })
  description?: string;
}
