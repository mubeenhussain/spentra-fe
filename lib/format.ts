import { ApiClientError } from "@/lib/api";

export function getErrorMessage(err: unknown) {
  return err instanceof ApiClientError
    ? err.message
    : "Something went wrong. Try again.";
}

export function formatMoney(amount: number, currency = "USD") {
  const code = (currency || "USD").toUpperCase();
  try {
    return new Intl.NumberFormat(code === "PKR" ? "en-PK" : undefined, {
      style: "currency",
      currency: code,
    }).format(amount);
  } catch {
    return `${code} ${amount.toFixed(2)}`;
  }
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function toDateInput(value?: string) {
  if (!value) return new Date().toISOString().slice(0, 10);
  return value.slice(0, 10);
}

export function isBulkExpense(expense: {
  kind?: string;
  items?: unknown[];
  count?: number;
}) {
  return (
    expense.kind === "bulk" ||
    (expense.items?.length ?? 0) > 1 ||
    (expense.count ?? 0) > 1
  );
}

export function expenseAmount(expense: {
  amount: number;
  totalAmount?: number;
}) {
  return expense.totalAmount ?? expense.amount;
}

export function expenseLabel(expense: {
  title: string;
  kind?: string;
  count?: number;
  items?: unknown[];
}) {
  if (!isBulkExpense(expense)) return expense.title;
  return (
    expense.title ||
    `${expense.count ?? expense.items?.length ?? 0} expenses`
  );
}
