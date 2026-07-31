import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORY_SLUGS, getCategory } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 18;

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.tagline,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const { page } = await searchParams;
  const articles = getArticlesByCategory(category.slug);
  const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = articles.slice(start, start + PER_PAGE);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="border-b border-sand-300 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-turq-600">
          Section
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-500">
          {category.tagline}
        </p>
      </header>

      <div className="grid gap-x-6 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((article, i) => (
          <ArticleCard key={article.slug} article={article} priority={i < 3} />
        ))}
      </div>

      <Pagination
        basePath={`/category/${category.slug}`}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
