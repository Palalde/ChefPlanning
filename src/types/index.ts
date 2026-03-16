// --- Employee ---
export type Employee = {
  id: string; // "emp_mock_1"
  name: string; // "Donal Trump"
  color: string; // "#3B82F6"
  weeklyMinutes: number; // 2160
  skills: string[]; // ["balance", "rayonnage"]
};

// --- Shift ---
export type ShiftType = "am" | "pm" | "full" | "split";

export type ShiftTypeConfig = {
  label: string;
  emoji: string;
  order: number;
  colorClass: string;
};

type BaseShift = {
  id: string; // "matin"
  name: string; // "Matin"
  startTime: string; // "07:00"
  endTime: string; // "13:00"
};

export type Shift =
  | (BaseShift & {
      type: Exclude<ShiftType, "split">; // "am" | "pm" | "full"
    })
  | (BaseShift & {
      type: "split";
      breakStart: string; // "12:00"
      breakEnd: string; // "14:00"
    });

// --- Assignment ---

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Assignment = {
  id: string; // "assignment_mock_1"
  employeeId: string; // "emp_mock_1"
  day: DayOfWeek;

  shiftId: string; // "matin"
  weekOf: `${number}-${number}-${number}`; // "2024-06-17"
};
