import { AbstractEntity } from './../../database/abstract.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { ReasonContractTermination } from 'src/shared/entities/reasonContractTerminination.entity';
// liquidation.entity.ts
//
// Unificada contra el esquema real (`\d liquidation`): payrollback no
// declaraba employee_id/company_id/period_id (NOT NULL en la BD real, sin
// default — un insert vía la versión anterior habría violado esas
// constraints) y declaraba termination_date como `date` nullable cuando la
// columna real es `timestamp without time zone NOT NULL`. payroll-worker sí
// tenía esas columnas correctas pero le faltaba la relación a
// ReasonContractTermination que sí tenía payrollback — se conserva aquí.
@Entity('liquidation')
export class Liquidation extends AbstractEntity {
  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  period_id: string;

  @Column({ type: 'timestamp' })
  termination_date: Date;

  @Column({ type: 'uuid', nullable: true })
  cause_liquidation_id?: string;

  @Column({ nullable: true, length: 50 })
  type?: string;

  @ManyToOne(() => ReasonContractTermination)
  @JoinColumn({ name: 'cause_liquidation_id' })
  reasonContractTermination: ReasonContractTermination;
}
