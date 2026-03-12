import { Shift, ShiftType } from "@/types";
import { timeToMinutes } from "./timeUtils";

// --- Types locaux ---

type ShiftMeta = {
  label: string;
  emoji: string;
  order: number;
};

type ShiftGroup = ShiftMeta & {
  type: ShiftType;
  shifts: Shift[];
};

// --- Constantes ---

const SHIFT_COLOR_MAP: Record<ShiftType, string> = {
  am: "bg-shift-matin border-shift-matin-border",
  pm: "bg-shift-aprem border-shift-aprem-border",
  full: "bg-shift-journee border-shift-journee-border",
  split: "bg-shift-coupe border-shift-coupe-border",
};

const SHIFT_TYPE_META: Record<ShiftType, ShiftMeta> = {
  am: { label: "Matin", emoji: "☀️", order: 0 },
  pm: { label: "Après-midi", emoji: "🌙", order: 1 },
  full: { label: "Journée", emoji: "📅", order: 2 },
  split: { label: "Coupé", emoji: "✂️", order: 3 },
};

// --- Fonctions ---

// Retourne la classe de couleur Tailwind pour un type de shift donné
export function getShiftColorClass(type: ShiftType): string {
  return SHIFT_COLOR_MAP[type];
}

// Groupe les shifts par type et les trie par startTime
export function groupShiftsByType(shifts: Shift[]): ShiftGroup[] {
  const groups = new Map<ShiftType, ShiftGroup>();

  for (const shift of shifts) {
    const existingGroup = groups.get(shift.type);

    if (existingGroup) {
      existingGroup.shifts.push(shift);
      continue;
    }

    groups.set(shift.type, {
      type: shift.type,
      ...SHIFT_TYPE_META[shift.type], //label, emoji, order
      shifts: [shift],
    });
  }

  // sort groups by type order
  const sortedGroups = Array.from(groups.values()).sort(
    (a, b) => a.order - b.order,
  );

  // sort shifts in each group by startTime
  return sortedGroups.map((group) => ({
    // spread all
    ...group,
    //  then sort shifts by startTime
    shifts: [...group.shifts].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  }));
}

// Calcule la durée totale d'un shift en minutes (soustrait la pause si split)
export function calcShiftMinutes(shift: Shift): number {
  const start = timeToMinutes(shift.startTime);
  const end = timeToMinutes(shift.endTime);
  let total = end - start;

  // Soustraire la pause pour les shifts coupés
  if (shift.type === "split") {
    const breakStartMn = timeToMinutes(shift.breakStart);
    const breakEndMn = timeToMinutes(shift.breakEnd);
    total -= breakEndMn - breakStartMn;
  }

  return total;
}
