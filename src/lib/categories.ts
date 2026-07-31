export type CategorySlug =
  | "travel-adventure"
  | "food-dining"
  | "beauty-wellness"
  | "arts-culture"
  | "events-festivals"
  | "outdoors-nature";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
};

// Ordered exactly as required on the home page.
export const CATEGORIES: Category[] = [
  {
    slug: "travel-adventure",
    name: "Travel & Adventure",
    tagline: "Road trips, high-desert towns, and the routes worth the detour.",
  },
  {
    slug: "food-dining",
    name: "Food & Dining",
    tagline: "Green chile, red chile, and the tables defining New Mexican cuisine.",
  },
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    tagline: "Desert spas, hot springs, and the state's restorative rituals.",
  },
  {
    slug: "arts-culture",
    name: "Arts & Culture",
    tagline: "Galleries, adobe museums, and the makers of the Land of Enchantment.",
  },
  {
    slug: "events-festivals",
    name: "Events & Festivals",
    tagline: "Balloons at dawn, feast days, and the calendar's brightest gatherings.",
  },
  {
    slug: "outdoors-nature",
    name: "Outdoors & Nature",
    tagline: "Canyons, dunes, and dark skies across the wide-open Southwest.",
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return CATEGORY_MAP.get(slug as CategorySlug);
}

export function categoryName(slug: string): string {
  return CATEGORY_MAP.get(slug as CategorySlug)?.name ?? slug;
}
