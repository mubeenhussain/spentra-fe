export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-zinc-950">
      <main className="flex max-w-lg flex-col items-center gap-6 text-center">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          Spentra
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Expense Tracker
        </h1>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Register, log in, and manage personal expenses with a simple monthly
          summary by category.
        </p>
        <p className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
          Phase 0 setup complete — API base:{" "}
          <code className="text-zinc-800 dark:text-zinc-200">
            {process.env.NEXT_PUBLIC_API_URL}
          </code>
        </p>
      </main>
    </div>
  );
}
