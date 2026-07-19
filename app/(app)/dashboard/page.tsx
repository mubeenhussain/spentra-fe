"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
  ExpensesManager,
  SummaryCards,
} from "@/components/expenses/ExpensesManager";
import { Button, LinkButton } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store";
import { openCreate, selectExpenses } from "@/store/expensesSlice";
import { selectAuth } from "@/store/authSlice";
import { useMoney } from "@/hooks/useMoney";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const money = useMoney();
  const { user } = useAppSelector(selectAuth);
  const { summary } = useAppSelector(selectExpenses);
  const firstName = (user?.name ?? "there").split(" ")[0];

  return (
    <AppShell
      actions={
        <Button className="hidden sm:inline-flex" onClick={() => dispatch(openCreate())}>
          Add expense
        </Button>
      }
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-heading">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 text-muted">
            {summary
              ? `${money(summary.total)} across ${summary.count} expenses`
              : "Your monthly snapshot"}
          </p>
        </div>
        <LinkButton href="/expenses" variant="secondary">
          View all
        </LinkButton>
      </div>

      <div className="space-y-8">
        <SummaryCards />
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-heading">Recent expenses</h2>
            <Button className="sm:hidden" onClick={() => dispatch(openCreate())}>
              Add
            </Button>
          </div>
          <ExpensesManager mode="cards" showFilters={false} limit={5} />
        </section>
      </div>
    </AppShell>
  );
}
