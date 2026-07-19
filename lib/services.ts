import { apiClient } from "@/lib/api";
import type {
  AuthResponse,
  BulkCreateExpenseInput,
  BulkCreateExpenseResponse,
  CreateExpenseInput,
  ExpenseFilters,
  ExpenseListResponse,
  ExpenseListResult,
  ExpenseResponse,
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

/** Backend date field expects ISO string */
export function toApiDate(value: string) {
  if (!value) return new Date().toISOString();
  if (value.includes("T")) return value;
  return new Date(`${value}T12:00:00.000Z`).toISOString();
}

export const authApi = {
  register: (body: { name: string; email: string; password: string }) =>
    apiClient.post<AuthResponse>("/auth/register", body, { skipAuth: true }),
  login: (body: { email: string; password: string }) =>
    apiClient.post<AuthResponse>("/auth/login", body, { skipAuth: true }),
  me: () => apiClient.get<User>("/auth/me"),
};

export const expensesApi = {
  list: async (filters?: ExpenseFilters): Promise<ExpenseListResult> => {
    const res = await apiClient.get<ExpenseListResponse>(
      `/expenses${toQuery(filters)}`
    );
    return {
      data: res.expenses ?? [],
      meta: {
        page: res.meta?.page ?? 1,
        limit: res.meta?.limit ?? 10,
        total: res.meta?.total ?? 0,
        totalPages: res.meta?.totalPages ?? 1,
      },
    };
  },

  getById: async (id: string) => {
    const res = await apiClient.get<ExpenseResponse>(`/expenses/${id}`);
    return res.expense;
  },

  create: async (body: CreateExpenseInput) => {
    const res = await apiClient.post<ExpenseResponse>("/expenses", {
      ...body,
      date: toApiDate(body.date),
    });
    return res.expense;
  },

  createBulk: async (body: BulkCreateExpenseInput) => {
    const res = await apiClient.post<BulkCreateExpenseResponse>(
      "/expenses/bulk",
      {
        expenses: body.expenses.map((item) => ({
          ...item,
          date: toApiDate(item.date),
        })),
      }
    );
    return res.expenses ?? [];
  },

  update: async (id: string, body: UpdateExpenseInput) => {
    const payload = {
      ...body,
      ...(body.date ? { date: toApiDate(body.date) } : {}),
    };
    const res = await apiClient.put<ExpenseResponse>(`/expenses/${id}`, payload);
    return res.expense;
  },

  remove: (id: string) => apiClient.delete<void>(`/expenses/${id}`),

  summary: (params?: Pick<ExpenseFilters, "from" | "to">) =>
    apiClient.get<Summary>(`/expenses/summary${toQuery(params)}`),
};
