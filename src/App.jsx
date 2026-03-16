import { Header, Container } from "@/components/layout";
import { Modal, Button } from "@/components/ui";
import { EmployeeList } from "@/features/employees";
import { PlanningTable, WeekNav } from "@/features/planning";
import { ShiftManager } from "@/features/shifts";
import { groupShiftsByType } from "@/utils";
import { useState } from "react";
import { useAppContext } from "./context/AppContext.jsx";

function App() {
  // states
  // employee modal state
  const [isEmpModOpen, setIsEmpModOpen] = useState(false);
  // assignment selected for edit delete and modal
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  // shift modal state
  const [isShiftModOpen, setIsShiftModOpen] = useState(false);

  // context
  const {
    deleteEmployee,
    shifts,
    deleteShift,
    updateAssignment,
    deleteAssignment,
    deleteAssignmentsByEmployee,
    deleteAssignmentsByShift,
  } = useAppContext();

  // HANDLERS

  // DeleteEmployee Handler (+ nettoyage assignations orphelines)
  const handleDeleteEmployee = (employeeId) => {
    deleteEmployee(employeeId);
    deleteAssignmentsByEmployee(employeeId);
  };

  // deleteShift Handler
  const handleDeleteShift = (shiftId) => {
    deleteShift(shiftId);
    deleteAssignmentsByShift(shiftId);
  };

  // assignation handler
  const handleCellClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary">
      {/* Header */}
      <Header />

      {/* structure  */}
      <Container>
        <main className="py-4 sm:py-6 space-y-4">
          {/* titre / boutton CRUD employé / bouton CRUD shift */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
              📋 Planning de la semaine
            </h2>
            {/* Navigation semaines */}
            <WeekNav />
            {/* Button de CRUD */}
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsShiftModOpen(true)}
              >
                🕒 Gérer les shifts
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEmpModOpen(true)}
              >
                👥 Gérer les employés
              </Button>
            </div>
          </div>

          {/* Tableau pleine largeur */}
          <PlanningTable onCellClick={handleCellClick} />

          {/* TOUT LES MODALS */}
          {/* Modal CRUD employés */}
          <Modal
            isOpen={isEmpModOpen}
            onClose={() => setIsEmpModOpen(false)}
            title="👥 Gestion des employés"
            size="lg"
          >
            <EmployeeList onDeleteEmployee={handleDeleteEmployee} />
          </Modal>
          {/* Modal CRUD Shift */}
          <Modal
            isOpen={isShiftModOpen}
            onClose={() => setIsShiftModOpen(false)}
            title="🕒 Gestion des shifts"
            size="lg"
          >
            <ShiftManager onDeleteShift={handleDeleteShift} />
          </Modal>
          {/* Modal assignment cellule */}
          <Modal
            isOpen={selectedAssignment}
            onClose={() => setSelectedAssignment(null)}
            title="📝 Modifier l'assignation"
            size="sm"
          >
            <div className="space-y-4">
              {/* Sélecteur de shift — groupé par type, trié par startTime */}
              <div className="space-y-3">
                {groupShiftsByType(shifts).map((group) => (
                  <div key={group.type}>
                    {/* En-tête de groupe */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs">{group.emoji}</span>
                      <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide">
                        {group.label}
                      </span>
                      <div className="flex-1 h-px bg-border/50" />
                    </div>

                    {/* Shifts du groupe */}
                    <div className="flex flex-col gap-1.5">
                      {group.shifts.map((shift) => (
                        <button
                          key={shift.id}
                          onClick={() => {
                            updateAssignment({
                              ...selectedAssignment,
                              shiftId: shift.id,
                            });
                            setSelectedAssignment(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg border transition-all cursor-pointer
                            ${group.colorClass} hover:shadow-md hover:brightness-95
                            ${
                              selectedAssignment?.shiftId === shift.id
                                ? "ring-2 ring-accent"
                                : ""
                            }`}
                        >
                          <span className="text-sm font-medium text-text-primary">
                            {shift.name}
                          </span>
                          <span className="text-xs text-text-secondary ml-2">
                            {shift.startTime} - {shift.endTime}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bouton supprimer */}
              <div className="pt-2 border-t border-border">
                <Button
                  variant="danger"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    deleteAssignment(selectedAssignment.id);
                    setSelectedAssignment(null);
                  }}
                >
                  🗑️ Supprimer l'assignation
                </Button>
              </div>
            </div>
          </Modal>
        </main>
      </Container>
    </div>
  );
}

export default App;
