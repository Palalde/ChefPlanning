import { useAppContext } from "@/context/AppContext";
import { formatWeekLabel, getMondayISO } from "@/utils";

export default function WeekNavigator() {
  // context
  const { currentWeek, goPrev, goNext, goToday } = useAppContext();

  // true when the displayed week is the current week
  const isCurrentWeek = currentWeek === getMondayISO(new Date());

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg-primary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors cursor-pointer";

  // Fixed grid columns: no button ever moves, whatever the label length
  return (
    <div className="mx-auto grid w-full max-w-sm grid-cols-[2.75rem_2.75rem_1fr_2.75rem] items-center gap-2">
      {/* Always rendered (stable layout), disabled on the current week */}
      <button
        onClick={goToday}
        disabled={isCurrentWeek}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent bg-accent-soft text-lg text-accent
          hover:bg-bg-tertiary transition-colors cursor-pointer
          disabled:cursor-default disabled:border-border disabled:bg-bg-primary disabled:text-text-muted disabled:opacity-50"
        aria-label="Revenir à la semaine actuelle"
        title="Revenir à la semaine actuelle"
      >
        ↺
      </button>

      <button
        onClick={goPrev}
        className={arrowClass}
        aria-label="Semaine précédente"
      >
        ◀
      </button>

      {/* Read-only label: no hidden click action */}
      <span className="flex h-11 items-center justify-center whitespace-nowrap rounded-lg border border-border bg-bg-primary px-2 text-xs font-medium tabular-nums text-text-primary sm:text-sm">
        {formatWeekLabel(currentWeek)}
      </span>

      <button
        onClick={goNext}
        className={arrowClass}
        aria-label="Semaine suivante"
      >
        ▶
      </button>
    </div>
  );
}