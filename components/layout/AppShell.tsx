"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/80 bg-surface">
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
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-lg bg-brand-soft px-3 py-2 text-sm font-semibold text-brand-text"
          : "rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-heading"
      }
    >
      {children}
    </Link>
  );
}
