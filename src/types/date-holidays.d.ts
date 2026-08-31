declare module 'date-holidays' {
  class Holidays {
    constructor(country?: string, state?: string, region?: string);
    isHoliday(date: Date): boolean | object[];
    getHolidays(year?: number, country?: string): object[];
    init(country?: string, state?: string, region?: string): void;
  }
  export = Holidays; // 👈 cambiar export default por export =
}
