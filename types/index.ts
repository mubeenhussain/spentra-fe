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
  currency?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

/** PUT /auth/profile */
export interface UpdateProfileInput {
  name?: string;
  email?: string;
  currency?: string;
  location?: string;
}

/** Auth register/login response */
export interface AuthResponse {
  token: string;
  user: User;
}

/** Nested item inside a bulk expense document */
export interface ExpenseItem {
  _id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  note?: string;
}

/** Expense document — `single` or `bulk` (items[]) */
export interface Expense {
  _id: string;
  userId: string;
  kind?: "single" | "bulk";
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  note?: string;
  totalAmount?: number;
  count?: number;
  items?: ExpenseItem[];
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

/** POST /expenses/bulk */
export interface BulkCreateExpenseInput {
  expenses: CreateExpenseInput[];
}

export interface BulkCreateExpenseResponse {
  count: number;
  expenses?: Expense[];
  expense?: Expense;
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

/** Paginated expense list response (backend shape) */
export interface ExpenseListResponse {
  expenses: Expense[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
}

/** Normalized list used by the UI/store */
export interface ExpenseListResult {
  data: Expense[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ExpenseResponse {
  expense: Expense;
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
