"use client";

import { useState, type FormEvent } from "react";
import { Button, FormField, Modal, SelectField } from "@/components/ui";
import { isBulkExpense, toDateInput } from "@/lib/format";
import {
  EXPENSE_CATEGORIES,
  type CreateExpenseInput,
  type Expense,
  type ExpenseCategory,
} from "@/types";

type Props = {
  open: boolean;
  expense?: Expense | null;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (items: CreateExpenseInput[]) => void;
};

type Row = {
  key: string;
  title: string;
  customTitle: boolean;
  amount: string;
  category: ExpenseCategory;
};

function emptyRow(): Row {
  return {
    key: crypto.randomUUID(),
    title: "",
    customTitle: false,
    amount: "",
    category: "Food",
  };
}

function rowsFromExpense(expense?: Expense | null): Row[] {
  if (!expense?.items?.length) return [emptyRow()];
  return expense.items.map((item) => {
    const custom = Boolean(item.title && item.title !== item.category);
    return {
      key: item._id || crypto.randomUUID(),
      title: custom ? item.title : "",
      customTitle: custom,
      amount: String(item.amount ?? ""),
      category: item.category,
    };
  });
}

export function ExpenseFormModal({
  open,
  expense,
  loading,
  error,
  onClose,
  onSubmit,
}: Props) {
  const editing = Boolean(expense);
  const editingBulk = Boolean(expense && isBulkExpense(expense));
  const editingSingle = editing && !editingBulk;

  const [rows, setRows] = useState<Row[]>(() =>
    editingBulk ? rowsFromExpense(expense) : [emptyRow()]
  );
  const [sharedDate, setSharedDate] = useState(
    toDateInput(expense?.date ?? expense?.items?.[0]?.date)
  );
  const [sharedNote, setSharedNote] = useState(
    expense?.note ?? expense?.items?.[0]?.note ?? ""
  );

  function updateRow(key: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (editingSingle && expense) {
      const fd = new FormData(e.currentTarget);
      onSubmit([
        {
          title: String(fd.get("title") ?? "").trim(),
          amount: Number(fd.get("amount")),
          category: String(fd.get("category")) as ExpenseCategory,
          date: String(fd.get("date")),
          note: String(fd.get("note") ?? "").trim() || undefined,
        },
      ]);
      return;
    }

    const note = sharedNote.trim() || undefined;
    const items = rows
      .map((r) => {
        const custom = r.title.trim();
        return {
          title: r.customTitle && custom ? custom : r.category,
          amount: Number(r.amount),
          category: r.category,
          date: sharedDate,
          note,
        };
      })
      .filter((r) => r.amount > 0);

    if (!items.length) return;
    onSubmit(items);
  }

  const multiForm = !editingSingle;

  return (
    <Modal
      open={open}
      title={editing ? "Edit expense" : "Add expenses"}
      onClose={onClose}
    >
      <form className="max-h-[70vh] space-y-4 overflow-y-auto pr-1" onSubmit={handleSubmit}>
        {editingSingle ? (
          <>
            <FormField
              label="Title"
              name="title"
              required
              minLength={2}
              defaultValue={expense?.title}
              placeholder="Groceries"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Amount"
                name="amount"
                type="number"
                required
                min={0.01}
                step="0.01"
                defaultValue={expense?.amount}
                placeholder="0.00"
              />
              <SelectField
                label="Category"
                name="category"
                required
                defaultValue={expense?.category ?? "Food"}
                options={EXPENSE_CATEGORIES.map((c) => ({ value: c, label: c }))}
              />
            </div>
            <FormField
              label="Date"
              name="date"
              type="date"
              required
              defaultValue={toDateInput(expense?.date)}
            />
            <FormField
              label="Note"
              name="note"
              defaultValue={expense?.note}
              placeholder="Optional"
            />
          </>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="Date"
                type="date"
                required
                value={sharedDate}
                onChange={(e) => setSharedDate(e.target.value)}
              />
              <FormField
                label="Note"
                value={sharedNote}
                onChange={(e) => setSharedNote(e.target.value)}
                placeholder="Optional"
              />
            </div>

            {rows.map((row, index) => (
              <div
                key={row.key}
                className="space-y-3 rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-heading">
                    Expense {index + 1}
                  </p>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      className="text-xs font-medium text-danger-text hover:text-danger"
                      onClick={() =>
                        setRows((prev) => prev.filter((r) => r.key !== row.key))
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField
                    label="Amount"
                    type="number"
                    required
                    min={0.01}
                    step="0.01"
                    value={row.amount}
                    onChange={(e) => updateRow(row.key, { amount: e.target.value })}
                    placeholder="0.00"
                  />
                  <SelectField
                    label="Category"
                    required
                    value={row.category}
                    onChange={(e) =>
                      updateRow(row.key, {
                        category: e.target.value as ExpenseCategory,
                      })
                    }
                    options={EXPENSE_CATEGORIES.map((c) => ({
                      value: c,
                      label: c,
                    }))}
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading"
                  onClick={() =>
                    updateRow(row.key, {
                      customTitle: !row.customTitle,
                      title: row.customTitle ? "" : row.title,
                    })
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M4 6h16M4 12h10M4 18h14" strokeLinecap="round" />
                  </svg>
                  {row.customTitle ? "Hide description" : "Add description"}
                </button>

                {row.customTitle && (
                  <FormField
                    label="Description"
                    required
                    minLength={2}
                    value={row.title}
                    onChange={(e) => updateRow(row.key, { title: e.target.value })}
                    placeholder="Groceries"
                  />
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => setRows((prev) => [...prev, emptyRow()])}
            >
              + Add another expense
            </Button>
          </>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-text">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {editing
              ? "Save changes"
              : multiForm && rows.length > 1
                ? `Add ${rows.length} expenses`
                : "Add expense"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
