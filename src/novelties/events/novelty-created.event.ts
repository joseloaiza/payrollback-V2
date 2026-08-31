export class NoveltyCreatedEvent {
  constructor(
    public readonly employeeId: string,
    public readonly companyId: string,
  ) {}
}
