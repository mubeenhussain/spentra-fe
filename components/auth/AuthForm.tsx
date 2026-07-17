"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ApiClientError } from "@/lib/api";
import { useLoginMutation, useRegisterMutation } from "@/hooks/useAuth";
import { Button, FormField, type FormFieldProps } from "@/components/ui";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const login = useLoginMutation();
  const register = useRegisterMutation();
  const pending = login.isPending || register.isPending;
  const [error, setError] = useState("");
  const fields = [
    ...(!isLogin
      ? [{ label: "Full name", name: "name", placeholder: "Mubeen Hussain", autoComplete: "name", minLength: 2 }]
      : []),
    { label: "Email address", name: "email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "At least 8 characters",
      autoComplete: isLogin ? "current-password" : "new-password",
      minLength: 8,
    },
    ...(!isLogin
      ? [{ label: "Confirm password", name: "confirmPassword", type: "password", placeholder: "Repeat your password", autoComplete: "new-password", minLength: 8 }]
      : []),
  ] satisfies FormFieldProps[];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");

    if (!isLogin && password !== String(fd.get("confirmPassword") ?? "")) {
      setError("Passwords do not match.");
      return;
    }

    try {
      if (isLogin) await login.mutateAsync({ email, password });
      else await register.mutateAsync({ name, email, password });
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Something went wrong. Try again."
      );
    }
  }

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
            ? "Your expenses and monthly insights are waiting."
            : "Track spending and stay on top of every expense."}
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        {fields.map((field) => (
          <FormField key={field.name} {...field} required />
        ))}

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <Button className="mt-2 h-12 w-full" loading={pending}>
          {isLogin ? "Sign in" : "Create free account"}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        {isLogin ? "New to Spentra?" : "Already have an account?"}{" "}
        <Link href={isLogin ? "/signup" : "/login"} className="font-semibold text-emerald-600 hover:text-emerald-700">
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
