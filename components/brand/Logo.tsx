import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-7" : "size-9";
  const icon = size === "sm" ? "size-4" : "size-5";

  return (
    <span className={`grid place-items-center rounded-xl bg-emerald-400 text-[var(--brand)] ${box}`}>
      <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="2.3">
        <path d="M5 8h11a3 3 0 0 1 3 3v7H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10" />
        <circle cx="15.5" cy="13" r="1" fill="currentColor" />
      </svg>
    </span>
  );
}

export function BrandMark({ size = "md", href = "/" }: { size?: "sm" | "md"; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 font-bold text-inherit">
      <Logo size={size} />
      Spentra
    </Link>
  );
}
