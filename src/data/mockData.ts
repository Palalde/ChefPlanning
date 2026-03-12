import { Employee } from "@/types";

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "emp_mock_1",
    name: "Donal Trump",
    color: "#3B82F6",
    weeklyMinutes: 2160, // 36h00
    skills: ["balance", "rayonnage"],
  },
  {
    id: "emp_mock_2",
    name: "Joe Biden",
    color: "#10B981",
    weeklyMinutes: 1200, // 20h00
    skills: ["facing", "inventaire"],
  },
  {
    id: "emp_mock_3",
    name: "Emanuel Macron",
    color: "#EF4444",
    weeklyMinutes: 1845, // 30h45
    skills: ["reception", "balance"],
  },
];
