import { create } from "zustand";
import type { ExpenseFilters } from "@/types";

interface UiState {
  /** Expense list filters (synced to API query params) */
  filters: ExpenseFilters;
  setFilters: (filters: Partial<ExpenseFilters>) => void;
  resetFilters: () => void;

  /** Modals / drawers */
  isExpenseFormOpen: boolean;
  editingExpenseId: string | null;
  openCreateExpense: () => void;
  openEditExpense: (id: string) => void;
  closeExpenseForm: () => void;

  isDeleteConfirmOpen: boolean;
  deletingExpenseId: string | null;
  openDeleteConfirm: (id: string) => void;
  closeDeleteConfirm: () => void;
}

const defaultFilters: ExpenseFilters = {
  from: undefined,
  to: undefined,
  category: undefined,
  title: undefined,
  page: 1,
  limit: 10,
};

export const useUiStore = create<UiState>((set) => ({
  filters: { ...defaultFilters },
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),

  isExpenseFormOpen: false,
  editingExpenseId: null,
  openCreateExpense: () =>
    set({ isExpenseFormOpen: true, editingExpenseId: null }),
  openEditExpense: (id) =>
    set({ isExpenseFormOpen: true, editingExpenseId: id }),
  closeExpenseForm: () =>
    set({ isExpenseFormOpen: false, editingExpenseId: null }),

  isDeleteConfirmOpen: false,
  deletingExpenseId: null,
  openDeleteConfirm: (id) =>
    set({ isDeleteConfirmOpen: true, deletingExpenseId: id }),
  closeDeleteConfirm: () =>
    set({ isDeleteConfirmOpen: false, deletingExpenseId: null }),
}));
