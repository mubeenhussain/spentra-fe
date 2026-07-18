import { BrandMark } from "@/components/brand/Logo";
import { LinkButton, ThemeIconButton } from "@/components/ui";

const features = [
  ["↗", "See every expense", "Keep daily spending organized in one clean, searchable place."],
  ["◫", "Understand your habits", "Simple monthly insights show where your money is really going."],
  ["✓", "Stay in control", "Filter by date and category so nothing slips through the cracks."],
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-background text-heading">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <BrandMark />
        <nav className="flex items-center gap-2 sm:gap-3">
          <ThemeIconButton />
          <LinkButton href="/login" variant="ghost">
            Log in
          </LinkButton>
          <LinkButton href="/signup">Get started</LinkButton>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:pb-32 lg:pt-24">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-soft-border bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-text">
            <span className="size-1.5 rounded-full bg-brand-hover" />
            Your money, finally organized
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-[-.045em] sm:text-6xl lg:text-7xl">
            Spend with clarity.
            <span className="block text-brand-text">Live with ease.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-muted">
            Spentra turns everyday expenses into clear, useful insights—so you
            can understand your habits and make every month count.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/signup" variant="brand" className="px-6 py-3.5">
              Start tracking for free
            </LinkButton>
            <LinkButton href="#features" variant="secondary" className="px-6 py-3.5">
              See how it works
            </LinkButton>
          </div>
          <p className="mt-5 text-xs text-muted-2">Free to start · No credit card required</p>
        </div>
        <DashboardPreview />
      </section>

      <section id="features" className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-brand-text">Everything you need</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Less time tracking. More confidence spending.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {features.map(([icon, title, text]) => (
              <article
                key={title}
                className="rounded-2xl border border-border-subtle bg-background p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-lg font-bold text-brand-text">
                  {icon}
                </span>
                <h3 className="mt-5 font-semibold text-heading">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-3xl bg-brand px-7 py-12 text-center text-brand-on sm:px-12 lg:flex-row lg:py-14 lg:text-left">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Ready to feel good about your money?
            </h2>
            <p className="mt-3 text-sm text-brand-on/65">
              Build better spending habits, one expense at a time.
            </p>
          </div>
          <LinkButton href="/signup" variant="accent" className="shrink-0 px-6 py-3.5">
            Create your free account
          </LinkButton>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border px-6 py-8 text-sm text-muted-2 sm:flex-row lg:px-8">
        <span className="flex items-center gap-2 font-semibold text-heading">
          <BrandMark size="sm" />
        </span>
        <p>© 2026 Spentra. Simple tracking, smarter spending.</p>
      </footer>
    </main>
  );
}

function DashboardPreview() {
  const expenses = [
    ["Groceries", "Food", "− $86.40", "bg-chip-a text-chip-a-text"],
    ["Monthly pass", "Transport", "− $42.00", "bg-chip-b text-chip-b-text"],
    ["Pharmacy", "Health", "− $18.25", "bg-chip-c text-chip-c-text"],
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-8 rounded-full bg-glow blur-3xl" />
      <div className="relative rotate-1 rounded-[28px] border border-border bg-surface p-4 shadow-[var(--shadow)] sm:p-6">
        <div className="flex items-center justify-between border-b border-border-subtle pb-5">
          <div>
            <p className="text-xs text-muted-2">Good morning, Alex</p>
            <p className="mt-1 font-semibold text-heading">Your monthly overview</p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-accent text-xs font-bold text-accent-on">
            AM
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-brand p-5 text-brand-on">
            <p className="text-xs text-brand-on/60">Total spent</p>
            <p className="mt-2 text-2xl font-semibold">$1,842.50</p>
            <p className="mt-3 text-xs text-brand-text">↓ 12% from last month</p>
          </div>
          <div className="rounded-2xl bg-brand-soft p-5">
            <p className="text-xs text-brand-text/70">Top category</p>
            <p className="mt-2 text-lg font-semibold text-heading">Food</p>
            <div className="mt-4 h-2 rounded-full bg-surface-3">
              <div className="h-2 w-3/4 rounded-full bg-brand-hover" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-heading">Recent expenses</p>
            <span className="text-xs font-medium text-brand-text">View all</span>
          </div>
          <div className="space-y-2">
            {expenses.map(([title, category, amount, color]) => (
              <div key={title} className="flex items-center gap-3 rounded-xl bg-surface-2 p-3">
                <span className={`grid size-9 place-items-center rounded-lg text-xs font-bold ${color}`}>
                  {title[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-heading">{title}</p>
                  <p className="text-xs text-muted-2">{category}</p>
                </div>
                <p className="text-sm font-semibold text-heading">{amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
