import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-sand-300 bg-sand-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl font-bold text-turq-700">
              New Mexico Enchantment Trail
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">
              A bright travel-and-food magazine for the Land of Enchantment — from Santa Fe
              plazas and Taos mesas to green-chile kitchens, desert spas, and balloon-filled
              skies.
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-clay-600">
              Sections
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="hover:text-clay-700">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-clay-600">
              About
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              An independent editorial project. Restaurants, spas, galleries, and artists
              named in these stories are fictional and created for illustration. Photography
              is credited from free-to-use libraries.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-sand-300 pt-6 text-xs text-ink-400">
          © {new Date().getFullYear()} New Mexico Enchantment Trail. Storytelling from the
          high desert.
        </div>
      </div>
    </footer>
  );
}
