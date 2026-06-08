import Link from "next/link";
import { ArtworkMediaFrame } from "@/components/artwork/ArtworkMediaFrame";
import { ResponsiveArtworkImage } from "@/components/artwork/ResponsiveArtworkImage";
import { formatDimensions } from "@/lib/format";
import type { Artwork } from "@/types/artwork";

type GalleryArtworkGridProps = {
  artworks: Artwork[];
  cardCta: string;
};

function GalleryArtworkCard({ artwork, cardCta, priority }: { artwork: Artwork; cardCta: string; priority: boolean }) {
  const image = artwork.images.gallery?.[0];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1">
      <Link href={`/obras/${artwork.slug}`} className="group block focus-visible:outline-offset-4">
        <ArtworkMediaFrame image={image} size="card">
          {image ? <ResponsiveArtworkImage image={image} alt={artwork.title} priority={priority} className="object-contain transition duration-700 motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]" /> : null}
        </ArtworkMediaFrame>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">{formatDimensions(artwork.dimensions)}</p>
        <h3 className="mt-3 min-h-[4rem] font-serif text-2xl leading-8 tracking-[-0.03em]">{artwork.title}</h3>
        <p className="mt-3 min-h-[6rem] text-sm leading-6 text-muted">{artwork.experience?.galleryNotes ?? artwork.description}</p>
        <Link className="mt-auto inline-flex pt-5 text-sm uppercase tracking-[0.22em] underline-offset-4 hover:underline focus-visible:outline-offset-4" href={`/obras/${artwork.slug}`}>
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
      {artworks.map((artwork, index) => (
        <GalleryArtworkCard key={artwork.id} artwork={artwork} cardCta={cardCta} priority={index < 2} />
      ))}
    </div>
  );
}
