import { useCallback } from "react";
import { useLocalReducer } from "@/hooks";
import { generateId } from "@/utils";

function assignmentsReducer(assignments, action) {
  switch (action.type) {
    case "ADD":
      return [...assignments, action.payload];
    case "UPDATE":
      return assignments
        .filter((a) => !action.payload.conflictingIds.includes(a.id))
        .map((a) =>
          a.id === action.payload.assignment.id ? action.payload.assignment : a,
        );
    case "DELETE":
      return assignments.filter((a) => a.id !== action.payload);
    case "DELETE_BY_EMPLOYEE":
      return assignments.filter((a) => a.employeeId !== action.payload);
    case "DELETE_BY_SHIFT":
      return assignments.filter((a) => a.shiftId !== action.payload);
    default:
      return assignments;
  }
}

export default function useAssignments(shifts = [], currentWeek = "") {
  // reducer
  const [assignments, dispatch] = useLocalReducer(
    "assignments",
    assignmentsReducer,
    [],
  );

  // filtrer les assignments par semaine
  const weeklyAssignments = assignments.filter((a) => a.weekOf === currentWeek);

  // Ajouter une nouvelle assignation
  const addAssignment = useCallback(
    (assignmentData) => {
      dispatch({
        type: "ADD",
        payload: { ...assignmentData, id: generateId(), weekOf: currentWeek },
      });
    },
    [dispatch, currentWeek],
  );

  // Modifier une assignation existante (avec gestion des conflits)
  const updateAssignment = useCallback(
    (assignmentData) => {
      // 1. Trouver l'assignation actuelle pour comparer
      const currentAssignment = assignments.find(
        (a) => a.id === assignmentData.id,
      );

      // guard: si l'assignation actuelle n'existe pas, ne rien faire
      if (!currentAssignment) {
        console.warn("Assignment not found");
        return;
      }

      // Si même shift qu'avant → ne rien faire
      if (assignmentData.shiftId === currentAssignment.shiftId) return;

      // 2. Résoudre le TYPE du nouveau shift (pour comparer par type, pas par id)
      const newShift = shifts.find((s) => s.id === assignmentData.shiftId);
      const newType = newShift?.type;

      // 3. Map des conflits entre types de shifts
      // split conflicte avec tout (comme journée) car il occupe AM + PM
      const conflictMap = {
        am: ["full", "am", "split"],
        pm: ["full", "pm", "split"],
        full: ["am", "pm", "split"],
        split: ["am", "pm", "full", "split"],
      };

      // 4. Collecter les ids des assignations conflictuelles
      //    = même employé, même jour, shift dont le TYPE chevauche, mais PAS celle qu'on édite
      const conflictingIds = assignments
        .filter((a) => {
          if (a.id === assignmentData.id) return false;
          if (a.employeeId !== assignmentData.employeeId) return false;
          if (a.day !== assignmentData.day) return false;
          if (a.weekOf !== assignmentData.weekOf) return false;
          const existingShift = shifts.find((s) => s.id === a.shiftId);
          return conflictMap[newType]?.includes(existingShift?.type);
        })
        .map((a) => a.id);
      //5. dispatch finale pour mettre a jour le states
      dispatch({
        type: "UPDATE",
        payload: { assignment: assignmentData, conflictingIds },
      });
    },
    [dispatch, assignments, shifts],
  );

  // Supprimer une assignation par id
  const deleteAssignment = useCallback(
    (assignmentId) => dispatch({ type: "DELETE", payload: assignmentId }),
    [dispatch],
  );

  // Supprimer toutes les assignations d'un employé
  const deleteAssignmentsByEmployee = useCallback(
    (employeeId) =>
      dispatch({ type: "DELETE_BY_EMPLOYEE", payload: employeeId }),
    [dispatch],
  );

  // Supprimer toutes les assignations d'un shift
  const deleteAssignmentsByShift = useCallback(
    (shiftId) => dispatch({ type: "DELETE_BY_SHIFT", payload: shiftId }),
    [dispatch],
  );

  return {
    assignments: weeklyAssignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    deleteAssignmentsByEmployee,
    deleteAssignmentsByShift,
  };
}
