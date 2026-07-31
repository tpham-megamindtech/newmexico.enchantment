import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { CoverImage } from "./CoverImage";
import { CategoryBadge } from "./CategoryBadge";

/**
 * Standard image-forward card used in category grids and category blocks.
 * Never shows the publish date (per site rules — date lives on the article page only).
 */
export function ArticleCard({
  article,
  showCategory = true,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw",
  priority = false,
}: {
  article: ArticleMeta;
  showCategory?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      <Link href={`/article/${article.slug}`} className="block">
        <CoverImage
          src={article.coverImage}
          alt={article.title}
          sizes={sizes}
          priority={priority}
        />
      </Link>
      <div className="mt-3 flex flex-col">
        {showCategory && (
          <div className="mb-2">
            <CategoryBadge slug={article.category} />
          </div>
        )}
        <h3 className="font-display text-lg font-semibold leading-snug text-ink-900">
          <Link href={`/article/${article.slug}`} className="hover:text-clay-700">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}
