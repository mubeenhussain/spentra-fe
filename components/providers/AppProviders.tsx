"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { setUnauthorizedHandler } from "@/lib/api";
import { hydrateAuth, logout } from "@/store/authSlice";
import { makeStore, useAppDispatch } from "@/store";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
    setUnauthorizedHandler(() => dispatch(logout()));
  }, [dispatch]);

  return children;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthBootstrap>{children}</AuthBootstrap>
      </ThemeProvider>
    </Provider>
  );
}
