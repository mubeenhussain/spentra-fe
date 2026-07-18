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
        <Button onClick={() => dispatch(openCreate())}>Add expense</Button>
      }
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Expenses
        </h1>
        <p className="mt-2 text-slate-500">
          Filter, edit, and keep your spending list clean.
        </p>
      </div>

      <ExpensesManager mode="table" showFilters />
    </AppShell>
  );
}
