import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import {
  getFeaturedForCategory,
  getArticlesByCategory,
  getHeroArticle,
} from "@/lib/articles";
import { CoverImage } from "@/components/CoverImage";
import { CategoryBadge } from "@/components/CategoryBadge";
import { CategorySection } from "@/components/CategorySection";
import { SearchBar } from "@/components/SearchBar";

export default function HomePage() {
  const hero = getHeroArticle();

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Masthead intro + search */}
      <section className="pt-8 pb-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-turq-600">
          The Land of Enchantment
        </p>
        <h1 className="mx-auto mt-2 max-w-xl font-display text-lg font-medium leading-snug text-ink-500 sm:text-xl">
          Travel, food &amp; culture across New Mexico — where to wander, where to eat, and
          where the high desert still surprises.
        </h1>
        <div className="mx-auto mt-5 max-w-xl">
          <SearchBar size="lg" />
        </div>
      </section>

      {/* Hero feature */}
      {hero && (
        <section className="pt-8">
          <Link href={`/article/${hero.slug}`} className="group block">
            <div className="grid items-center gap-6 overflow-hidden rounded-2xl border border-sand-200 bg-white/60 shadow-sm md:grid-cols-2">
              <div className="order-2 p-6 md:order-1 md:p-10">
                <CategoryBadge slug={hero.category} as="text" />
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
                  <span className="transition group-hover:text-clay-700">{hero.title}</span>
                </h2>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-500">
                  {hero.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-turq-600">
                  Read the story
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
              <div className="order-1 p-3 md:order-2 md:p-4">
                <CoverImage
                  src={hero.coverImage}
                  alt={hero.title}
                  sizes="(min-width: 768px) 560px, 94vw"
                  priority
                  rounded="rounded-xl"
                />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Category blocks */}
      <div className="divide-y divide-sand-200">
        {CATEGORIES.map((category) => {
          const featured = getFeaturedForCategory(category.slug);
          if (!featured) return null;
          const rest = getArticlesByCategory(category.slug)
            .filter((a) => a.slug !== featured.slug)
            .slice(0, 4);
          return (
            <CategorySection
              key={category.slug}
              category={category}
              featured={featured}
              rest={rest}
            />
          );
        })}
      </div>
    </div>
  );
}
