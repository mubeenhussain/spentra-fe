/** Expense categories matching backend enum */
export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Rent",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

/** User returned by auth endpoints (password never included) */
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

/** Auth register/login response */
export interface AuthResponse {
  token: string;
  user: User;
}

/** Expense document owned by a user */
export interface Expense {
  _id: string;
  userId: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

/** Payload for creating an expense */
export interface CreateExpenseInput {
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  note?: string;
}

/** Payload for updating an expense (partial) */
export type UpdateExpenseInput = Partial<CreateExpenseInput>;

/** Query filters for listing expenses */
export interface ExpenseFilters {
  from?: string;
  to?: string;
  category?: ExpenseCategory | string;
  page?: number;
  limit?: number;
  title?: string;
}

/** Paginated expense list response */
export interface ExpenseListResponse {
  data: Expense[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/** Per-category total in monthly summary */
export interface CategoryBreakdown {
  category: ExpenseCategory | string;
  total: number;
  count: number;
}

/** GET /expenses/summary response */
export interface Summary {
  total: number;
  count: number;
  byCategory: CategoryBreakdown[];
}

/** Consistent API error shape from backend */
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
