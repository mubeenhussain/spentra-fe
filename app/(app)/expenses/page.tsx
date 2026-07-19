"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ExpensesManager } from "@/components/expenses/ExpensesManager";
import { Button } from "@/components/ui";
import { useAppDispatch } from "@/store";
import { openCreate } from "@/store/expensesSlice";

export default function ExpensesPage() {
  const dispatch = useAppDispatch();

  return (
    <AppShell
      actions={
        <Button onClick={() => dispatch(openCreate())}>
          <span className="sm:hidden">Add</span>
          <span className="hidden sm:inline">Add expense</span>
        </Button>
      }
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-heading">
          Expenses
        </h1>
        <p className="mt-2 text-muted">
          Filter, edit, and keep your spending list clean.
        </p>
      </div>

      <ExpensesManager mode="cards" showFilters />
    </AppShell>
  );
}
