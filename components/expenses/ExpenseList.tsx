"use client";

import { Button, EmptyState, Pagination } from "@/components/ui";
import { formatDate, formatMoney } from "@/lib/format";
import type { Expense } from "@/types";

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
          onAdd ? (
            <Button onClick={onAdd}>Add expense</Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {mode === "cards" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((expense) => (
            <article
              key={expense._id}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{expense.title}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {expense.category} · {formatDate(expense.date)}
                  </p>
                </div>
                <p className="font-semibold text-slate-950">
                  {formatMoney(expense.amount)}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="secondary"
                  className="px-3 py-1.5"
                  onClick={() => onEdit(expense)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="px-3 py-1.5 text-red-600 hover:text-red-700"
                  onClick={() => onDelete(expense._id)}
                >
                  Delete
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Category</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Date</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((expense) => (
                <tr key={expense._id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {expense.title}
                    <p className="mt-0.5 text-xs text-slate-400 sm:hidden">
                      {expense.category}
                    </p>
                  </td>
                  <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                    {expense.category}
                  </td>
                  <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                    {formatDate(expense.date)}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {formatMoney(expense.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        className="px-2 py-1"
                        onClick={() => onEdit(expense)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-2 py-1 text-red-600"
                        onClick={() => onDelete(expense._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}
