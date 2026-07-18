"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button, FormField, type FormFieldProps } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  clearAuthError,
  login,
  register,
  selectAuth,
} from "@/store/authSlice";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error, token } = useAppSelector(selectAuth);
  const [formError, setFormError] = useState("");
  const pending = status === "loading";
  const message = formError || error;

  const fields = [
    ...(!isLogin
      ? [
          {
            label: "Full name",
            name: "name",
            placeholder: "Mubeen Hussain",
            autoComplete: "name",
            minLength: 2,
          },
        ]
      : []),
    {
      label: "Email address",
      name: "email",
      type: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "At least 8 characters",
      autoComplete: isLogin ? "current-password" : "new-password",
      minLength: 8,
    },
    ...(!isLogin
      ? [
          {
            label: "Confirm password",
            name: "confirmPassword",
            type: "password",
            placeholder: "Repeat your password",
            autoComplete: "new-password",
            minLength: 8,
          },
        ]
      : []),
  ] satisfies FormFieldProps[];

  useEffect(() => {
    if (token) router.replace("/dashboard");
  }, [token, router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    dispatch(clearAuthError());
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");

    if (!isLogin && password !== String(fd.get("confirmPassword") ?? "")) {
      setFormError("Passwords do not match.");
      return;
    }

    const action = isLogin
      ? await dispatch(login({ email, password }))
      : await dispatch(register({ name, email, password }));

    if (login.fulfilled.match(action) || register.fulfilled.match(action)) {
      router.replace("/dashboard");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-brand-text">
          {isLogin ? "Welcome back" : "Start saving smarter"}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
          {isLogin ? "Sign in to Spentra" : "Create your account"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          {isLogin
            ? "Your expenses and monthly insights are waiting."
            : "Track spending and stay on top of every expense."}
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        {fields.map((field) => (
          <FormField key={field.name} {...field} required />
        ))}

        {message && (
          <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-text">
            {message}
          </p>
        )}

        <Button className="mt-2 h-12 w-full" loading={pending}>
          {isLogin ? "Sign in" : "Create free account"}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-muted">
        {isLogin ? "New to Spentra?" : "Already have an account?"}{" "}
        <Link
          href={isLogin ? "/signup" : "/login"}
          className="font-semibold text-brand-text hover:text-brand-hover"
        >
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
