import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { SearchBar } from "./SearchBar";

export function SiteHeader() {
  return (
    <header className="border-b border-sand-300 bg-sand-50/85 backdrop-blur supports-[backdrop-filter]:bg-sand-50/70">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top row: wordmark + search */}
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="hidden text-turq-500 sm:inline" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 20 8 8l4 7 3-5 6 10z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="18" cy="6" r="2.4" fill="var(--color-clay-500)" />
              </svg>
            </span>
            <span className="font-display text-3xl font-bold leading-none tracking-tight text-turq-700 sm:text-[2.6rem]">
              New Mexico Enchantment Trail
            </span>
          </Link>
          <div className="w-full sm:max-w-xs">
            <SearchBar size="md" placeholder="Search…" />
          </div>
        </div>

        {/* Category nav */}
        <nav aria-label="Sections" className="-mb-px overflow-x-auto">
          <ul className="flex min-w-max gap-1 pb-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="inline-block rounded-full px-3 py-1.5 font-medium text-ink-700 transition hover:bg-clay-500/10 hover:text-clay-700"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
