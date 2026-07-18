"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/authSlice";

function initials(name?: string) {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

export function UserMenu({
  name,
  email,
  imageUrl,
}: {
  name?: string;
  email?: string;
  imageUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-brand-soft text-xs font-bold text-brand transition hover:ring-2 hover:ring-ring"
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name ?? "User"} className="size-full object-cover" />
        ) : (
          initials(name)
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-[var(--shadow)]"
        >
          <div className="border-b border-border-subtle px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-heading">
              {name ?? "User"}
            </p>
            {email && (
              <p className="truncate text-xs text-muted">{email}</p>
            )}
          </div>
          <ThemeToggle />
          <button
            role="menuitem"
            className="w-full px-3 py-2.5 text-left text-sm font-medium text-danger-text hover:bg-danger-soft"
            onClick={() => {
              setOpen(false);
              dispatch(logout());
              router.replace("/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
