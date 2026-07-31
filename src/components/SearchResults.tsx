"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { ArticleMeta } from "@/lib/articles";
import { ArticleCard } from "./ArticleCard";
import { SearchBar } from "./SearchBar";
import { categoryName } from "@/lib/categories";

export function SearchResults({ articles }: { articles: ArticleMeta[] }) {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();

  const results = useMemo(() => {
    if (!query) return [];
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return articles.filter((a) => {
      const haystack = `${a.title} ${a.excerpt} ${categoryName(a.category)}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
  }, [articles, query]);

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <SearchBar size="lg" placeholder="Search the trail…" />
      </div>

      {!query ? (
        <p className="mt-10 text-center text-ink-500">
          Type a place, a dish, or a section to search the archive.
        </p>
      ) : (
        <>
          <p className="mt-8 text-sm text-ink-500">
            {results.length === 0
              ? "No stories matched"
              : `${results.length} ${results.length === 1 ? "story" : "stories"} for`}{" "}
            <span className="font-semibold text-ink-900">“{query}”</span>
          </p>

          {results.length > 0 && (
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
