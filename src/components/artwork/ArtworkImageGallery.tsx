"use client";

import Image from "next/image";
import type { KeyboardEvent, PointerEvent } from "react";
import { useRef, useState } from "react";
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
  const [active, setActive] = useState<{ direction: number; index: number; previousIndex: number | null }>({ direction: 0, index: 0, previousIndex: null });
  const pointerStartX = useRef<number | null>(null);
  const hasMultipleImages = images.length > 1;

  function showImage(index: number, direction?: number) {
    const nextIndex = (index + images.length) % images.length;

    setActive((current) => ({
      direction: direction ?? (nextIndex === current.index ? 0 : nextIndex > current.index ? 1 : -1),
      index: nextIndex,
      previousIndex: nextIndex === current.index ? current.previousIndex : current.index,
    }));
  }

  function showPreviousImage() {
    showImage(active.index - 1, -1);
  }

  function showNextImage() {
    showImage(active.index + 1, 1);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null || !hasMultipleImages) return;

    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(distance) < 48) return;
    showImage(active.index + (distance < 0 ? 1 : -1), distance < 0 ? 1 : -1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!hasMultipleImages) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showImage(active.index - 1, -1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showImage(active.index + 1, 1);
    }
  }

  return (
    <section aria-label={`Galería de imágenes de ${artwork.title}`} className="space-y-4">
      <div
        className="relative aspect-[4/5] touch-pan-y overflow-hidden bg-[#17120e] sm:aspect-[5/6] lg:aspect-[4/5]"
        onKeyDown={handleKeyDown}
        onPointerCancel={() => {
          pointerStartX.current = null;
        }}
        onPointerDown={(event) => {
          pointerStartX.current = event.clientX;
        }}
        onPointerUp={handlePointerEnd}
        tabIndex={hasMultipleImages ? 0 : undefined}
      >
        {[active.previousIndex, active.index].map((imageIndex) => {
          if (imageIndex === null) return null;

          const image = images[imageIndex];
          const isActive = imageIndex === active.index;
          const outgoingShift = active.direction > 0 ? "motion-safe:-translate-x-4" : "motion-safe:translate-x-4";
          const incomingAnimation = active.direction < 0 ? "motion-safe:animate-[gallery-image-in-back_240ms_cubic-bezier(0.22,1,0.36,1)_both]" : "motion-safe:animate-[gallery-image-in-forward_240ms_cubic-bezier(0.22,1,0.36,1)_both]";

          return (
            <div
              className={`pointer-events-none absolute inset-0 motion-reduce:transition-none ${isActive ? `z-10 opacity-100 ${incomingAnimation}` : `z-0 opacity-0 motion-safe:transition motion-safe:duration-300 motion-safe:ease-out ${outgoingShift}`}`}
              key={`${image.src}-${imageIndex}`}
            >
              <Image
                alt={isActive ? image.alt : ""}
                className={`object-contain ${imagePadding(image)}`}
                fill
                priority={isActive}
                sizes="(min-width: 1024px) 55vw, 100vw"
                src={image.src}
              />
            </div>
          );
        })}
        {hasMultipleImages ? (
          <div className="absolute inset-x-3 top-1/2 z-50 flex -translate-y-1/2 justify-between gap-3 sm:inset-x-5">
            <button
              aria-label="Ver imagen anterior"
              className="grid size-12 touch-manipulation place-items-center rounded-full border border-line bg-paper/95 text-2xl shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur transition hover:bg-paper focus-visible:outline-offset-4 sm:size-14"
              onClick={showPreviousImage}
              type="button"
            >
              ‹
            </button>
            <button
              aria-label="Ver imagen siguiente"
              className="grid size-12 touch-manipulation place-items-center rounded-full border border-line bg-paper/95 text-2xl shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur transition hover:bg-paper focus-visible:outline-offset-4 sm:size-14"
              onClick={showNextImage}
              type="button"
            >
              ›
            </button>
          </div>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className="space-y-3">
          <p aria-live="polite" className="text-xs uppercase tracking-[0.22em] text-muted">
            Imagen {active.index + 1} de {images.length}
          </p>
          <ul className="flex gap-3 overflow-x-auto pb-1" aria-label="Seleccionar imagen">
            {images.map((image, index) => {
              const isActive = index === active.index;

              return (
                <li key={`${image.src}-${index}`}>
                  <button
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Ver imagen ${index + 1} de ${images.length}`}
                    className={`relative block h-20 w-20 shrink-0 overflow-hidden border bg-[#17120e] transition focus-visible:outline-offset-4 ${
                      isActive ? "border-foreground" : "border-line hover:border-foreground/50"
                    }`}
                    onClick={() => showImage(index)}
                    type="button"
                  >
                    <Image alt="" className="object-contain p-1" fill sizes="5rem" src={image.variants?.thumb ?? image.src} />
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
