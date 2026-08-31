export class AbsenteeCreatedEvent {
  constructor(
    public readonly employeeId: string,
    public readonly companyId: string,
  ) {}
}
