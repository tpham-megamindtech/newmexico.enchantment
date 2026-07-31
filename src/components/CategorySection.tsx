import Link from "next/link";
import type { Category } from "@/lib/categories";
import type { ArticleMeta } from "@/lib/articles";
import { CoverImage } from "./CoverImage";
import { CategoryBadge } from "./CategoryBadge";

function ListItem({ article }: { article: ArticleMeta }) {
  return (
    <article className="group flex gap-3.5">
      <Link
        href={`/article/${article.slug}`}
        className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-sand-200 sm:w-32"
      >
        <CoverImage
          src={article.coverImage}
          alt={article.title}
          sizes="130px"
          rounded="rounded-lg"
        />
      </Link>
      <div className="min-w-0">
        <h4 className="font-display text-[0.98rem] font-semibold leading-snug text-ink-900">
          <Link href={`/article/${article.slug}`} className="hover:text-clay-700">
            {article.title}
          </Link>
        </h4>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-500">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}

export function CategorySection({
  category,
  featured,
  rest,
}: {
  category: Category;
  featured: ArticleMeta;
  rest: ArticleMeta[];
}) {
  return (
    <section className="py-10">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-sand-300 pb-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
            <Link href={`/category/${category.slug}`} className="hover:text-clay-700">
              {category.name}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-ink-500">{category.tagline}</p>
        </div>
        <Link
          href={`/category/${category.slug}`}
          className="hidden shrink-0 text-sm font-semibold text-turq-600 hover:text-turq-700 sm:inline"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Featured */}
        <article className="group">
          <Link href={`/article/${featured.slug}`} className="block">
            <CoverImage
              src={featured.coverImage}
              alt={featured.title}
              sizes="(min-width: 1024px) 560px, 92vw"
            />
          </Link>
          <div className="mt-4">
            <CategoryBadge slug={featured.category} />
            <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink-900">
              <Link href={`/article/${featured.slug}`} className="hover:text-clay-700">
                {featured.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-500">
              {featured.excerpt}
            </p>
          </div>
        </article>

        {/* Column of other stories */}
        <div className="flex flex-col justify-between gap-6">
          {rest.map((a) => (
            <ListItem key={a.slug} article={a} />
          ))}
        </div>
      </div>

      <Link
        href={`/category/${category.slug}`}
        className="mt-6 inline-block text-sm font-semibold text-turq-600 hover:text-turq-700 sm:hidden"
      >
        View all {category.name} →
      </Link>
    </section>
  );
}
