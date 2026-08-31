import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersCompany } from './usersCompany.entity';
import { Role } from '../../auth/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  userName: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'createUser', type: 'varchar', length: 50, nullable: true })
  createUser: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @Column({ name: 'updateUser', type: 'varchar', length: 50, nullable: true })
  updateUser: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  img: string;

  @Column({ name: 'isActive', type: 'boolean', default: true, nullable: true })
  isActive: boolean;

  /** @deprecated Use role_id instead. Will be removed after migration. */
  @Column({ name: 'rol_id', type: 'varchar', nullable: true })
  rol_id: string;

  @Column({ name: 'role_id', type: 'uuid', nullable: true })
  role_id: string;

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: true,
    eager: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'cellPhone', type: 'varchar', length: 50, nullable: true })
  cellPhone: string;

  @Column({
    name: 'refreshToken',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  refreshToken: string;

  @OneToMany(() => UsersCompany, (userCompany) => userCompany.user)
  companies: UsersCompany[];
}
