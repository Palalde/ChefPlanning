import { useState, useCallback } from "react";
import type { ISODateString } from "@/types";

// format a Date object as a local ISO date string (YYYY-MM-DD)
function formatLocalIso(date: Date): ISODateString {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}` as ISODateString;
}

// calculate the ISO string of the Monday of the week for a given date
function getMondayISO(date: Date): ISODateString {
  const dayOfWeek = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  return formatLocalIso(monday);
}

// parse a local ISO date string (YYYY-MM-DD) into a Date object
function parseLocalIso(isoString: ISODateString): Date {
  const [year, month, day] = isoString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// add a number of weeks to an ISO date string and return the new ISO date string
function addWeeks(isoString: ISODateString, weeks: number): ISODateString {
  const date = parseLocalIso(isoString);
  date.setDate(date.getDate() + weeks * 7);
  return formatLocalIso(date);
}

/**
 * Custom hook to manage week navigation
 * @returns { currentWeek, goNext, goPrev, goToday }
 * - currentWeek: ISO string of the Monday of the current week
 * - goNext: function to go to the next week
 * - goPrev: function to go to the previous week
 * - goToday: function to go to the current week
 */

export default function useWeekNav() {
  const [currentWeek, setCurrentWeek] = useState<ISODateString>(
    getMondayISO(new Date()),
  );

  const goNext = useCallback(() => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentWeek((prev) => addWeeks(prev, -1));
  }, []);

  const goToday = useCallback(() => {
    setCurrentWeek(getMondayISO(new Date()));
  }, []);

  return { currentWeek, goNext, goPrev, goToday };
}
