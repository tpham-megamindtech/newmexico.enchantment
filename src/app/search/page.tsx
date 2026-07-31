import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search stories across the New Mexico Enchantment Trail.",
};

export default function SearchPage() {
  // Metadata only — passed to the client component for in-browser filtering.
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-turq-600">
          Archive
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
          Search the trail
        </h1>
      </header>
      <Suspense fallback={<p className="text-center text-ink-500">Loading…</p>}>
        <SearchResults articles={articles} />
      </Suspense>
    </div>
  );
}
