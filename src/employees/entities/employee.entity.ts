import { AbstractEntity } from './../../database/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Gender } from './gender.entity';
import { City } from 'src/shared/entities/city.entity';
import { State } from 'src/shared/entities/state.entity';
import { Country } from 'src/shared/entities/country.entity';
import { IdentificationType } from './identificationType.entity';
import { EmployeeJob } from './employee-job.entity';
import { EmployeePayment } from './employee-payment.entity';
import { EmployeeSocialSecurity } from './employee-social-security.entity';
import { EmployeeWorking } from './employee-working.entity';
import { EmployeeSalary } from './employee-salary.entity';
import { EmployeeContract } from './employee-contract.entity';
import { Movement } from 'src/movement/entities/movement.entity';
@Entity('employee')
export class Employee extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_id: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  identificationType_id: string;

  @ManyToOne(() => IdentificationType)
  @JoinColumn({ name: 'identificationType_id' })
  identificationType: IdentificationType;

  @Column({ length: 50 })
  identification: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ nullable: true, length: 50 })
  secondName?: string;

  @Column({ length: 50 })
  surname: string;

  @Column({ nullable: true, length: 50 })
  secondSurName?: string;

  @Column({ nullable: true })
  birthDate?: Date;

  @Column()
  gender_id?: string;

  @ManyToOne(() => Gender)
  @JoinColumn({ name: 'gender_id' })
  gender?: Gender;

  @Column()
  city_id?: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city?: City;

  @Column()
  state_id?: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state?: State;

  @Column()
  country_id?: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  @Column({ nullable: true, length: 50 })
  address?: string;

  @Column({ nullable: true, length: 50 })
  phone?: string;

  @Column({ nullable: true, length: 50 })
  cellPhone?: string;

  @Column({ nullable: true, length: 150 })
  img?: string;

  @Column({ nullable: true, length: 100 })
  email?: string;

  @Column()
  isActive: boolean;

  @OneToOne(() => EmployeeJob, (job) => job.employee, { cascade: true })
  job: EmployeeJob;

  @OneToOne(() => EmployeePayment, (payment) => payment.employee, {
    cascade: true,
  })
  payment: EmployeePayment;

  @OneToOne(
    () => EmployeeSocialSecurity,
    (socialSecurity) => socialSecurity.employee,
    {
      cascade: true,
    },
  )
  socialSecurity: EmployeeSocialSecurity;

  @OneToOne(() => EmployeeWorking, (working) => working.employee, {
    cascade: true,
  })
  working: EmployeeWorking;

  @OneToMany(() => EmployeeSalary, (salary) => salary.employee, {
    cascade: true,
  })
  salaries: EmployeeSalary[];

  @OneToMany(() => EmployeeContract, (contract) => contract.employee, {
    cascade: true,
  })
  contracts: EmployeeContract[];

  @OneToMany(() => Movement, (movement) => movement.employee)
  movements: EmployeeContract[];
}
