import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function FormField({ label, id, name, ...props }: FormFieldProps) {
  const inputId = id ?? name;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        {...props}
        id={inputId}
        name={name}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
      />
    </label>
  );
}

const variants = {
  primary:
    "bg-slate-950 text-white hover:bg-emerald-600",
  brand:
    "bg-[var(--brand)] text-white shadow-xl shadow-emerald-950/15 hover:-translate-y-0.5 hover:bg-emerald-600",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300",
  ghost: "text-slate-600 hover:text-slate-950",
  accent: "bg-emerald-400 text-[var(--brand)] hover:bg-[var(--accent)]",
} as const;

type Variant = keyof typeof variants;

function btnClass(variant: Variant, className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: Variant;
};

export function Button({
  loading,
  disabled,
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={btnClass(variant, className)}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  className = "",
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
}) {
  return (
    <Link href={href} className={btnClass(variant, className)}>
      {children}
    </Link>
  );
}

export function Spinner({ label }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-slate-500">
      <span
        aria-hidden="true"
        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      />
      {label}
    </span>
  );
}

export function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Spinner label="Loading..." />
    </div>
  );
}
