"use client";

import { formatMoney } from "@/lib/format";
import { useAppSelector } from "@/store";
import { selectAuth } from "@/store/authSlice";

/** Formats amounts using the signed-in user's currency (e.g. PKR). */
export function useMoney() {
  const currency = useAppSelector(selectAuth).user?.currency || "USD";
  return (amount: number) => formatMoney(amount, currency);
}
