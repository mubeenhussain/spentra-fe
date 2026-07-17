import type { ExpenseFilters } from "@/types";

export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  expenses: {
    all: ["expenses"] as const,
    lists: () => [...queryKeys.expenses.all, "list"] as const,
    list: (filters: ExpenseFilters | Record<string, unknown>) =>
      [...queryKeys.expenses.lists(), filters] as const,
    details: () => [...queryKeys.expenses.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.expenses.details(), id] as const,
    summary: (params?: Pick<ExpenseFilters, "from" | "to"> | Record<string, unknown>) =>
      [...queryKeys.expenses.all, "summary", params ?? {}] as const,
  },
} as const;
