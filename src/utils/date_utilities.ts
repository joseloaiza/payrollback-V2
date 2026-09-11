import {
  addDays,
  differenceInDays,
  getDay,
  getYear,
  isBefore,
  isEqual,
} from 'date-fns';
import { ValueTransformer } from 'typeorm';

export function numberDays(startDate: Date, endDate: Date) {
  return differenceInDays(endDate, startDate) + 1;
}

export function isSameOrBefore(date1: Date, date2: Date): boolean {
  return isBefore(date1, date2) || isEqual(date1, date2);
}

export const dateTransformer: ValueTransformer = {
  to: (value: Date) => value, // lo guarda como está
  from: (value: string | Date) => new Date(value), // lo transforma al leer
};

export const nullableDateTransformer: ValueTransformer = {
  to: (value: Date | null) => (value ? value : null), // when saving
  from: (value: string | Date | null) => (value ? new Date(value) : null), // when reading
};

// ---------------------------------------------------------------------------
// Festivos colombianos (Ley 51 de 1983 - "Ley Emiliani" + Semana Santa)
// ---------------------------------------------------------------------------

/**
 * Calcula el Domingo de Pascua para un año dado.
 * Algoritmo de Meeus/Jones/Butcher.
 */
function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 1-based
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/**
 * Aplica la Ley Emiliani: si la fecha no cae en lunes (getDay !== 1),
 * la mueve al próximo lunes.
 */
function applyLeyEmiliani(date: Date): Date {
  const dow = getDay(date); // 0=dom, 1=lun, ..., 6=sáb
  if (dow === 1) return date;
  const daysUntilMonday = dow === 0 ? 1 : 8 - dow;
  return addDays(date, daysUntilMonday);
}

/**
 * Retorna los 18 festivos colombianos de un año dado.
 */
function getColombiaHolidays(year: number): Date[] {
  const easter = getEasterSunday(year);

  const fixed = [
    new Date(year, 0, 1), // 1 ene - Año Nuevo
    new Date(year, 4, 1), // 1 may - Día del Trabajo
    new Date(year, 6, 20), // 20 jul - Día de la Independencia
    new Date(year, 7, 7), // 7 ago - Batalla de Boyacá
    new Date(year, 11, 8), // 8 dic - Inmaculada Concepción
    new Date(year, 11, 25), // 25 dic - Navidad
  ];

  const emiliani = [
    new Date(year, 0, 6), // 6 ene  - Reyes Magos
    new Date(year, 2, 19), // 19 mar - San José
    new Date(year, 5, 29), // 29 jun - San Pedro y San Pablo
    new Date(year, 7, 15), // 15 ago - Asunción de la Virgen
    new Date(year, 9, 12), // 12 oct - Día de la Raza
    new Date(year, 10, 1), // 1 nov  - Todos los Santos
    new Date(year, 10, 11), // 11 nov - Independencia de Cartagena
  ].map(applyLeyEmiliani);

  const easterBased = [
    addDays(easter, -3), // Jueves Santo
    addDays(easter, -2), // Viernes Santo
    applyLeyEmiliani(addDays(easter, 39)), // Ascensión del Señor
    applyLeyEmiliani(addDays(easter, 60)), // Corpus Christi
    applyLeyEmiliani(addDays(easter, 68)), // Sagrado Corazón de Jesús
  ];

  return [...fixed, ...emiliani, ...easterBased];
}

/**
 * Retorna el número de festivos colombianos dentro del rango [startDate, endDate] inclusivo.
 */
function getColombiaHolidaysInRange(startDate: Date, endDate: Date): number {
  const startYear = getYear(startDate);
  const endYear = getYear(endDate);

  const holidays: Date[] = [];
  for (let y = startYear; y <= endYear; y++) {
    holidays.push(...getColombiaHolidays(y));
  }

  return holidays.filter((h) => {
    const hTime = h.getTime();
    return hTime >= startDate.getTime() && hTime <= endDate.getTime();
  }).length;
}

/**
 * Retorna el número de festivos dentro de un rango de fechas para un país dado.
 * Actualmente soporta Colombia ('CO'). Extensible a otros países.
 */
export function getHolidaysInRange(
  startDate: Date,
  endDate: Date,
  countryCode: string,
): number {
  if (countryCode === 'CO') {
    return getColombiaHolidaysInRange(startDate, endDate);
  }
  return 0;
}

/**
 * Verifica si una fecha es festivo en Colombia.
 */
export function isColombiaHoliday(date: Date): boolean {
  const year = getYear(date);
  const holidays = getColombiaHolidays(year);
  const dateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  return holidays.some((h) => h.getTime() === dateTime);
}

export function convertDateToUTC(stringDate: string): Date {
  const [year, month, day] = stringDate.split('T')[0].split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)); // UTC noon
  // const [year, month, day] = stringDate.split('T')[0].split('-').map(Number);
  // return new Date(year, month - 1, day); // local midnight, date won't shift
}

export function differenceInDays360(startDate: Date, endDate: Date): number {
  const y1 = startDate.getUTCFullYear();
  const m1 = startDate.getUTCMonth() + 1;
  const d1 = normalizeDay(startDate);

  const y2 = endDate.getUTCFullYear();
  const m2 = endDate.getUTCMonth() + 1;
  const d2 = normalizeDay(endDate);

  return (y2 - y1) * 360 + (m2 - m1) * 30 + (d2 - d1) + 1; // +1 inclusive
}

function normalizeDay(date: Date): number {
  const day = date.getUTCDate();
  const lastDayOfMonth = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();

  return day === lastDayOfMonth ? 30 : day;
}
