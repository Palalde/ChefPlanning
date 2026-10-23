import type { ISODateString } from "@/types";

// format a Date object as a local ISO date string (YYYY-MM-DD)
export function formatLocalIso(date: Date): ISODateString {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}` as ISODateString;
}

// calculate the ISO string of the Monday of the week for a given date
export function getMondayISO(date: Date): ISODateString {
  const dayOfWeek = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  return formatLocalIso(monday);
}

// parse a local ISO date string (YYYY-MM-DD) into a Date object
export function parseLocalIso(isoString: ISODateString): Date {
  const [year, month, day] = isoString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// add a number of days to an ISO date string and return the new ISO date string
export function addDays(iso: ISODateString, days: number): ISODateString {
  const date = parseLocalIso(iso);
  date.setDate(date.getDate() + days);
  return formatLocalIso(date);
}

// add a number of weeks to an ISO date string and return the new ISO date string
export function addWeeks(
  isoString: ISODateString,
  weeks: number,
): ISODateString {
  return addDays(isoString, weeks * 7);
}

// check if an ISO date string represents today's date
export function isToday(iso: ISODateString): boolean {
  const today = formatLocalIso(new Date());
  return iso === today;
}

// check if an ISO date string represents a past date
export function isPast(iso: ISODateString): boolean {
  const today = formatLocalIso(new Date());
  return iso < today;
}
