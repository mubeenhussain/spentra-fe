"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/services";
import { queryKeys } from "@/lib/query-keys";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, setCredentials, setUser } from "@/store/authSlice";
import type { AuthResponse } from "@/types";

function usePersistSession() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  return (data: AuthResponse) => {
    dispatch(setCredentials({ user: data.user, token: data.token }));
    queryClient.setQueryData(queryKeys.auth.me, data.user);
    router.replace("/dashboard");
  };
}

export function useMeQuery(enabled = true) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const user = await authApi.me();
      dispatch(setUser(user));
      return user;
    },
    enabled: enabled && isAuthenticated,
  });
}

export function useLoginMutation() {
  const persist = usePersistSession();
  return useMutation({ mutationFn: authApi.login, onSuccess: persist });
}

export function useRegisterMutation() {
  const persist = usePersistSession();
  return useMutation({ mutationFn: authApi.register, onSuccess: persist });
}

export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    dispatch(logout());
    queryClient.clear();
    router.replace("/login");
  };
}
