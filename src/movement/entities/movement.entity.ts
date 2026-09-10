import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Concept } from 'src/concepts/concept.entity';
import { Period } from 'src/period/entities/period.entity';
import { Liquidation } from 'src/liquidation/entities/liquidation.entity';

@Entity('movement')
export class Movement extends AbstractEntity {
  @Column()
  employee_id: string;

  @Column()
  period_id: string;

  @Column()
  concept_id: string;

  @Column({ nullable: true })
  quantity?: number;

  @Column({ nullable: true })
  value?: number;

  @Column({ nullable: true })
  year?: number;

  @Column({ nullable: true })
  month?: number;

  @Column({ nullable: true })
  company_id?: string;

  // movement.entity.ts (agregar estos campos)
  @Column({ nullable: true })
  liquidation_id: string;

  @ManyToOne(() => Liquidation)
  @JoinColumn({ name: 'liquidation_id' })
  liquidation: Liquidation;

  /** ✅ Establish relationship with `Concept` entity */
  @ManyToOne(() => Concept)
  @JoinColumn({ name: 'concept_id' }) // ✅ Links `concept_id` column
  concept?: Concept;

  @ManyToOne(() => Period)
  @JoinColumn({ name: 'period_id' }) // ✅ Links `period_id` column
  period?: Period;

  @ManyToOne(() => Employee, (employee) => employee.movements)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
