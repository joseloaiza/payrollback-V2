import { AbstractEntity } from './../../database/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Employee } from './employee.entity';
import { ContributorType } from 'src/shared/entities/contributorType.entity';
import { SocialSecurityEntity } from 'src/social-security/entities/social-security-entity.entity';
import { ContributorSubType } from 'src/shared/entities/contributorSubType.entity';

@Entity('employeeSocialSecurity')
export class EmployeeSocialSecurity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Employee, (employee) => employee.socialSecurity) // Define inverse relation
  @JoinColumn({ name: 'id' }) // Foreign key column
  employee: Employee;

  @Column()
  entityHealth_id: string;

  @Column()
  entityPension_id: string;

  @Column()
  entitySeverance_id: string;

  @Column()
  contributorType_id: string;

  @Column()
  contributorSubType_id: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => ContributorType) // Define inverse relation
  @JoinColumn({ name: 'contributorType_id' }) // Foreign key column
  contributorType: ContributorType;

  @ManyToOne(() => ContributorSubType) // Define inverse relation
  @JoinColumn({ name: 'contributorSubType_id' }) // Foreign key column
  contributorSubType: ContributorSubType;

  @ManyToOne(() => SocialSecurityEntity) // Define inverse relation
  @JoinColumn({ name: 'entityHealth_id' }) // Foreign key column
  healthEntity: SocialSecurityEntity;

  @ManyToOne(() => SocialSecurityEntity) // Define inverse relation
  @JoinColumn({ name: 'entityPension_id' }) // Foreign key column
  pensionEntity: SocialSecurityEntity;

  @ManyToOne(() => SocialSecurityEntity) // Define inverse relation
  @JoinColumn({ name: 'entitySeverance_id' }) // Foreign key column
  severanceEntity: SocialSecurityEntity;
}
