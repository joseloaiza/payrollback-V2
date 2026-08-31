import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Company } from '../../companies/entities/company.entity';
import { Role } from '../../auth/entities/role.entity';

@Entity('userCompany')
export class UsersCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ name: 'role_id', type: 'uuid', nullable: true })
  role_id: string;

  @ManyToOne(() => Company, (company) => company.userCompanies)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, { nullable: true, eager: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
