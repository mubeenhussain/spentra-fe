"use client";

import { useState } from "react";
import { Button, EmptyState, Pagination } from "@/components/ui";
import { useMoney } from "@/hooks/useMoney";
import {
  expenseAmount,
  expenseLabel,
  formatDate,
  isBulkExpense,
} from "@/lib/format";
import type { Expense, ExpenseItem } from "@/types";

type Props = {
  items: Expense[];
  page: number;
  totalPages: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  onAdd?: () => void;
  mode?: "table" | "cards";
};

function ItemsTable({
  items,
  money,
}: {
  items: ExpenseItem[];
  money: (n: number) => string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border-subtle">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-2 text-muted">
          <tr>
            <th className="px-3 py-2 font-medium">Title</th>
            <th className="px-3 py-2 font-medium">Category</th>
            <th className="px-3 py-2 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t border-border-subtle">
              <td className="px-3 py-2 text-heading">{item.title}</td>
              <td className="px-3 py-2 text-muted">{item.category}</td>
              <td className="px-3 py-2 font-medium text-heading">
                {money(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExpenseRow({
  expense,
  mode,
  onEdit,
  onDelete,
}: {
  expense: Expense;
  mode: "table" | "cards";
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}) {
  const money = useMoney();
  const [open, setOpen] = useState(false);
  const bulk = isBulkExpense(expense);
  const items = expense.items ?? [];
  const amount = expenseAmount(expense);
  const label = expenseLabel(expense);
  const category =
    expense.category ||
    (items.length
      ? [...new Set(items.map((i) => i.category))].join(", ")
      : "—");
  const meta = `${category} · ${formatDate(expense.date)}${
    bulk ? ` · ${expense.count ?? items.length} items` : ""
  }`;

  const actions = (
    <div className="flex items-center gap-0.5">
      {bulk && items.length > 0 && (
        <Button
          variant="ghost"
          className="px-2 py-1"
          aria-label={open ? "Hide" : "Open"}
          title={open ? "Hide" : "Open"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {open ? (
              <path
                d="M18 15 12 9 6 15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </Button>
      )}
      <Button
        variant="ghost"
        className="px-2 py-1"
        aria-label="Edit"
        title="Edit"
        onClick={() => onEdit(expense)}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path
            d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <Button
        variant="ghost"
        className="px-2 py-1 text-danger-text"
        aria-label="Delete"
        title="Delete"
        onClick={() => onDelete(expense._id)}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path
            d="M3 6h18M8 6V4h8v2m-1 0v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6h10Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );

  if (mode === "cards") {
    return (
      <article className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-heading">{label}</p>
            <p className="mt-1 text-xs text-muted-2">{meta}</p>
          </div>
          <p className="font-semibold text-heading">{money(amount)}</p>
        </div>
        <div className="mt-3 flex justify-end">{actions}</div>
        {open && items.length > 0 && (
          <div className="mt-3">
            <ItemsTable items={items} money={money} />
          </div>
        )}
      </article>
    );
  }

  return (
    <>
      <tr className="border-b border-border-subtle">
        <td className="px-4 py-3 font-medium text-heading">
          {label}
          <p className="mt-0.5 text-xs text-muted-2 sm:hidden">{meta}</p>
        </td>
        <td className="hidden px-4 py-3 text-muted sm:table-cell">
          {category}
        </td>
        <td className="hidden px-4 py-3 text-muted md:table-cell">
          {formatDate(expense.date)}
        </td>
        <td className="px-4 py-3 font-semibold text-heading">
          {money(amount)}
        </td>
        <td className="px-4 py-3">
          <div className="flex justify-end">{actions}</div>
        </td>
      </tr>
      {open && items.length > 0 && (
        <tr className="border-b border-border-subtle bg-surface-2/40">
          <td colSpan={5} className="px-4 py-3">
            <ItemsTable items={items} money={money} />
          </td>
        </tr>
      )}
    </>
  );
}

export function ExpenseList({
  items,
  page,
  totalPages,
  loading,
  onPageChange,
  onEdit,
  onDelete,
  onAdd,
  mode = "table",
}: Props) {
  if (!loading && items.length === 0) {
    return (
      <EmptyState
        title="No expenses yet"
        description="Add your first expense to start tracking."
        action={
          onAdd ? <Button onClick={onAdd}>Add expense</Button> : undefined
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {mode === "cards" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((expense) => (
            <ExpenseRow
              key={expense._id}
              expense={expense}
              mode="cards"
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border-subtle bg-surface-2 text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  Category
                </th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((expense) => (
                <ExpenseRow
                  key={expense._id}
                  expense={expense}
                  mode="table"
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}
