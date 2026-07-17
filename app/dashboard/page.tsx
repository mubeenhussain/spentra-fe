"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useLogout, useMeQuery } from "@/hooks/useAuth";
import { Button, PageLoader } from "@/components/ui";

export default function DashboardPage() {
  const router = useRouter();
  const logout = useLogout();
  const { isAuthenticated, isHydrated, user } = useAppSelector((s) => s.auth);
  const { data } = useMeQuery();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) router.replace("/login");
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated) {
    return <PageLoader />;
  }

  const name = data?.name ?? user?.name ?? "there";

  return (
    <main className="min-h-screen bg-[#f8faf9]">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/dashboard" className="font-bold text-slate-950">
          Spentra
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{name}</span>
          <Button onClick={logout}>Log out</Button>
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
          <p className="mt-1 font-medium">{data?.email ?? user?.email}</p>
        </div>
      </section>
    </main>
  );
}
