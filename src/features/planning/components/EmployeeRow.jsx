// 🎯 Task 9.1.2 : EmployeeRow — Ligne employé avec sous-lignes AM/PM
// 🎨 Styling Tailwind = Mentor | ⚛️ Logique React = Paul

import { DAYS_OF_WEEK, SHIFT_TYPE_CONFIG } from "@/constants";
import { getEmployeeHours, getFirstName } from "@/features/employees";
import { formatMinutesToDisplay, parseLocalIso } from "@/utils";
import PlanningCell from "./PlanningCell";
import { useAppContext } from "@/context/AppContext";

function EmployeeRow({ employee, onCellClick, setIsShiftModOpen, weekDates }) {
  // context
  const { assignments, addAssignment, shifts } = useAppContext();
  // assignations de l'employé
  const employeeAssignments = assignments.filter(
    (a) => a.employeeId === employee.id,
  );
  // Calcul des heures (total, AM, PM) via utilitaire centralisé
  const { total: totalMinutes } = getEmployeeHours(
    employeeAssignments,
    shifts,
  );
  const isOvertime = totalMinutes > employee.weeklyMinutes;
  // Types de shifts qui occupent AM + PM (apparaissent sur les deux lignes)
  const multiLineTypes = ["full", "split"];

  //fonction pour les cellules aprem ou matin
  const renderDayCells = (period) => {
    // parcourir les jours de la semaine pour cette ligne (AM ou PM)
    return DAYS_OF_WEEK.map((day, index) => {
      // start of the aria-label ("Marie, mardi 13, matin"); the cell adds its state
      const dayNumber = parseLocalIso(weekDates[index]).getDate();
      const periodLabel = SHIFT_TYPE_CONFIG[period].label.toLowerCase();
      const cellContext = `${employee.name}, ${day.name.toLowerCase()} ${dayNumber}, ${periodLabel}`;
      // assignation pour ce jour + period
      // On matche les shifts du même type que la period (am/pm)
      // + les shifts multi-ligne (full/split) qui occupent AM et PM
      const dailyAssignment = assignments.find((a) => {
        if (a.employeeId !== employee.id || a.day !== day.id) return false;
        const assignedShift = shifts.find((s) => s.id === a.shiftId);
        if (!assignedShift) return false;
        return (
          assignedShift.type === period ||
          multiLineTypes.includes(assignedShift.type)
        );
      });

      // trouver le shift correspondant pour accéder à ses infos (ex: couleur)
      const shift = shifts.find((s) => s.id === dailyAssignment?.shiftId);

      // retourner la cellule du planning pour ce jour + shift
      return (
        <td
          key={`${employee.id}-${day.id}-${period}`}
          className="border-r border-border/50 last:border-r-0 p-0 h-11 align-middle"
        >
          <PlanningCell
            assignment={dailyAssignment}
            shift={shift}
            period={period}
            cellContext={cellContext}
            onClick={() => {
              if (!dailyAssignment) {
                // ajouter un assignment si case vide (guard: shift doit exister)
                const defaultShift = shifts.find((s) => s.type === period);
                if (defaultShift) {
                  addAssignment({
                    employeeId: employee.id,
                    day: day.id,
                    shiftId: defaultShift.id,
                  });
                } else {
                  setIsShiftModOpen(true);
                }
              } else {
                // si case pleine mode edition
                onCellClick(dailyAssignment);
              }
            }}
          />
        </td>
      );
    });
  };
  return (
    <>
      {/* ── Ligne AM (Matin) ── */}
      <tr className="border-b border-border/50 group/row">
        {/* Cellule employé — rowSpan 2 (AM + PM), sticky à gauche.
            Opaque base + employee tint as a gradient layer: a translucent background
            would let the day cells show through while scrolling under it */}
        <td
          rowSpan={2}
          className="sticky left-0 z-20 bg-bg-primary p-0 align-stretch shadow-[inset_-1px_-1px_0_var(--color-border)]"
          style={{
            backgroundImage: `linear-gradient(${employee.color}08, ${employee.color}08)`,
          }}
        >
          {/* Fixed 96px on phone so long names truncate instead of widening the column */}
          <div className="flex h-full w-24 sm:w-auto">
            {/* Barre latérale couleur employé */}
            <div
              className="w-1 shrink-0 rounded-l-sm"
              style={{ backgroundColor: employee.color }}
            />
            <div className="flex flex-col flex-1 min-w-0">
              {/* ── Ligne AM : prénom (téléphone) / nom complet (PC) ── */}
              <div className="flex items-center h-11 min-w-0 px-2 sm:px-4 border-b border-border/30">
                <span
                  className="font-semibold text-sm text-text-primary truncate"
                  title={employee.name}
                >
                  <span className="sm:hidden">
                    {getFirstName(employee.name)}
                  </span>
                  <span className="hidden sm:inline">{employee.name}</span>
                </span>
              </div>

              {/* ── Ligne PM : heures total / contrat ── */}
              <div className="flex items-center gap-1 h-11 min-w-0 px-2 sm:px-4">
                <span
                  className={`whitespace-nowrap tabular-nums text-[11px] sm:text-xs ${isOvertime ? "text-danger font-semibold" : "text-text-secondary"}`}
                >
                  {formatMinutesToDisplay(totalMinutes)} /{" "}
                  {formatMinutesToDisplay(employee.weeklyMinutes)}
                </span>
                {isOvertime && (
                  <span
                    className="shrink-0 text-[10px] text-danger sm:text-xs sm:bg-danger/10 sm:rounded-full sm:px-1.5 sm:py-0.5"
                    title="Dépassement d'heures"
                  >
                    ⚠️
                  </span>
                )}
              </div>
            </div>
          </div>
        </td>

        {/* 7 cellules AM — une par jour */}
        {renderDayCells("am")}
      </tr>

      {/* ── Ligne PM ( Après-midi) ── */}
      <tr className="border-b border-border group/row">
        {renderDayCells("pm")}
      </tr>
    </>
  );
}

export default EmployeeRow;
