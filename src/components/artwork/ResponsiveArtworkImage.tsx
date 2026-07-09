import Image, { getImageProps } from "next/image";

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
  sizes: string;
};

export const artworkImageSizes = {
  card: "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw",
  detail: "(min-width: 1024px) 55vw, 100vw",
  galleryHero: "(min-width: 1280px) 800px, (min-width: 1024px) 65vw, 100vw",
  homeHero: "(min-width: 1024px) 55vw, 100vw",
  thumbnail: "80px",
} as const;

export function ResponsiveArtworkImage({ image, alt, className = "", priority = false, sizes }: ResponsiveArtworkImageProps) {
  const variants = image.variants;
  const commonImageProps = {
    alt,
    className: `h-full w-full ${className}`,
    decoding: "async" as const,
    fetchPriority: priority ? ("high" as const) : ("auto" as const),
    height: image.height,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    sizes,
    width: image.width,
  };
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...commonImageProps, src: variants?.mobile ?? variants?.main ?? image.src });
  const {
    props: { srcSet: tabletSrcSet },
  } = getImageProps({ ...commonImageProps, src: variants?.tablet ?? variants?.main ?? image.src });
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...commonImageProps, src: variants?.desktop ?? variants?.main ?? image.src });

  return (
    <picture className="absolute inset-0 block">
      {variants?.mobile ? <source media="(max-width: 639px)" sizes={sizes} srcSet={mobileSrcSet} /> : null}
      {variants?.tablet ? <source media="(max-width: 1023px)" sizes={sizes} srcSet={tabletSrcSet} /> : null}
      {variants?.desktop ? <source media="(min-width: 1024px)" sizes={sizes} srcSet={desktopSrcSet} /> : null}
      <Image {...commonImageProps} alt={alt} src={variants?.main ?? image.src} />
    </picture>
  );
}
