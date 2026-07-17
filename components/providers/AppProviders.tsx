"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { makeStore } from "@/store";
import { makeQueryClient } from "@/lib/query-client";
import { AuthHydrator } from "@/components/providers/AuthHydrator";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthHydrator>{children}</AuthHydrator>
      </QueryClientProvider>
    </Provider>
  );
}
