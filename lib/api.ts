import { getToken, clearToken } from "@/lib/auth-token";
import type { ApiError } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

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
  /** Skip attaching Authorization header */
  skipAuth?: boolean;
};

/**
 * Central HTTP client for all backend calls.
 * Injects Bearer token from localStorage when present.
 */
export async function api<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, skipAuth = false, headers: customHeaders, ...rest } = options;

  const headers = new Headers(customHeaders);
  if (!headers.has("Content-Type") && body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (!skipAuth) {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const url = path.startsWith("http")
    ? path
    : `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const response = await fetch(url, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    if (response.status === 401) {
      clearToken();
    }

    const errorBody: ApiError =
      data && typeof data === "object"
        ? (data as ApiError)
        : { message: response.statusText || "Request failed" };

    throw new ApiClientError(response.status, errorBody);
  }

  return data as T;
}

/** Convenience helpers */
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
