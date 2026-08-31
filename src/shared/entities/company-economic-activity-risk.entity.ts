import { AbstractEntity } from '../../database/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WorkPlaceRisk } from './work-place-risk.entity';
import { Company } from 'src/companies/entities/company.entity';
import { EconomicActivity } from './economic-activity.entity';

@Entity('companyEconomicActivityRisk')
export class CompanyEconomicActivityRisk extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  economicactivity_id: string;

  @Column({ type: 'uuid' })
  workplacerisk_id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Company) // Define inverse relation
  @JoinColumn({ name: 'company_id' }) // Foreign key column
  company: Company;

  @ManyToOne(() => EconomicActivity) // Define inverse relation
  @JoinColumn({ name: 'economicactivity_id' }) // Foreign key column
  economicActivity: EconomicActivity;

  @ManyToOne(() => WorkPlaceRisk)
  @JoinColumn({ name: 'workplacerisk_id' })
  workPlaceRisks: WorkPlaceRisk;
}
