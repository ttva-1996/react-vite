import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees, getEmployee, createEmployee } from "./api";
import type { CreateEmployeeDto } from "./api";

export const employeeKeys = {
  all: ["employees"] as const,
  list: () => [...employeeKeys.all, "list"] as const,
  detail: (id: string) => [...employeeKeys.all, "detail", id] as const,
};

export function useEmployees() {
  return useQuery({
    queryKey: employeeKeys.list(),
    queryFn: getEmployees,
  });
}

export function useEmployee(id: string | null) {
  return useQuery({
    queryKey: id ? employeeKeys.detail(id) : ["employees", "disabled"],
    queryFn: () => getEmployee(id!),
    enabled: !!id,
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateEmployeeDto) => createEmployee(dto),
    onSuccess: (created) => {
      // update cache directly (no refetch)
      queryClient.setQueryData(employeeKeys.list(), (old: any) =>
        Array.isArray(old) ? [created, ...old] : old
      );
    },
  });
}
