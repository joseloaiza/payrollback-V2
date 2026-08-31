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
import { CostCenter } from 'src/cost-centers/entities/costCenter.entity';
import { Area } from './area.entity';
import { Subsidiary } from 'src/companies/entities/subsidiary.entity';
import { Position } from 'src/companies/entities/position.entity';

@Entity('employeeJob')
export class EmployeeJob extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Employee, (employee) => employee.job) // Define inverse relation
  @JoinColumn({ name: 'id' }) // Foreign key column
  employee: Employee;

  @ManyToOne(() => CostCenter) // Define inverse relation
  @JoinColumn({ name: 'costCenter_id' }) // Foreign key column
  costCenter: CostCenter;

  @ManyToOne(() => Area) // Define inverse relation
  @JoinColumn({ name: 'area_id' }) // Foreign key column
  area: Area;

  @ManyToOne(() => Subsidiary) // Define inverse relation
  @JoinColumn({ name: 'subsidiary_id' }) // Foreign key column
  subsidiary: Subsidiary;

  @ManyToOne(() => Position) // Define inverse relation
  @JoinColumn({ name: 'position_id' }) // Foreign key column
  position: Position;

  @Column()
  costCenter_id: string;

  @Column({ nullable: true })
  area_id?: string;

  @Column({ nullable: true })
  subsidiary_id?: string;

  @Column()
  position_id: string;

  @Column()
  isActive: boolean;
}
