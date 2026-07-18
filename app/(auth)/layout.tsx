import { BrandMark } from "@/components/brand/Logo";
import { ThemeIconButton } from "@/components/ui";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background lg:grid lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-brand p-12 text-brand-on lg:flex lg:flex-col">
        <div className="absolute -left-32 top-1/3 size-80 rounded-full bg-brand-hover/20 blur-3xl" />
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-accent/15 blur-3xl" />

        <div className="relative flex items-center justify-between text-xl [&_a]:text-brand-on">
          <BrandMark />
          <ThemeIconButton />
        </div>

        <div className="relative my-auto max-w-xl">
          <p className="mb-5 text-sm font-semibold tracking-[.18em] text-brand-text uppercase">
            Money made simple
          </p>
          <h2 className="text-5xl font-semibold leading-[1.12] tracking-tight">
            Know where it goes.
            <br />
            <span className="text-accent">Keep more of it.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-brand-on/65">
            One calm place for everyday spending, monthly trends, and the
            little wins that add up.
          </p>

          <div className="mt-12 grid max-w-md grid-cols-2 gap-4">
            <Stat value="$1,248" label="saved this month" accent />
            <Stat value="32%" label="less on dining" />
          </div>
        </div>

        <p className="relative text-xs text-brand-on/40">
          Simple tracking. Better money habits.
        </p>
      </section>

      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-12 lg:px-16 xl:px-24">
        <div className="mb-12 flex items-center justify-between text-lg lg:hidden">
          <BrandMark />
          <ThemeIconButton />
        </div>
        <div className="flex flex-1 items-center justify-center py-8">{children}</div>
        <p className="mt-8 text-center text-xs text-muted-2">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </section>
    </main>
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
    <div className="rounded-2xl border border-brand-on/10 bg-brand-on/7 p-5 backdrop-blur">
      <p className={`text-2xl font-semibold ${accent ? "text-brand-text" : "text-accent"}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-brand-on/55">{label}</p>
    </div>
  );
}
