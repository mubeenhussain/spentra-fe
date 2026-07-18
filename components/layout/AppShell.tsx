"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { BrandMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout, selectAuth } from "@/store/authSlice";

export function AppShell({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector(selectAuth);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-8">
            <BrandMark href="/dashboard" />
            <nav className="hidden items-center gap-1 sm:flex">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/expenses">Expenses</NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <span className="hidden text-sm text-slate-500 sm:inline">
              {user?.name}
            </span>
            <Button
              variant="secondary"
              className="px-3 py-2"
              onClick={() => {
                dispatch(logout());
                router.replace("/login");
              }}
            >
              Log out
            </Button>
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
