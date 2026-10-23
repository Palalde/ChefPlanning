import { useState, useCallback } from "react";
import type { ISODateString } from "@/types";
import { getMondayISO, addWeeks } from "@/utils";

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
