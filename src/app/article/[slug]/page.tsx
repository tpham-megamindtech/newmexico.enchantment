import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllSlugs,
  getArticle,
  getRelatedArticles,
} from "@/lib/articles";
import { categoryName } from "@/lib/categories";
import { CoverImage } from "@/components/CoverImage";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ArticleCard } from "@/components/ArticleCard";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge slug={article.category} />
          <span className="text-sm text-ink-400">·</span>
          <time dateTime={article.date} className="text-sm text-ink-500">
            {formatDate(article.date)}
          </time>
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-500">{article.excerpt}</p>
      </div>

      {/* Cover + credit */}
      <figure className="my-8">
        <CoverImage
          src={article.coverImage}
          alt={article.title}
          sizes="(min-width: 768px) 768px, 94vw"
          priority
          rounded="rounded-2xl"
        />
        <figcaption className="mt-2 text-xs text-ink-400">
          Photograph: {article.imageCredit}
        </figcaption>
      </figure>

      {/* Body */}
      <div
        className="prose-article"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* Back to section */}
      <div className="mt-12 border-t border-sand-300 pt-6">
        <Link
          href={`/category/${article.category}`}
          className="text-sm font-semibold text-turq-600 hover:text-turq-700"
        >
          ← More in {categoryName(article.category)}
        </Link>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            Keep reading
          </h2>
          <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
