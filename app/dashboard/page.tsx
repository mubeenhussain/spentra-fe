"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, PageLoader } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchMe,
  logout,
  selectAuth,
  selectIsAuthenticated,
} from "@/store/authSlice";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isHydrated } = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) router.replace("/login");
  }, [isHydrated, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && !user) dispatch(fetchMe());
  }, [dispatch, isAuthenticated, user]);

  if (!isHydrated || !isAuthenticated) return <PageLoader />;

  const name = user?.name ?? "there";

  return (
    <main className="min-h-screen bg-[#f8faf9]">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/dashboard" className="font-bold text-slate-950">
          Spentra
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{name}</span>
          <Button
            onClick={() => {
              dispatch(logout());
              router.replace("/login");
            }}
          >
            Log out
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Welcome back, {name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-slate-500">
          You&apos;re signed in. Expense tracking UI comes next.
        </p>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Signed in as</p>
          <p className="mt-1 font-medium">{user?.email}</p>
        </div>
      </section>
    </main>
  );
}
