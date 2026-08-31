import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companyPayroll')
export class CompanyPayroll extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  law1393?: boolean;

  @Column({ nullable: true })
  exoneratedCREE?: boolean;

  @Column({ nullable: true })
  affectAbsenteeLB?: boolean;

  @Column({ nullable: true })
  payday31vacation?: boolean;

  @Column({ nullable: true })
  assistanceType?: string;
}
