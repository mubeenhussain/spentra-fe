import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { expensesApi } from "@/lib/services";
import { getErrorMessage } from "@/lib/format";
import type {
  CreateExpenseInput,
  Expense,
  ExpenseFilters,
  Summary,
  UpdateExpenseInput,
} from "@/types";

const defaultFilters: ExpenseFilters = {
  page: 1,
  limit: 10,
  title: "",
  category: "",
  from: "",
  to: "",
};

interface ExpensesState {
  items: Expense[];
  recent: Expense[];
  summary: Summary | null;
  filters: ExpenseFilters;
  meta: { page: number; limit: number; total: number; totalPages: number };
  status: "idle" | "loading" | "saving" | "failed";
  error: string | null;
  formOpen: boolean;
  editing: Expense | null;
  deletingId: string | null;
}

const initialState: ExpensesState = {
  items: [],
  recent: [],
  summary: null,
  filters: defaultFilters,
  meta: { page: 1, limit: 10, total: 0, totalPages: 1 },
  status: "idle",
  error: null,
  formOpen: false,
  editing: null,
  deletingId: null,
};

export const fetchExpenses = createAsyncThunk(
  "expenses/list",
  async (filters: ExpenseFilters | undefined, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { expenses: ExpensesState };
      return await expensesApi.list(filters ?? state.expenses.filters);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const fetchSummary = createAsyncThunk(
  "expenses/summary",
  async (
    params: Pick<ExpenseFilters, "from" | "to"> | undefined,
    { rejectWithValue }
  ) => {
    try {
      return await expensesApi.summary(params);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const createExpense = createAsyncThunk(
  "expenses/create",
  async (body: CreateExpenseInput, { rejectWithValue }) => {
    try {
      return await expensesApi.create(body);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async (
    { id, body }: { id: string; body: UpdateExpenseInput },
    { rejectWithValue }
  ) => {
    try {
      return await expensesApi.update(id, body);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await expensesApi.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<ExpenseFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
        page: action.payload.page ?? 1,
      };
    },
    openCreate(state) {
      state.formOpen = true;
      state.editing = null;
      state.error = null;
    },
    openEdit(state, action: PayloadAction<Expense>) {
      state.formOpen = true;
      state.editing = action.payload;
      state.error = null;
    },
    closeForm(state) {
      state.formOpen = false;
      state.editing = null;
    },
    openDelete(state, action: PayloadAction<string>) {
      state.deletingId = action.payload;
    },
    closeDelete(state) {
      state.deletingId = null;
    },
    clearExpenseError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload.data;
        state.meta = action.payload.meta;
        if ((state.filters.page ?? 1) === 1 && !state.filters.title && !state.filters.category) {
          state.recent = action.payload.data.slice(0, 5);
        }
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload ?? "Failed to load expenses");
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      .addCase(createExpense.pending, (state) => {
        state.status = "saving";
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state) => {
        state.status = "idle";
        state.formOpen = false;
        state.editing = null;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload ?? "Failed to create");
      })
      .addCase(updateExpense.pending, (state) => {
        state.status = "saving";
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state) => {
        state.status = "idle";
        state.formOpen = false;
        state.editing = null;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload ?? "Failed to update");
      })
      .addCase(deleteExpense.pending, (state) => {
        state.status = "saving";
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.status = "idle";
        state.deletingId = null;
        state.items = state.items.filter((e) => e._id !== action.payload);
        state.recent = state.recent.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload ?? "Failed to delete");
      });
  },
});

export const {
  setFilters,
  openCreate,
  openEdit,
  closeForm,
  openDelete,
  closeDelete,
  clearExpenseError,
} = expensesSlice.actions;

export const selectExpenses = (state: { expenses: ExpensesState }) =>
  state.expenses;

export default expensesSlice.reducer;
