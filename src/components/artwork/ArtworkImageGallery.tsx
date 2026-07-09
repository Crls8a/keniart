import { ArtworkCarouselControls } from "@/components/artwork/ArtworkCarouselControls";
import { ArtworkMediaFrame } from "@/components/artwork/ArtworkMediaFrame";
import { artworkImageSizes, ResponsiveArtworkImage } from "@/components/artwork/ResponsiveArtworkImage";
import type { Artwork, ArtworkImageAsset } from "@/types/artwork";

function fallbackImage(artwork: Artwork): ArtworkImageAsset {
  const aspectRatio = artwork.experience?.aspectRatio ?? artwork.dimensions.aspectRatio ?? 0.8;

  return {
    src: artwork.images.main,
    alt: artwork.title,
    variants: artwork.images.variants,
    width: Math.round(aspectRatio * 1000),
    height: 1000,
    aspectRatio,
    orientation: aspectRatio === 1 ? "square" : aspectRatio > 1 ? "landscape" : "portrait",
  };
}

export function ArtworkImageGallery({ artwork }: { artwork: Artwork }) {
  const images = artwork.images.gallery?.length ? artwork.images.gallery : [fallbackImage(artwork)];
  const hasMultipleImages = images.length > 1;
  const scrollerId = `artwork-gallery-${artwork.slug}`;

  return (
    <section aria-label={`Galería de imágenes de ${artwork.title}`} className="min-w-0 max-w-full space-y-4 overflow-x-hidden">
      <div className="relative min-w-0 max-w-full overflow-x-hidden">
        <div id={scrollerId} className="flex w-full max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 motion-safe:scroll-smooth motion-reduce:scroll-auto">
          {images.map((image, index) => {
            const imageId = `${scrollerId}-image-${index + 1}`;

            return (
              <figure key={image.src} id={imageId} className="min-w-full max-w-full snap-center scroll-mt-[calc(var(--site-header-height)+1rem)]">
                <ArtworkMediaFrame image={image} size="detail">
                  <ResponsiveArtworkImage image={image} alt={image.alt} priority={index === 0} sizes={artworkImageSizes.detail} className="object-contain" />
                </ArtworkMediaFrame>
                <figcaption className="sr-only">
                  Imagen {index + 1} de {images.length}
                </figcaption>
              </figure>
            );
          })}
        </div>

        {hasMultipleImages ? <ArtworkCarouselControls scrollerId={scrollerId} /> : null}
      </div>

      {hasMultipleImages ? (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Deslizá para ver {images.length} imágenes
          </p>
          <ul className="flex max-w-full gap-3 overflow-x-auto pb-1 motion-safe:scroll-smooth motion-reduce:scroll-auto" aria-label="Seleccionar imagen">
            {images.map((image, index) => {
              const imageId = `${scrollerId}-image-${index + 1}`;

              return (
                <li key={`${image.src}-${index}`}>
                  <a
                    aria-label={`Ir a imagen ${index + 1} de ${images.length}`}
                    className="block border border-line transition hover:border-foreground/50 focus-visible:outline-offset-4"
                    href={`#${imageId}`}
                  >
                    <ArtworkMediaFrame image={image} size="thumbnail" className="[&>picture>img]:!p-1">
                      <ResponsiveArtworkImage image={image} alt="" sizes={artworkImageSizes.thumbnail} className="object-contain" />
                    </ArtworkMediaFrame>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
