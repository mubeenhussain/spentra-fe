"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

/** Compact theme switch for public headers */
export function ThemeIconButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-9 place-items-center rounded-xl border border-border bg-surface text-heading transition hover:bg-surface-2"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
        {isDark ? (
          <path d="M12 3v2m0 14v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M3 12h2m14 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        ) : (
          <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z" />
        )}
      </svg>
    </button>
  );
}
