"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
        className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border border-slate-200 bg-emerald-50 text-xs font-bold text-[var(--brand)] transition hover:ring-2 hover:ring-emerald-200"
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
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          <div className="border-b border-slate-100 px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-slate-900">
              {name ?? "User"}
            </p>
            {email && (
              <p className="truncate text-xs text-slate-500">{email}</p>
            )}
          </div>
          <button
            role="menuitem"
            className="w-full px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
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
