// 🎯 Task 9.1.2 : EmployeeRow — Ligne employé avec sous-lignes AM/PM
// 🎨 Styling Tailwind = Mentor | ⚛️ Logique React = Paul

import { DAYS_OF_WEEK } from "@/constants";
import { getEmployeeHours } from "@/features/employees";
import { formatMinutesToDisplay } from "@/utils";
import PlanningCell from "./PlanningCell";
import { useAppContext } from "@/context/AppContext";

function EmployeeRow({ employee, onCellClick }) {
  // context
  const { assignments, addAssignment, shifts } = useAppContext();
  // assignations de l'employé
  const employeeAssignments = assignments.filter(
    (a) => a.employeeId === employee.id,
  );
  // Calcul des heures (total, AM, PM) via utilitaire centralisé
  const {
    total: totalMinutes,
    am: amMinutes,
    pm: pmMinutes,
  } = getEmployeeHours(employeeAssignments, shifts);
  const isOvertime = totalMinutes > employee.weeklyMinutes;
  // Types de shifts qui occupent AM + PM (apparaissent sur les deux lignes)
  const multiLineTypes = ["full", "split"];

  //fonction pour les cellules aprem ou matin
  const renderDayCells = (period) => {
    // parcourir les jours de la semaine pour cette ligne (AM ou PM)
    return DAYS_OF_WEEK.map((day) => {
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
          className="border-r border-border/50 last:border-r-0 p-1 h-[44px] align-middle"
        >
          <PlanningCell
            assignment={dailyAssignment}
            shift={shift}
            period={period}
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
        {/* Cellule employé — rowSpan 2 (AM + PM), sticky à gauche */}
        <td
          rowSpan={2}
          className="sticky left-0 z-10 border-r border-border p-0 align-stretch transition-colors"
          style={{ backgroundColor: `${employee.color}08` }}
        >
          <div className="flex h-full">
            {/* Barre latérale couleur employé */}
            <div
              className="w-1 flex-shrink-0 rounded-l-sm"
              style={{ backgroundColor: employee.color }}
            />
            <div className="flex flex-col flex-1 min-w-0">
              {/* ── Ligne AM : Nom + pastille |  total AM ── */}
              <div className="flex items-center justify-between gap-2 px-3 sm:px-4 h-[44px] border-b border-border/30">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-sm text-text-primary truncate">
                    {employee.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted flex-shrink-0">
                  <span>☀️</span>
                  <span>{formatMinutesToDisplay(amMinutes)}</span>
                </div>
              </div>

              {/* ── Ligne PM : Heures total/contrat | total PM ── */}
              <div className="flex items-center justify-between gap-2 px-3 sm:px-4 h-[44px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-text-muted">●</span>
                  <span
                    className={`text-xs ${isOvertime ? "text-danger font-semibold" : "text-text-secondary"}`}
                  >
                    {formatMinutesToDisplay(totalMinutes)} /{" "}
                    {formatMinutesToDisplay(employee.weeklyMinutes)}
                  </span>
                  {isOvertime && (
                    <span
                      className="text-xs text-danger bg-danger/10 rounded-full px-1.5 py-0.5"
                      title="Dépassement d'heures"
                    >
                      ⚠️
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted flex-shrink-0">
                  <span>🌙</span>
                  <span>{formatMinutesToDisplay(pmMinutes)}</span>
                </div>
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
