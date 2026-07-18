"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { hydrateAuth } from "@/store/authSlice";
import { makeStore, useAppDispatch } from "@/store";

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);
  return children;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());

  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  );
}
