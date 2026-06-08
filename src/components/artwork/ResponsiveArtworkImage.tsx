import type { ArtworkImageAsset } from "@/types/artwork";

type ResponsiveArtworkImageProps = {
  /**
   * Parent contract: render inside an SSR-sized `relative` frame such as
   * `ArtworkMediaFrame`. This component intentionally remains absolute so the
   * frame, not hydration, owns aspect ratio, minimum height, overflow, and
   * responsive layout stability.
   */
  image: ArtworkImageAsset;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function ResponsiveArtworkImage({ image, alt, className = "", priority = false }: ResponsiveArtworkImageProps) {
  const variants = image.variants;

  return (
    <picture className="absolute inset-0 block">
      {variants?.mobile ? <source media="(max-width: 639px)" srcSet={variants.mobile} /> : null}
      {variants?.tablet ? <source media="(max-width: 1023px)" srcSet={variants.tablet} /> : null}
      {variants?.desktop ? <source media="(min-width: 1024px)" srcSet={variants.desktop} /> : null}
      <img
        alt={alt}
        className={`h-full w-full ${className}`}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        src={variants?.main ?? image.src}
        width={image.width}
      />
    </picture>
  );
}
