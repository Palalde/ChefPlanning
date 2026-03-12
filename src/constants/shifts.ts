import { Shift } from "@/types";
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
