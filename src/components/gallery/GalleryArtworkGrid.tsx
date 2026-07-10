import Link from "next/link";
import { AvailabilityBadge } from "@/components/artwork/AvailabilityBadge";
import { ArtworkMediaFrame } from "@/components/artwork/ArtworkMediaFrame";
import { artworkImageSizes, ResponsiveArtworkImage } from "@/components/artwork/ResponsiveArtworkImage";
import { getCatalogOnlyArtworkHref } from "@/data/artworks";
import { formatDimensions } from "@/lib/format";
import type { Artwork } from "@/types/artwork";

type GalleryArtworkGridProps = {
  artworks: Artwork[];
  cardCta: string;
};

function GalleryArtworkCard({ artwork, cardCta }: { artwork: Artwork; cardCta: string }) {
  const image = artwork.images.gallery?.[0];
  const href = getCatalogOnlyArtworkHref(artwork);

  if (!href) return null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1">
      <Link href={href} className="group block focus-visible:outline-offset-4">
        <ArtworkMediaFrame image={image} size="card">
          {image ? <ResponsiveArtworkImage image={image} alt={artwork.title} sizes={artworkImageSizes.card} className="object-contain transition duration-700 motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]" /> : null}
        </ArtworkMediaFrame>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">{formatDimensions(artwork.dimensions)}</p>
          <AvailabilityBadge status={artwork.status} />
        </div>
        <h4 className="mt-3 min-h-[4rem] font-serif text-2xl leading-8 tracking-[-0.03em]">{artwork.title}</h4>
        <p className="mt-3 min-h-[6rem] text-sm leading-6 text-muted">{artwork.experience?.galleryNotes ?? artwork.description}</p>
        <Link className="mt-auto inline-flex pt-5 text-sm uppercase tracking-[0.22em] underline-offset-4 hover:underline focus-visible:outline-offset-4" href={href}>
          {cardCta}
        </Link>
      </div>
    </article>
  );
}

export function GalleryArtworkGrid({ artworks, cardCta }: GalleryArtworkGridProps) {
  if (!artworks.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork) => (
        <GalleryArtworkCard key={artwork.id} artwork={artwork} cardCta={cardCta} />
      ))}
    </div>
  );
}
