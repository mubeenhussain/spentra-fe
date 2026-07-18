"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchMe,
  selectAuth,
  selectIsAuthenticated,
} from "@/store/authSlice";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isHydrated } = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) router.replace("/login");
  }, [isHydrated, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && !user) dispatch(fetchMe());
  }, [dispatch, isAuthenticated, user]);

  if (!isHydrated || !isAuthenticated) return <PageLoader />;

  return children;
}
