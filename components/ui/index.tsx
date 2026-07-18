import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

const fieldClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

export type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function FormField({ label, id, name, ...props }: FormFieldProps) {
  const inputId = id ?? name;
  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input {...props} id={inputId} name={name} className={fieldClass} />
    </label>
  );
}

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
};

export function SelectField({
  label,
  id,
  name,
  options,
  ...props
}: SelectFieldProps) {
  const inputId = id ?? name;
  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <select {...props} id={inputId} name={name} className={fieldClass}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const variants = {
  primary: "bg-slate-950 text-white hover:bg-emerald-600",
  brand:
    "bg-[var(--brand)] text-white shadow-xl shadow-emerald-950/15 hover:-translate-y-0.5 hover:bg-emerald-600",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300",
  ghost: "text-slate-600 hover:text-slate-950",
  accent: "bg-emerald-400 text-[var(--brand)] hover:bg-[var(--accent)]",
  danger: "bg-red-600 text-white hover:bg-red-700",
} as const;

type Variant = keyof typeof variants;

function btnClass(variant: Variant, className = "") {
  return `inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-2.5 sm:text-sm ${variants[variant]} ${className}`;
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

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
      <p className="font-semibold text-slate-900">{title}</p>
      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-950/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
        {children}
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  loading,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm leading-6 text-slate-600">{message}</p>
    </Modal>
  );
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 pt-4">
      <p className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="px-3 py-2"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Prev
        </Button>
        <Button
          variant="secondary"
          className="px-3 py-2"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
