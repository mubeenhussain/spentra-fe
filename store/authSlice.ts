import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "@/lib/services";
import { clearToken, getToken, setToken } from "@/lib/api";
import type { User } from "@/types";
import { ApiClientError } from "@/lib/api";

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isHydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  isHydrated: false,
};

function getErrorMessage(err: unknown) {
  return err instanceof ApiClientError
    ? err.message
    : "Something went wrong. Try again.";
}

export const login = createAsyncThunk(
  "auth/login",
  async (body: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await authApi.login(body);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    body: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await authApi.register(body);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.me();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(state) {
      const token = getToken();
      state.token = token;
      state.isHydrated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      clearToken();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state: AuthState) => {
      state.status = "loading";
      state.error = null;
    };
    const rejected = (state: AuthState, action: { payload: unknown }) => {
      state.status = "failed";
      state.error = String(action.payload ?? "Request failed");
    };
    const setSession = (
      state: AuthState,
      action: { payload: { user: User; token: string } }
    ) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      setToken(action.payload.token);
    };

    builder
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, setSession)
      .addCase(login.rejected, rejected)
      .addCase(register.pending, pending)
      .addCase(register.fulfilled, setSession)
      .addCase(register.rejected, rejected)
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.token = null;
        clearToken();
      });
  },
});

export const { hydrateAuth, logout, clearAuthError } = authSlice.actions;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  Boolean(state.auth.token);
export default authSlice.reducer;
