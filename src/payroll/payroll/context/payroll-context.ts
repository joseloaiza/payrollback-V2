import { Movement } from 'src/movement/entities/movement.entity';
import { Period } from 'src/payroll/entities/period.entity';

// src/payroll/context/payroll-context.ts
export class PayrollCalculationContext {
  private _movementBuffer: Movement[] = [];

  constructor(
    public readonly employeeId: string,
    public readonly companyId: string,
    public readonly period: Period,
  ) {}

  get movements(): Readonly<Movement[]> {
    return this._movementBuffer;
  }

  addMovement(movement: Movement): void {
    this._movementBuffer.push(movement);
  }

  addMovements(movements: Movement[]): void {
    this._movementBuffer.push(...movements);
  }

  clearMovements(): void {
    this._movementBuffer.length = 0;
  }
}
