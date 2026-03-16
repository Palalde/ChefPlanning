import { Shift, ShiftType, ShiftTypeConfig } from "@/types";

// --- Shift Type Config (UI: label, emoji, order, colorClass) ---

export const SHIFT_TYPE_CONFIG: Record<ShiftType, ShiftTypeConfig> = {
  am: {
    label: "Matin",
    emoji: "☀️",
    order: 0,
    colorClass: "bg-shift-matin border-shift-matin-border",
  },
  pm: {
    label: "Après-midi",
    emoji: "🌙",
    order: 1,
    colorClass: "bg-shift-aprem border-shift-aprem-border",
  },
  full: {
    label: "Journée",
    emoji: "📅",
    order: 2,
    colorClass: "bg-shift-journee border-shift-journee-border",
  },
  split: {
    label: "Coupé",
    emoji: "✂️",
    order: 3,
    colorClass: "bg-shift-coupe border-shift-coupe-border",
  },
};

// --- Default Shifts ---
// hours et colorClass sont dérivés (calculés à la volée via utils)
// breakStart/breakEnd uniquement si type === "split"
export const DEFAULT_SHIFTS: Shift[] = [
  {
    id: "matin",
    name: "Matin",
    type: "am",
    startTime: "07:00",
    endTime: "13:30",
  },
  {
    id: "aprem",
    name: "Après-midi",
    type: "pm",
    startTime: "13:30",
    endTime: "20:00",
  },
  {
    id: "journee",
    name: "Journée",
    type: "full",
    startTime: "09:00",
    endTime: "18:00",
  },
  {
    id: "coupe",
    name: "Coupé",
    type: "split",
    startTime: "09:00",
    endTime: "19:00",
    breakStart: "12:00",
    breakEnd: "14:00",
  },
];
