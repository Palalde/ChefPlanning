import { Shift, Assignment } from "@/types";

//Convertit des minutes totales en heures et minutes
export function minutesToHoursMinutes(totalMinutes: number): {
  hours: number;
  minutes: number;
} {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

// Convertit des heures et minutes en minutes totales
export function hoursMinutesToMinutes(hours: number, minutes: number): number {
  return hours * 60 + minutes;
}

// Formate des minutes totales en string lisible "35h45" ou "35h"
export function formatMinutesToDisplay(totalMinutes: number): string {
  const { hours, minutes } = minutesToHoursMinutes(totalMinutes);
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h${minutes.toString().padStart(2, "0")}`;
}

//Convertit un horaire "HH:MM" en minutes depuis minuit
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

const NOON = 12 * 60; // midi en minutes = 720

// Calcule les heures totales, matin et après-midi pour un employé donné
export function getEmployeeHours(
  employeeId: string,
  assignments: Assignment[],
  shifts: Shift[],
): { total: number; am: number; pm: number } {
  // variables
  const shiftMap = new Map(shifts.map((s) => [s.id, s]));
  const result = { total: 0, am: 0, pm: 0 };

  // Parcours des affectations de l'employé
  for (const { employeeId: eid, shiftId } of assignments) {
    // guard
    if (eid !== employeeId) continue;

    // récupère le shift
    const shift = shiftMap.get(shiftId);
    if (!shift) continue;

    // calcul des minutes pour ce shift
    const start = timeToMinutes(shift.startTime);
    const end = timeToMinutes(shift.endTime);

    // acc
    let am = 0;
    let pm = 0;

    // calcul en fonction du type de shift
    if (shift.type === "am") {
      am = end - start;
    } else if (shift.type === "pm") {
      pm = end - start;
    } else if (shift.type === "full") {
      // calcul en tenant compte du midi
      am = NOON - start;
      pm = end - NOON;
    } else if (shift.type === "split") {
      // calcul en tenant compte de la pause
      am = timeToMinutes(shift.breakStart) - start;
      pm = end - timeToMinutes(shift.breakEnd);
    }

    // accumulation des résultats
    result.total += am + pm;
    result.am += am;
    result.pm += pm;
  }

  return result;
}
