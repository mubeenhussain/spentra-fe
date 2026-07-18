import { ApiClientError } from "@/lib/api";

export function getErrorMessage(err: unknown) {
  return err instanceof ApiClientError
    ? err.message
    : "Something went wrong. Try again.";
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
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
