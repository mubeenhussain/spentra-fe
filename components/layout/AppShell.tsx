"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand/Logo";
import { UserMenu } from "@/components/layout/UserMenu";
import { useAppSelector } from "@/store";
import { selectAuth } from "@/store/authSlice";

export function AppShell({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const { user } = useAppSelector(selectAuth);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            <BrandMark href="/dashboard" />
            <nav className="hidden items-center gap-1 sm:flex">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/expenses">Expenses</NavLink>
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {actions}
            <UserMenu name={user?.name} email={user?.email} />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </main>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
    >
      {children}
    </Link>
  );
}
