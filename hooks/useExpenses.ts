"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expensesApi } from "@/lib/services";
import { queryKeys } from "@/lib/query-keys";
import type {
  CreateExpenseInput,
  ExpenseFilters,
  UpdateExpenseInput,
} from "@/types";

export function useExpensesQuery(filters?: ExpenseFilters) {
  return useQuery({
    queryKey: queryKeys.expenses.list(filters ?? {}),
    queryFn: () => expensesApi.list(filters),
  });
}

export function useExpenseQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.expenses.detail(id),
    queryFn: () => expensesApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useSummaryQuery(params?: Pick<ExpenseFilters, "from" | "to">) {
  return useQuery({
    queryKey: queryKeys.expenses.summary(params),
    queryFn: () => expensesApi.summary(params),
  });
}

export function useCreateExpenseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateExpenseInput) => expensesApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all });
    },
  });
}

export function useUpdateExpenseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateExpenseInput }) =>
      expensesApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all });
    },
  });
}

export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expensesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all });
    },
  });
}
