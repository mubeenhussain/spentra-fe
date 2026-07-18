"use client";

import { FormField, SelectField } from "@/components/ui";
import { EXPENSE_CATEGORIES, type ExpenseFilters } from "@/types";

type Props = {
  value: ExpenseFilters;
  onChange: (next: Partial<ExpenseFilters>) => void;
};

export function ExpenseFiltersBar({ value, onChange }: Props) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4">
      <FormField
        label="Search title"
        name="title"
        value={value.title ?? ""}
        placeholder="Coffee, rent..."
        onChange={(e) => onChange({ title: e.target.value })}
      />
      <SelectField
        label="Category"
        name="category"
        value={value.category ?? ""}
        onChange={(e) => onChange({ category: e.target.value })}
        options={[
          { value: "", label: "All categories" },
          ...EXPENSE_CATEGORIES.map((c) => ({ value: c, label: c })),
        ]}
      />
      <FormField
        label="From"
        name="from"
        type="date"
        value={value.from ?? ""}
        onChange={(e) => onChange({ from: e.target.value })}
      />
      <FormField
        label="To"
        name="to"
        type="date"
        value={value.to ?? ""}
        onChange={(e) => onChange({ to: e.target.value })}
      />
    </div>
  );
}
