import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('assistanceType')
export class AssistanceType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 5, unique: true })
  code: string;

  @Column({ length: 50, nullable: true })
  description: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({ length: 50, nullable: true, name: 'createUser' })
  createUser: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @Column({ length: 50, nullable: true, name: 'updateUser' })
  updateUser: string;

  @Column({ default: true, name: 'isActive' })
  isActive: boolean;
}
