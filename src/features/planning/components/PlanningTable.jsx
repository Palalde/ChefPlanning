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
      {/* Scroll container on both axes (so the header can stick to its top), snapping day by day.
          scroll-pl = sticky column width, so a snapped day is never hidden under it */}
      <div className="max-h-[70dvh] overflow-auto snap-x snap-mandatory scroll-pl-24 sm:scroll-pl-40">
        {/* Sticky cells use inset shadows as borders: collapsed borders don't move with sticky cells */}
        <table className="w-full border-collapse min-w-175">
          {/* En-tête : colonne Employé + 7 jours */}
          <thead>
            <tr>
              {/* Corner cell — sticky in both directions, above everything */}
              <th className="sticky left-0 top-0 z-30 w-24 bg-bg-tertiary text-left px-2 sm:w-auto sm:min-w-40 sm:px-4 py-3 shadow-[inset_-1px_-1px_0_var(--color-border)]">
                <span className="text-sm font-semibold text-text-secondary">
                  <span aria-hidden="true" className="hidden sm:inline">
                    👤{" "}
                  </span>
                  Employé
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
                    className="sticky top-0 z-10 snap-start bg-bg-tertiary px-2 sm:px-3 py-2 text-center min-w-22.5 sm:min-w-27.5
                      shadow-[inset_-1px_-1px_0_var(--color-border)] last:shadow-[inset_0_-1px_0_var(--color-border)]"
                  >
                    {/* Dimmed content only: an opaque background must stay opaque while sticky */}
                    <div className={past ? "opacity-60" : ""}>
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
                    </div>
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
                  weekDates={weekDates}
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
