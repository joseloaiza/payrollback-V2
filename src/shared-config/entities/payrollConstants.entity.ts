import { IsNumber, Min } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

// La PK real de esta tabla es un código corto (ej. "SMLV", "UVT"), no un UUID
// generado — confirmado contra el esquema real (`id character varying(5)`).
// No extiende AbstractEntity: sus columnas createdAt/updatedAt son `date`
// (nullable, sin default) en la BD real, no `timestamp` como genera
// @CreateDateColumn/@UpdateDateColumn, y no se gestionan por ORM hoy.
@Entity('payrollConstants')
export class PayrollConstants {
  @PrimaryColumn({ length: 5 })
  id: string;

  @Column({ length: 50 })
  description: string;

  @Column({
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: false,
  })
  @IsNumber()
  @Min(0) // Ensures the value is not negative
  value: number;

  @Column({ type: 'date', nullable: true })
  initialDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column()
  isActive: boolean;

  @Column({ length: 20 })
  type: string;
}
