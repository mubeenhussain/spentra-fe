import Link from "next/link";

const features = [
  ["↗", "See every expense", "Keep daily spending organized in one clean, searchable place."],
  ["◫", "Understand your habits", "Simple monthly insights show where your money is really going."],
  ["✓", "Stay in control", "Filter by date and category so nothing slips through the cracks."],
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f8faf9] text-slate-950">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold">
          <Logo /> Spentra
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-950">
            Log in
          </Link>
          <Link href="/signup" className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600">
            Get started
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:pb-32 lg:pt-24">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Your money, finally organized
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-[-.045em] sm:text-6xl lg:text-7xl">
            Spend with clarity.
            <span className="block text-emerald-600">Live with ease.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-slate-600">
            Spentra turns everyday expenses into clear, useful insights—so you
            can understand your habits and make every month count.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className="rounded-xl bg-[#123c35] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-xl shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-600">
              Start tracking for free
            </Link>
            <a href="#features" className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-slate-700 hover:border-slate-300">
              See how it works
            </a>
          </div>
          <p className="mt-5 text-xs text-slate-400">Free to start · No credit card required</p>
        </div>
        <DashboardPreview />
      </section>

      <section id="features" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-emerald-600">Everything you need</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Less time tracking. More confidence spending.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {features.map(([icon, title, text]) => (
              <article key={title} className="rounded-2xl border border-slate-100 bg-[#f8faf9] p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
                <span className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-lg font-bold text-emerald-700">{icon}</span>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-3xl bg-[#123c35] px-7 py-12 text-center text-white sm:px-12 lg:flex-row lg:py-14 lg:text-left">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Ready to feel good about your money?</h2>
            <p className="mt-3 text-sm text-emerald-50/65">Build better spending habits, one expense at a time.</p>
          </div>
          <Link href="/signup" className="shrink-0 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-[#123c35] transition hover:bg-[#ffad8c]">
            Create your free account
          </Link>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200 px-6 py-8 text-sm text-slate-400 sm:flex-row lg:px-8">
        <span className="flex items-center gap-2 font-semibold text-slate-700"><Logo small /> Spentra</span>
        <p>© 2026 Spentra. Simple tracking, smarter spending.</p>
      </footer>
    </main>
  );
}

function DashboardPreview() {
  const expenses = [
    ["Groceries", "Food", "− $86.40", "bg-orange-100 text-orange-600"],
    ["Monthly pass", "Transport", "− $42.00", "bg-sky-100 text-sky-600"],
    ["Pharmacy", "Health", "− $18.25", "bg-violet-100 text-violet-600"],
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-8 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="relative rotate-1 rounded-[28px] border border-white bg-white p-4 shadow-2xl shadow-emerald-950/15 sm:p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <div>
            <p className="text-xs text-slate-400">Good morning, Alex</p>
            <p className="mt-1 font-semibold">Your monthly overview</p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-[#ffad8c] text-xs font-bold text-[#123c35]">AM</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#123c35] p-5 text-white">
            <p className="text-xs text-emerald-50/60">Total spent</p>
            <p className="mt-2 text-2xl font-semibold">$1,842.50</p>
            <p className="mt-3 text-xs text-emerald-300">↓ 12% from last month</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-xs text-emerald-800/60">Top category</p>
            <p className="mt-2 text-lg font-semibold text-emerald-950">Food</p>
            <div className="mt-4 h-2 rounded-full bg-emerald-100">
              <div className="h-2 w-3/4 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Recent expenses</p>
            <span className="text-xs font-medium text-emerald-600">View all</span>
          </div>
          <div className="space-y-2">
            {expenses.map(([title, category, amount, color]) => (
              <div key={title} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <span className={`grid size-9 place-items-center rounded-lg text-xs font-bold ${color}`}>{title[0]}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{title}</p>
                  <p className="text-xs text-slate-400">{category}</p>
                </div>
                <p className="text-sm font-semibold">{amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className={`grid place-items-center rounded-xl bg-emerald-400 text-[#123c35] ${small ? "size-7" : "size-9"}`}>
      <svg viewBox="0 0 24 24" className={small ? "size-4" : "size-5"} fill="none" stroke="currentColor" strokeWidth="2.3">
        <path d="M5 8h11a3 3 0 0 1 3 3v7H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10" />
        <circle cx="15.5" cy="13" r="1" fill="currentColor" />
      </svg>
    </span>
  );
}
