"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Artwork, GalleryMode } from "@/types/artwork";
import { formatDimensions } from "@/lib/format";
import { GalleryModeSwitch } from "@/components/gallery/GalleryModeSwitch";

type GalleryExperienceProps = {
  artworks: Artwork[];
  defaultMode?: GalleryMode;
};

export function GalleryExperience({ artworks, defaultMode = "archive" }: GalleryExperienceProps) {
  const [activeMode, setActiveMode] = useState<GalleryMode>(defaultMode);
  const curatedArtworks = useMemo(
    () => artworks.filter((artwork) => artwork.dossierSelected).sort((a, b) => (a.experience?.dossierOrder ?? 99) - (b.experience?.dossierOrder ?? 99)),
    [artworks],
  );
  const visibleArtworks = activeMode === "curated" || activeMode === "presentation" ? curatedArtworks : artworks;
  const heroArtwork = visibleArtworks[0] ?? artworks[0];

  return (
    <section className="space-y-10" aria-labelledby="gallery-experience-title">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Galería premium</p>
        <h2 id="gallery-experience-title" className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
          Modos de lectura para archivo, curaduría, muro y presentación.
        </h2>
        <p className="mt-5 text-muted">
          Esta base usa contenido demo y conserva WhatsApp como único canal de consulta. Lightbox, masonry y animación avanzada quedan para sus slices.
        </p>
      </div>

      <GalleryModeSwitch activeMode={activeMode} onModeChange={setActiveMode} />

      {activeMode === "presentation" && heroArtwork ? (
        <article className="grid min-h-[70vh] overflow-hidden rounded-[2rem] bg-[#16120e] text-[#f7efe3] lg:grid-cols-[1fr_22rem]">
          <Link href={`/obras/${heroArtwork.slug}`} className="relative min-h-[55vh] bg-black/30">
            <Image
              alt={heroArtwork.title}
              className="object-contain"
              fill
              priority
              sizes="(min-width: 1024px) 65vw, 100vw"
              src={heroArtwork.images.main}
            />
          </Link>
          <div className="self-end p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#b8aa98]">Presentación demo</p>
            <h3 className="mt-5 font-serif text-4xl tracking-[-0.04em]">{heroArtwork.title}</h3>
            <p className="mt-4 leading-7 text-[#cfc2b1]">{heroArtwork.description}</p>
          </div>
        </article>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleArtworks.map((artwork, index) => (
            <article className="overflow-hidden rounded-[1.75rem] border border-line bg-paper" key={artwork.id}>
              <Link href={`/obras/${artwork.slug}`} className="group block focus-visible:outline-offset-4">
                <div className="relative aspect-[4/5] bg-line">
                  <Image
                    alt={artwork.title}
                    className="object-cover transition duration-700 motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
                    fill
                    priority={index < 2}
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                    src={activeMode === "wall_preview" ? (artwork.experience?.wallPreviewImage?.src ?? artwork.images.inRoom ?? artwork.images.main) : artwork.images.main}
                  />
                </div>
              </Link>
              <div className="space-y-3 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-muted">
                  {activeMode === "wall_preview" ? "Vista de muro 2D" : formatDimensions(artwork.dimensions)}
                </p>
                <h3 className="font-serif text-2xl tracking-[-0.03em]">{artwork.title}</h3>
                <p className="text-sm leading-6 text-muted">{artwork.experience?.galleryNotes ?? artwork.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
