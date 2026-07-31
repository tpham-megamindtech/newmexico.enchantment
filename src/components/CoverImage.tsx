import Image from "next/image";

/**
 * 16:9 cover image with object-fit: cover, used everywhere covers appear.
 * Remote hosts are whitelisted in next.config.ts.
 */
export function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  rounded = "rounded-xl",
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  rounded?: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden ${rounded} bg-sand-200 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}
