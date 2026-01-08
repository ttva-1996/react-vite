import { http } from "../../lib/http";
import type { Employee } from "./types";

export type CreateEmployeeDto = Omit<Employee, "id">;

export async function getEmployees(): Promise<Employee[]> {
  const res = await http.get<Employee[]>("/employees");
  return res.data;
}

export async function getEmployee(id: string): Promise<Employee> {
  const res = await http.get<Employee>(`/employees/${id}`);
  return res.data;
}

export async function createEmployee(
  dto: CreateEmployeeDto
): Promise<Employee> {
  const res = await http.post<Employee>("/employees", dto);
  return res.data;
}
