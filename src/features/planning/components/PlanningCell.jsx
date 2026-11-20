// 🎯 Task 9.1.3 : PlanningCell — Cellule individuelle AM ou PM
// 🎨 Styling Tailwind = Mentor | ⚛️ Câblage dans EmployeeRow = Paul

import { SHIFT_TYPE_CONFIG } from "@/constants";

// Full description of a shift (screen readers): name and hours, both ranges if split
function describeShift(shift) {
  return shift.type === "split"
    ? `${shift.name}, matin ${shift.startTime}-${shift.breakStart}, après-midi ${shift.breakEnd}-${shift.endTime}`
    : `${shift.name}, ${shift.startTime}-${shift.endTime}`;
}

// Text displayed in a cell: a full/split shift is shown half per row (AM/PM)
function getCellLabel(shift, isAM) {
  if (!shift) return "";

  if (shift.type === "full") {
    return isAM ? shift.startTime : shift.endTime;
  }

  if (shift.type === "split") {
    return isAM
      ? `${shift.startTime} - ${shift.breakStart}`
      : `${shift.breakEnd} - ${shift.endTime}`;
  }

  return `${shift.startTime} - ${shift.endTime}`;
}

// Whole cell (44px high) is the touch target; the visual block sits inside with a small inset
const cellButtonClass =
  "group block h-11 w-full cursor-pointer rounded p-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent";

function PlanningCell({ assignment, shift, period, onClick, cellContext }) {
  // Cellule vide → zone cliquable, « + » discret toujours visible
  if (!assignment) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cellButtonClass}
        aria-label={`${cellContext}, shift: vide`}
      >
        <span
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center rounded text-lg text-text-muted/50 transition-colors group-hover:bg-bg-secondary group-hover:text-text-secondary"
        >
          +
        </span>
      </button>
    );
  }

  // Cellule occupée → afficher le shift
  // Gestion visuelle des shifts multi-ligne (journée et coupé) qui couvrent AM + PM
  const isMultiLine = shift?.type === "full" || shift?.type === "split";
  const isAM = period === "am";

  // Journée/Coupé : AM = coin haut arrondi, PM = coin bas arrondi, pas de séparation
  const multiLineClasses = isMultiLine
    ? isAM
      ? "rounded-t rounded-b-none border-b-0"
      : "rounded-b rounded-t-none border-t-0"
    : "rounded";

  // Couleur dérivée du type (plus de colorClass stockée)
  const colorClass = SHIFT_TYPE_CONFIG[shift?.type].colorClass;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cellButtonClass}
      aria-label={`${cellContext}, shift: ${describeShift(shift)}`}
    >
      <span
        className={`flex h-full w-full items-center justify-center border ${multiLineClasses} ${colorClass}
          transition-all duration-200 group-hover:shadow-md group-hover:brightness-95 group-active:scale-[0.97]`}
      >
        <span className="text-xs font-medium text-text-primary truncate px-1">
          {getCellLabel(shift, isAM)}
        </span>
      </span>
    </button>
  );
}

export default PlanningCell;
