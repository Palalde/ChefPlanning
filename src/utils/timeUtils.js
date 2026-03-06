/**
 * Convertit des minutes totales en heures et minutes
 * @param {number} totalMinutes - Minutes totales (ex: 2145)
 * @returns {{ hours: number, minutes: number }} - Objet { hours: 35, minutes: 45 }
 */
export function minutesToHoursMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

/**
 * Convertit des heures et minutes en minutes totales
 * @param {number} hours - Heures (ex: 35)
 * @param {number} minutes - Minutes (ex: 45)
 * @returns {number} - Minutes totales (ex: 2145)
 */
export function hoursMinutesToMinutes(hours, minutes) {
  return hours * 60 + minutes;
}

/**
 * Formate des minutes totales en string lisible "35h45" ou "35h"
 * @param {number} totalMinutes - Minutes totales (ex: 2145)
 * @returns {string} - Format "35h45" ou "35h" (si minutes = 0)
 */
export function formatMinutesToDisplay(totalMinutes) {
  const { hours, minutes } = minutesToHoursMinutes(totalMinutes);
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h${minutes.toString().padStart(2, "0")}`;
}

/**
 * Convertit un horaire "HH:MM" en minutes depuis minuit
 * @param {string} time - Horaire au format "HH:MM" (ex: "09:00")
 * @returns {number} - Minutes depuis minuit (ex: 540)
 */
export function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

const NOON = 12 * 60; // midi en minutes = 720

/**
 * Calcule les heures totales, matin et après-midi pour un employé donné
 * @param {string} employeeId - ID de l'employé
 * @param {Array} assignments - Liste des assignations { employeeId, shiftId }
 * @param {Array} shifts - Liste des shifts { id, startTime, endTime, type, breakStart?, breakEnd? }
 * @returns {{ total: number, am: number, pm: number }} - Heures totales, matin et après-midi en minutes
 */

export function getEmployeeHours(employeeId, assignments, shifts) {
  // Filtrer les assignations de cet employé
  const employeeAssignments = assignments.filter(
    (a) => a.employeeId === employeeId,
  );

  // total heures + matin et aprem {total, am, pm}
  return employeeAssignments.reduce(
    (acc, assignment) => {
      const shift = shifts.find((s) => assignment.shiftId === s.id);
      if (!shift) return acc;

      const start = timeToMinutes(shift.startTime);
      const end = timeToMinutes(shift.endTime);

      // Répartition AM / PM basée sur le type du shift
      if (shift.type === "am") {
        // Shift matin → tout en AM
        const totalMinutes = end - start;
        acc.total += totalMinutes;
        acc.am += totalMinutes;
      } else if (shift.type === "pm") {
        // Shift après-midi → tout en PM
        const totalMinutes = end - start;
        acc.total += totalMinutes;
        acc.pm += totalMinutes;
      } else if (shift.type === "full") {
        // Shift journée → splitter sur midi
        const totalMinutes = end - start;
        acc.total += totalMinutes;
        acc.am += NOON - start;
        acc.pm += end - NOON;
      } else if (shift.type === "split") {
        // Shift coupé → AM = start→breakStart, PM = breakEnd→end
        const breakStart = timeToMinutes(shift.breakStart);
        const breakEnd = timeToMinutes(shift.breakEnd);
        const amMinutes = breakStart - start;
        const pmMinutes = end - breakEnd;
        acc.total += amMinutes + pmMinutes;
        acc.am += amMinutes;
        acc.pm += pmMinutes;
      }

      return acc;
    },
    { total: 0, am: 0, pm: 0 },
  );
}
