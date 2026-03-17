import { Assignment, HoursSummary, Shift } from "@/types";
import { calcShiftAmPm } from "@/utils";

/**
 *
 * @param assignments use shiftsId assigned to the employee
 * @param shifts all available shifts to get the details of the assigned shifts
 * @returns summary of hours worked by the employee
 */
export function getEmployeeHours(
  assignments: Assignment[],
  shifts: Shift[],
): HoursSummary {
  const shiftMap = new Map(shifts.map((s) => [s.id, s]));
  const result: HoursSummary = { total: 0, am: 0, pm: 0 };

  for (const { shiftId } of assignments) {
    const shift = shiftMap.get(shiftId);
    if (shift) {
      const shiftHours = calcShiftAmPm(shift);
      result.total += shiftHours.total;
      result.am += shiftHours.am;
      result.pm += shiftHours.pm;
    }
  }

  return result;
}
