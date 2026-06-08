"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { galleryCardVariants, galleryListVariants } from "@/components/motion/variants";
import { formatDimensions } from "@/lib/format";
import type { Artwork, ArtworkImageAsset } from "@/types/artwork";

type GalleryArtworkGridProps = {
  artworks: Artwork[];
  cardCta: string;
  shouldReduceMotion: boolean;
};

function artworkImagePadding(image?: ArtworkImageAsset) {
  return image?.orientation === "landscape" ? "p-3 sm:p-5" : "p-2 sm:p-3";
}

function GalleryArtworkCard({ artwork, cardCta, priority }: { artwork: Artwork; cardCta: string; priority: boolean }) {
  return (
    <motion.article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper" variants={galleryCardVariants}>
      <Link href={`/obras/${artwork.slug}`} className="group block focus-visible:outline-offset-4">
        <div className="relative aspect-[4/5] bg-[#17120e]">
          <Image
            alt={artwork.title}
            className={`object-contain transition duration-700 motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03] ${artworkImagePadding(artwork.images.gallery?.[0])}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
            src={artwork.images.main}
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">{formatDimensions(artwork.dimensions)}</p>
        <h3 className="mt-3 min-h-[4rem] font-serif text-2xl leading-8 tracking-[-0.03em]">{artwork.title}</h3>
        <p className="mt-3 min-h-[6rem] text-sm leading-6 text-muted">{artwork.experience?.galleryNotes ?? artwork.description}</p>
        <Link className="mt-auto inline-flex pt-5 text-sm uppercase tracking-[0.22em] underline-offset-4 hover:underline focus-visible:outline-offset-4" href={`/obras/${artwork.slug}`}>
          {cardCta}
        </Link>
      </div>
    </motion.article>
  );
}

export function GalleryArtworkGrid({ artworks, cardCta, shouldReduceMotion }: GalleryArtworkGridProps) {
  if (!artworks.length) return null;

  return (
    <motion.div
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      initial={shouldReduceMotion ? false : "hidden"}
      variants={shouldReduceMotion ? undefined : galleryListVariants}
    >
      {artworks.map((artwork, index) => (
        <GalleryArtworkCard key={artwork.id} artwork={artwork} cardCta={cardCta} priority={index < 2} />
      ))}
    </motion.div>
  );
}
