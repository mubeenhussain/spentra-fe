"use client";

import { useEffect, useRef } from "react";
import { formatMoney } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  fetchSummary,
  openCreate,
  openDelete,
  openEdit,
  closeDelete,
  closeForm,
  setFilters,
  selectExpenses,
  updateExpense,
} from "@/store/expensesSlice";
import { ConfirmDialog, Spinner } from "@/components/ui";
import { ExpenseFiltersBar } from "@/components/expenses/ExpenseFiltersBar";
import { ExpenseFormModal } from "@/components/expenses/ExpenseFormModal";
import { ExpenseList } from "@/components/expenses/ExpenseList";

type Props = {
  mode?: "table" | "cards";
  showFilters?: boolean;
  limit?: number;
};

export function ExpensesManager({
  mode = "table",
  showFilters = true,
  limit,
}: Props) {
  const dispatch = useAppDispatch();
  const {
    items,
    filters,
    meta,
    status,
    error,
    formOpen,
    editing,
    deletingId,
  } = useAppSelector(selectExpenses);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const query = limit
      ? { page: 1, limit }
      : filters;

    dispatch(fetchExpenses(query));
    dispatch(
      fetchSummary(
        limit ? undefined : { from: filters.from, to: filters.to }
      )
    );
  }, [dispatch, filters, limit]);

  function onFilterChange(next: Partial<typeof filters>) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const apply = () => dispatch(setFilters(next));
    if ("title" in next) debounceRef.current = setTimeout(apply, 300);
    else apply();
  }

  async function refresh() {
    await dispatch(
      fetchExpenses(limit ? { page: 1, limit } : undefined)
    );
    await dispatch(
      fetchSummary(limit ? undefined : { from: filters.from, to: filters.to })
    );
  }

  return (
    <div className="space-y-5">
      {showFilters && (
        <ExpenseFiltersBar value={filters} onChange={onFilterChange} />
      )}

      {status === "loading" && items.length === 0 ? (
        <div className="flex justify-center py-16">
          <Spinner label="Loading expenses..." />
        </div>
      ) : (
        <ExpenseList
          mode={mode}
          items={limit ? items.slice(0, limit) : items}
          page={meta.page}
          totalPages={limit ? 1 : meta.totalPages}
          loading={status === "loading"}
          onPageChange={(page) => dispatch(setFilters({ page }))}
          onEdit={(expense) => dispatch(openEdit(expense))}
          onDelete={(id) => dispatch(openDelete(id))}
          onAdd={() => dispatch(openCreate())}
        />
      )}

      <ExpenseFormModal
        key={editing?._id ?? "create"}
        open={formOpen}
        expense={editing}
        loading={status === "saving"}
        error={formOpen ? error : null}
        onClose={() => dispatch(closeForm())}
        onSubmit={async (body) => {
          const action = editing
            ? await dispatch(updateExpense({ id: editing._id, body }))
            : await dispatch(createExpense(body));
          if (
            createExpense.fulfilled.match(action) ||
            updateExpense.fulfilled.match(action)
          ) {
            await refresh();
          }
        }}
      />

      <ConfirmDialog
        open={Boolean(deletingId)}
        title="Delete expense?"
        message="This cannot be undone. The expense will be removed from your list."
        loading={status === "saving"}
        onClose={() => dispatch(closeDelete())}
        onConfirm={async () => {
          if (!deletingId) return;
          const action = await dispatch(deleteExpense(deletingId));
          if (deleteExpense.fulfilled.match(action)) {
            await dispatch(fetchSummary());
          }
        }}
      />
    </div>
  );
}

export function SummaryCards() {
  const { summary } = useAppSelector(selectExpenses);

  const cards = [
    ["Total spent", formatMoney(summary?.total ?? 0)],
    ["Expenses", String(summary?.count ?? 0)],
    [
      "Top category",
      summary?.byCategory?.[0]?.category ?? "—",
    ],
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-heading">{value}</p>
        </div>
      ))}
    </div>
  );
}
