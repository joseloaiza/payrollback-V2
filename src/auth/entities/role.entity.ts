import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Permission } from './permission.entity';

@Entity('roles')
export class Role extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @Column({ name: 'isActive', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToMany(() => Permission, (perm) => perm.roles, { eager: false })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions: Permission[];

  // Circular reference resolved via string to avoid import cycle with User
  @OneToMany('User', 'role')
  users: unknown[];
}
