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

function PlanningCell({ assignment, shift, period, onClick, cellContext }) {
  // Cellule vide → zone cliquable
  if (!assignment) {
    return (
      <div
        onClick={onClick}
        className="w-full h-full min-h-9 rounded cursor-pointer
          hover:bg-bg-secondary/50 transition-colors
          flex items-center justify-center"
        role="button"
        tabIndex={0}
        aria-label={`${cellContext}, shift: vide`}
        onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      >
        <span className="text-text-muted/0 hover:text-text-muted/40 text-lg transition-colors">
          +
        </span>
      </div>
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
    <div
      onClick={onClick}
      className={`w-full h-full min-h-9 ${multiLineClasses} border cursor-pointer
        ${colorClass}
        hover:shadow-md hover:brightness-95 active:scale-[0.97]
        transition-all duration-200
        flex items-center justify-center`}
      role="button"
      tabIndex={0}
      aria-label={`${cellContext}, shift: ${describeShift(shift)}`}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <span className="text-xs font-medium text-text-primary truncate px-1">
        {getCellLabel(shift, isAM)}
      </span>
    </div>
  );
}

export default PlanningCell;
