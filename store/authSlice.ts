import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";
import { clearToken, getToken, setToken } from "@/lib/auth-token";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Restore token from localStorage on app load */
    hydrateAuth(state) {
      const token = getToken();
      state.token = token;
      state.isAuthenticated = Boolean(token);
      state.isHydrated = true;
    },
    setCredentials(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      setToken(token);
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      clearToken();
    },
  },
});

export const { hydrateAuth, setCredentials, setUser, logout } =
  authSlice.actions;
export default authSlice.reducer;
