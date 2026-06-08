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
};

export function ResponsiveArtworkImage({ image, alt, className = "", priority = false }: ResponsiveArtworkImageProps) {
  const variants = image.variants;
  const commonImageProps = {
    alt,
    className: `h-full w-full ${className}`,
    decoding: "async" as const,
    fetchPriority: priority ? ("high" as const) : ("auto" as const),
    height: image.height,
    sizes: "100vw",
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
      {variants?.mobile ? <source media="(max-width: 639px)" srcSet={mobileSrcSet} /> : null}
      {variants?.tablet ? <source media="(max-width: 1023px)" srcSet={tabletSrcSet} /> : null}
      {variants?.desktop ? <source media="(min-width: 1024px)" srcSet={desktopSrcSet} /> : null}
      <Image {...commonImageProps} alt={alt} loading="lazy" src={variants?.main ?? image.src} />
    </picture>
  );
}
