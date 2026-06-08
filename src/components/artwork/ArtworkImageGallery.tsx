"use client";

import { useRef } from "react";
import { ResponsiveArtworkImage } from "@/components/artwork/ResponsiveArtworkImage";
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

function imagePadding(image: ArtworkImageAsset) {
  return image.orientation === "landscape" ? "p-4 sm:p-8" : "p-3 sm:p-5";
}

export function ArtworkImageGallery({ artwork }: { artwork: Artwork }) {
  const images = artwork.images.gallery?.length ? artwork.images.gallery : [fallbackImage(artwork)];
  const hasMultipleImages = images.length > 1;
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollToImage(index: number) {
    const scroller = scrollerRef.current;
    const target = scroller?.children.item(index) as HTMLElement | null;

    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function scrollByImage(direction: -1 | 1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({ behavior: "smooth", left: direction * scroller.clientWidth });
  }

  return (
    <section aria-label={`Galería de imágenes de ${artwork.title}`} className="space-y-4">
      <div ref={scrollerRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2" tabIndex={hasMultipleImages ? 0 : undefined}>
        {images.map((image, index) => {
          return (
            <figure key={image.src} className="relative aspect-[4/5] min-w-full snap-center overflow-hidden bg-[#17120e] sm:aspect-[5/6] lg:aspect-[4/5]">
              <ResponsiveArtworkImage image={image} alt={image.alt} priority={index === 0} className={`object-contain ${imagePadding(image)}`} />
              {hasMultipleImages ? (
                <div className="absolute inset-x-3 top-1/2 z-20 flex -translate-y-1/2 justify-between gap-3 sm:inset-x-5">
                  <button type="button" onClick={() => scrollByImage(-1)} aria-label="Ver imagen anterior" className="grid size-12 touch-manipulation place-items-center rounded-full border border-line bg-paper/95 text-2xl shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur transition hover:bg-paper focus-visible:outline-offset-4 sm:size-14">
                    ‹
                  </button>
                  <button type="button" onClick={() => scrollByImage(1)} aria-label="Ver imagen siguiente" className="grid size-12 touch-manipulation place-items-center rounded-full border border-line bg-paper/95 text-2xl shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur transition hover:bg-paper focus-visible:outline-offset-4 sm:size-14">
                    ›
                  </button>
                </div>
              ) : null}
              <figcaption className="sr-only">
                Imagen {index + 1} de {images.length}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {hasMultipleImages ? (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Deslizá para ver {images.length} imágenes
          </p>
          <ul className="flex gap-3 overflow-x-auto pb-1" aria-label="Seleccionar imagen">
            {images.map((image, index) => {
              return (
                <li key={`${image.src}-${index}`}>
                  <button
                    aria-label={`Ir a imagen ${index + 1} de ${images.length}`}
                    className="relative block h-20 w-20 shrink-0 overflow-hidden border border-line bg-[#17120e] transition hover:border-foreground/50 focus-visible:outline-offset-4"
                    onClick={() => scrollToImage(index)}
                    type="button"
                  >
                    <ResponsiveArtworkImage image={image} alt="" className="object-contain p-1" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
