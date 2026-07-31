import Link from "next/link";
import { categoryName } from "@/lib/categories";

export function CategoryBadge({
  slug,
  as = "link",
}: {
  slug: string;
  as?: "link" | "text";
}) {
  const label = categoryName(slug);
  const cls =
    "inline-block rounded-full bg-turq-500/12 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-turq-600";
  if (as === "text") return <span className={cls}>{label}</span>;
  return (
    <Link href={`/category/${slug}`} className={`${cls} transition hover:bg-turq-500/20`}>
      {label}
    </Link>
  );
}
