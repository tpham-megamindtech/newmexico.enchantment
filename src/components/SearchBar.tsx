"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({
  size = "md",
  placeholder = "Search the trail — chile, canyons, galleries…",
}: {
  size?: "md" | "lg";
  placeholder?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  const pad = size === "lg" ? "py-3.5 pl-12 pr-4 text-base" : "py-2.5 pl-11 pr-4 text-sm";

  return (
    <form onSubmit={submit} role="search" className="relative w-full">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-400">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label="Search articles"
        className={`w-full rounded-full border border-sand-300 bg-white/80 ${pad} text-ink-900 shadow-sm outline-none transition placeholder:text-ink-400 focus:border-turq-400 focus:ring-2 focus:ring-turq-400/30`}
      />
    </form>
  );
}
