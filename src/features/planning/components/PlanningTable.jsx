// 🎯 Task 9.1.1 : PlanningTable — Squelette tableau Employé × Jour (AM/PM)
// 🎨 UI/Tailwind — Mentor fournit le code complet

import { DAYS_OF_WEEK } from "@/constants";
import { EmployeeRow } from "@/features/planning";
import { useAppContext } from "@/context/AppContext";
import { addDays, isToday, isPast, parseLocalIso } from "@/utils";

function PlanningTable({ onCellClick, setIsShiftModOpen }) {
  // context
  const { employees, currentWeek } = useAppContext();

  const weekDates = DAYS_OF_WEEK.map((_, index) => addDays(currentWeek, index));
  return (
    <div className="bg-bg-primary rounded-xl shadow-md border border-border overflow-hidden">
      {/* Wrapper scroll horizontal */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-175">
          {/* En-tête : colonne Employé + 7 jours */}
          <thead>
            <tr className="bg-bg-tertiary border-b border-border">
              {/* Colonne Employé — sticky à gauche */}
              <th className="sticky left-0 z-20 bg-bg-tertiary text-left px-3 sm:px-4 py-3 min-w-45 sm:min-w-55 border-r border-border">
                <span className="text-sm font-semibold text-text-secondary">
                  👤 Employé
                </span>
              </th>

              {/* 7 colonnes jours */}
              {DAYS_OF_WEEK.map((day, index) => {
                const date = weekDates[index];
                const today = isToday(date);
                const past = isPast(date);
                const dayOfMonth = parseLocalIso(date).getDate();

                return (
                  <th
                    key={day.id}
                    className={`px-2 sm:px-3 py-2 text-center min-w-22.5 sm:min-w-27.5 border-r border-border last:border-r-0 ${
                      past ? "opacity-60" : ""
                    }`}
                  >
                    <span className="text-sm font-semibold text-text-primary sm:hidden">
                      {day.shortName}
                    </span>
                    <span className="text-sm font-semibold text-text-primary hidden sm:inline">
                      {day.name}
                    </span>
                    <span
                      className={`ml-1 inline-flex items-center justify-center min-w-6 h-6 px-1 rounded-full text-sm font-semibold ${
                        today ? "bg-accent text-white" : "text-text-secondary"
                      }`}
                    >
                      {dayOfMonth}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          {/* Corps du tableau */}
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  onCellClick={onCellClick}
                  setIsShiftModOpen={setIsShiftModOpen}
                />
              ))
            ) : (
              /* Empty state — aucun employé */
              <tr>
                <td
                  colSpan={1 + DAYS_OF_WEEK.length}
                  className="px-4 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl opacity-30">📅</span>
                    <p className="text-text-muted text-sm font-medium">
                      Planning vide
                    </p>
                    <p className="text-text-muted/60 text-xs">
                      Commencez par ajouter des employés
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlanningTable;
