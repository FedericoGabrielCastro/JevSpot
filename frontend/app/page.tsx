export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h1 className="text-lg font-semibold tracking-tight">
          Jev Location Intelligence
        </h1>
      </header>
      <main className="grid flex-1 grid-cols-1 lg:grid-cols-[20rem_1fr]">
        <aside className="border-b border-zinc-200 p-6 lg:border-r lg:border-b-0 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Analysis form and priorities will live here. The map stays the
            primary surface.
          </p>
        </aside>
        <section
          aria-label="Map"
          className="flex items-center justify-center bg-zinc-100 p-6 dark:bg-zinc-900"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Map scaffold. No analysis data yet.
          </p>
        </section>
      </main>
    </div>
  );
}
