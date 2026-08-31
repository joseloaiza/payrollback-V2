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
import { ContractRegime } from 'src/shared/entities/contractRegime.entity';
import { CompanyEconomicActivityRisk } from 'src/shared/entities/company-economic-activity-risk.entity';
import { EmployeeType } from './employee-type.entity';

@Entity('employeeWorking')
export class EmployeeWorking extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contractRegime_id: string;

  @Column()
  employeeType_id: string;

  @Column()
  companyEconomicActivityRisk_id: string;

  @Column()
  workingHour_id: string;

  @Column()
  transportAssistance: boolean;

  @Column()
  variableSalary: boolean;

  @Column()
  isActive: boolean;

  @Column()
  vacationHistory: number;

  @OneToOne(() => Employee, (employee) => employee.working)
  @JoinColumn({ name: 'id' })
  employee: Employee;

  @ManyToOne(() => ContractRegime)
  @JoinColumn({ name: 'contractRegime_id' })
  contractRegime: ContractRegime;

  @ManyToOne(() => EmployeeType)
  @JoinColumn({ name: 'employeeType_id' })
  employeeType: EmployeeType;

  @ManyToOne(() => CompanyEconomicActivityRisk)
  @JoinColumn({ name: 'companyEconomicActivityRisk_id' })
  companyEconomicActivityRisk: CompanyEconomicActivityRisk;
}
