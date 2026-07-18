import { apiClient } from "@/lib/api";
import type {
  AuthResponse,
  CreateExpenseInput,
  Expense,
  ExpenseFilters,
  ExpenseListResponse,
  Summary,
  UpdateExpenseInput,
  User,
} from "@/types";

function toQuery(params?: object) {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const authApi = {
  register: (body: { name: string; email: string; password: string }) =>
    apiClient.post<AuthResponse>("/auth/register", body, { skipAuth: true }),
  login: (body: { email: string; password: string }) =>
    apiClient.post<AuthResponse>("/auth/login", body, { skipAuth: true }),
  me: () => apiClient.get<User>("/auth/me"),
};

export const expensesApi = {
  list: (filters?: ExpenseFilters) =>
    apiClient.get<ExpenseListResponse>(`/expenses${toQuery(filters)}`),
  getById: (id: string) => apiClient.get<Expense>(`/expenses/${id}`),
  create: (body: CreateExpenseInput) =>
    apiClient.post<Expense>("/expenses", body),
  update: (id: string, body: UpdateExpenseInput) =>
    apiClient.put<Expense>(`/expenses/${id}`, body),
  remove: (id: string) => apiClient.delete<void>(`/expenses/${id}`),
  summary: (params?: Pick<ExpenseFilters, "from" | "to">) =>
    apiClient.get<Summary>(`/expenses/summary${toQuery(params)}`),
};
