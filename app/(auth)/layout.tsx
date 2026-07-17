import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f8faf9] lg:grid lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-[#123c35] p-12 text-white lg:flex lg:flex-col">
        <div className="absolute -left-32 top-1/3 size-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-[#ff8a5b]/15 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-3 text-xl font-bold">
          <Logo />
          Spentra
        </Link>

        <div className="relative my-auto max-w-xl">
          <p className="mb-5 text-sm font-semibold tracking-[.18em] text-emerald-300 uppercase">
            Money made simple
          </p>
          <h2 className="text-5xl font-semibold leading-[1.12] tracking-tight">
            Know where it goes.
            <br />
            <span className="text-[#ffad8c]">Keep more of it.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-emerald-50/65">
            One calm place for everyday spending, monthly trends, and the
            little wins that add up.
          </p>

          <div className="mt-12 grid max-w-md grid-cols-2 gap-4">
            <Stat value="$1,248" label="saved this month" accent />
            <Stat value="32%" label="less on dining" />
          </div>
        </div>

        <p className="relative text-xs text-emerald-50/40">
          Simple tracking. Better money habits.
        </p>
      </section>

      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-12 lg:px-16 xl:px-24">
        <Link href="/" className="mb-12 flex items-center gap-2.5 text-lg font-bold text-slate-950 lg:hidden">
          <Logo />
          Spentra
        </Link>
        <div className="flex flex-1 items-center justify-center py-8">{children}</div>
        <p className="mt-8 text-center text-xs text-slate-400">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </section>
    </main>
  );
}

function Logo() {
  return (
    <span className="grid size-9 place-items-center rounded-xl bg-emerald-400 text-[#123c35] shadow-lg shadow-emerald-950/10">
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.3">
        <path d="M5 8h11a3 3 0 0 1 3 3v7H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10" />
        <circle cx="15.5" cy="13" r="1" fill="currentColor" />
      </svg>
    </span>
  );
}

function Stat({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/7 p-5 backdrop-blur">
      <p className={`text-2xl font-semibold ${accent ? "text-emerald-300" : "text-[#ffad8c]"}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-emerald-50/55">{label}</p>
    </div>
  );
}
