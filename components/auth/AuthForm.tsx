"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { useLoginMutation, useRegisterMutation } from "@/hooks/useAuth";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const router = useRouter();
  const login = useLoginMutation();
  const register = useRegisterMutation();
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));

    if (!isLogin && data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      if (isLogin) {
        await login.mutateAsync({
          email: String(data.email),
          password: String(data.password),
        });
      } else {
        await register.mutateAsync({
          name: String(data.name),
          email: String(data.email),
          password: String(data.password),
        });
      }
      router.replace("/");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong.");
    }
  }

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-emerald-600">
          {isLogin ? "Welcome back" : "Start saving smarter"}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {isLogin ? "Sign in to Spentra" : "Create your account"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          {isLogin
            ? "Your expenses, balances, and monthly insights are waiting."
            : "Track spending, understand habits, and stay on top of every expense."}
        </p>
      </div>

      <form className="space-y-4" onSubmit={submit}>
        {!isLogin && (
          <Field label="Full name">
            <input
              className={inputClass}
              name="name"
              placeholder="Alex Morgan"
              autoComplete="name"
              minLength={2}
              required
            />
          </Field>
        )}

        <Field label="Email address">
          <input
            className={inputClass}
            name="email"
            type="email"
            placeholder="alex@example.com"
            autoComplete="email"
            required
          />
        </Field>

        <Field label="Password">
          <input
            className={inputClass}
            name="password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete={isLogin ? "current-password" : "new-password"}
            minLength={8}
            required
          />
        </Field>

        {!isLogin && (
          <Field label="Confirm password">
            <input
              className={inputClass}
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </Field>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          className="mt-2 h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={login.isPending || register.isPending}
        >
          {login.isPending || register.isPending
            ? "Please wait..."
            : isLogin
              ? "Sign in"
              : "Create free account"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        {isLogin ? "New to Spentra?" : "Already have an account?"}{" "}
        <Link
          href={isLogin ? "/signup" : "/login"}
          className="font-semibold text-emerald-600 hover:text-emerald-700"
        >
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}
