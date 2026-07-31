import Link from "next/link";

export function Pagination({
  basePath,
  currentPage,
  totalPages,
}: {
  basePath: string; // e.g. /category/food-dining
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const linkCls =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3.5 text-sm font-medium transition";

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={href(currentPage - 1)}
          className={`${linkCls} border border-sand-300 text-ink-700 hover:bg-sand-100`}
        >
          ← Prev
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={
            p === currentPage
              ? `${linkCls} bg-clay-600 text-white`
              : `${linkCls} border border-sand-300 text-ink-700 hover:bg-sand-100`
          }
        >
          {p}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          className={`${linkCls} border border-sand-300 text-ink-700 hover:bg-sand-100`}
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
