import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { CategorySlug } from "./categories";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  title: string;
  slug: string;
  excerpt: string;
  category: CategorySlug;
  date: string; // ISO yyyy-mm-dd
  coverImage: string;
  featured: boolean;
  imageCredit: string;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};

let cachedMeta: ArticleMeta[] | null = null;

function readAllRaw(): { data: Record<string, unknown>; content: string; file: string }[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { data, content, file };
  });
}

function toMeta(data: Record<string, unknown>, file: string): ArticleMeta {
  const required = ["title", "slug", "excerpt", "category", "date", "coverImage", "imageCredit"];
  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      throw new Error(`Article "${file}" is missing required frontmatter field: ${key}`);
    }
  }
  return {
    title: String(data.title),
    slug: String(data.slug),
    excerpt: String(data.excerpt),
    category: String(data.category) as CategorySlug,
    date: String(data.date),
    coverImage: String(data.coverImage),
    featured: Boolean(data.featured),
    imageCredit: String(data.imageCredit),
  };
}

/** All article metadata, newest first. Cached per server process. */
export function getAllArticles(): ArticleMeta[] {
  if (cachedMeta) return cachedMeta;
  const metas = readAllRaw().map(({ data, file }) => toMeta(data, file));
  metas.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  cachedMeta = metas;
  return metas;
}

export function getArticlesByCategory(category: CategorySlug): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

/** Featured article for a category (falls back to the most recent). */
export function getFeaturedForCategory(category: CategorySlug): ArticleMeta | undefined {
  const inCat = getArticlesByCategory(category);
  return inCat.find((a) => a.featured) ?? inCat[0];
}

/** Site-wide hero: an explicitly featured article, most recent first. */
export function getHeroArticle(): ArticleMeta | undefined {
  const all = getAllArticles();
  return all.find((a) => a.featured) ?? all[0];
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export async function getArticle(slug: string): Promise<Article | null> {
  const entry = readAllRaw().find(({ data }) => String(data.slug) === slug);
  if (!entry) return null;
  const meta = toMeta(entry.data, entry.file);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(entry.content);
  return { ...meta, contentHtml: processed.toString() };
}

/** Up to `limit` related articles: same category first, then most recent others. */
export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const all = getAllArticles();
  const current = all.find((a) => a.slug === slug);
  if (!current) return all.slice(0, limit);
  const sameCat = all.filter((a) => a.slug !== slug && a.category === current.category);
  const others = all.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...sameCat, ...others].slice(0, limit);
}
