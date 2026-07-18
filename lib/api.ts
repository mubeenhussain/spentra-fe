import type { ApiError } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
const TOKEN_KEY = "spentra_token";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export class ApiClientError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, body: ApiError) {
    super(body.message || "Request failed");
    this.name = "ApiClientError";
    this.status = status;
    this.errors = body.errors;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  skipAuth?: boolean;
};

export async function api<T>(path: string, options: RequestOptions = {}) {
  const { body, skipAuth = false, headers: customHeaders, ...rest } = options;
  const headers = new Headers(customHeaders);

  if (body !== undefined) headers.set("Content-Type", "application/json");
  if (!skipAuth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const url = path.startsWith("http")
    ? path
    : `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const response = await fetch(url, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    if (response.status === 401) clearToken();

    const raw =
      data && typeof data === "object" ? (data as Record<string, unknown>) : null;
    throw new ApiClientError(response.status, {
      message:
        (typeof raw?.message === "string" && raw.message) ||
        (typeof raw?.error === "string" && raw.error) ||
        response.statusText ||
        "Request failed",
      errors: raw?.errors as ApiError["errors"],
    });
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    api<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    api<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    api<T>(path, { ...options, method: "PUT", body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    api<T>(path, { ...options, method: "DELETE" }),
};
