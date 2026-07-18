"use client";

import { type FormEvent } from "react";
import { Button, FormField, Modal, SelectField } from "@/components/ui";
import { toDateInput } from "@/lib/format";
import { EXPENSE_CATEGORIES, type Expense, type ExpenseCategory } from "@/types";

type Props = {
  open: boolean;
  expense?: Expense | null;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (body: {
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    note?: string;
  }) => void;
};

export function ExpenseFormModal({
  open,
  expense,
  loading,
  error,
  onClose,
  onSubmit,
}: Props) {
  const editing = Boolean(expense);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      title: String(fd.get("title") ?? "").trim(),
      amount: Number(fd.get("amount")),
      category: String(fd.get("category")) as ExpenseCategory,
      date: String(fd.get("date")),
      note: String(fd.get("note") ?? "").trim() || undefined,
    });
  }

  return (
    <Modal
      open={open}
      title={editing ? "Edit expense" : "Add expense"}
      onClose={onClose}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            {editing ? "Save changes" : "Add expense"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
