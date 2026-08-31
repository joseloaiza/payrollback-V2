import { AbstractEntity } from './../../database/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SocialSecurityEntityType } from './social-security-entity-type.entity';

@Entity('socialSecurityEntity')
export class SocialSecurityEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 6 })
  code: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20 })
  identification: string;

  @Column({ length: 5 })
  verificationNumber: string;

  @Column({ nullable: true })
  city_id?: string;

  @Column({ nullable: true, length: 100 })
  address?: string;

  @Column({ nullable: true, length: 20 })
  phone?: string;

  @Column()
  isActive: boolean;

  @Column()
  socialSecurityEntityType_id: string;

  @ManyToOne(() => SocialSecurityEntityType)
  @JoinColumn({ name: 'socialSecurityEntityType_id' })
  socialSecurityEntityType: SocialSecurityEntityType;
}
