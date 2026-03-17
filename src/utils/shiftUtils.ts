import { Shift, ShiftType, ShiftTypeConfig, HoursSummary } from "@/types";
import { SHIFT_TYPE_CONFIG } from "@/constants/shifts";
import { timeToMinutes } from "./timeUtils";

// --- Local Types ---

type ShiftGroup = ShiftTypeConfig & {
  type: ShiftType;
  shifts: Shift[];
};

// --- Functions ---

// --- Helpers for groupShiftsByType ---

/** Groups shifts, attaching config (label, emoji, order, colorClass) */
function buildShiftGroups(shifts: Shift[]): ShiftGroup[] {
  const groups = new Map<ShiftType, ShiftGroup>();

  for (const shift of shifts) {
    const existingGroup = groups.get(shift.type);

    if (existingGroup) {
      existingGroup.shifts.push(shift);
      continue;
    }

    groups.set(shift.type, {
      type: shift.type,
      ...SHIFT_TYPE_CONFIG[shift.type],
      shifts: [shift],
    });
  }

  return Array.from(groups.values());
}

/** sort shifts first by type order, then by start time */
function sortGroups(groups: ShiftGroup[]): ShiftGroup[] {
  // first Sort groups by their type order
  const sortedByType = groups.toSorted((a, b) => a.order - b.order);

  // then Sort shifts within each group by start time
  const sortedShifts = sortedByType.map((group) => ({
    ...group,
    shifts: [...group.shifts].sort(
      (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
    ),
  }));

  return sortedShifts;
}

// --- Main Exported Function ---

/**
 * @param shifts list of shifts to group
 * @returns shift groups with shifts sorted by type order and start time with meta (label, emoji)
 */
export function groupShiftsByType(shifts: Shift[]): ShiftGroup[] {
  const groups = buildShiftGroups(shifts);

  return sortGroups(groups);
}

/**
 * @param shift start and end times, and break times if split
 * @returns minutes of the shift, split between am and pm
 */
export function calcShiftAmPm(shift: Shift): HoursSummary {
  const start = timeToMinutes(shift.startTime);
  const end = timeToMinutes(shift.endTime);
  const NOON = 12 * 60;

  let am = 0;
  let pm = 0;

  if (shift.type === "am") {
    am = end - start;
  } else if (shift.type === "pm") {
    pm = end - start;
  } else if (shift.type === "full") {
    am = NOON - start;
    pm = end - NOON;
  } else if (shift.type === "split") {
    am = timeToMinutes(shift.breakStart) - start;
    pm = end - timeToMinutes(shift.breakEnd);
  }

  return { total: am + pm, am, pm };
}

/** get CSS class for a shift type */
export function getShiftColorClass(type: ShiftType): string {
  return SHIFT_TYPE_CONFIG[type].colorClass;
}
