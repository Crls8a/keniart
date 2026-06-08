import Link from "next/link";
import type { Artwork } from "@/types/artwork";
import { formatDimensions } from "@/lib/format";
import { AvailabilityBadge } from "@/components/artwork/AvailabilityBadge";
import { ResponsiveArtworkImage } from "@/components/artwork/ResponsiveArtworkImage";

export function ArtworkCard({ artwork, priority = false }: { artwork: Artwork; priority?: boolean }) {
  const image = artwork.images.gallery?.[0];
  const imagePadding = image?.orientation === "landscape" ? "p-3 sm:p-5" : "p-2 sm:p-3";

  return (
    <Link href={`/obras/${artwork.slug}`} className="group flex h-full flex-col focus-visible:outline-offset-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#17120e]">
        {image ? <ResponsiveArtworkImage image={image} alt={artwork.title} priority={priority} className={`object-contain transition duration-700 motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03] ${imagePadding}`} /> : null}
        <div className="absolute inset-x-4 bottom-4 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
          <AvailabilityBadge status={artwork.status} />
        </div>
      </div>
      <div className="mt-4 flex min-h-[6.75rem] flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-medium">{artwork.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {artwork.year} - {artwork.technique}
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted sm:shrink-0 sm:text-right">
          {formatDimensions(artwork.dimensions)}
        </p>
      </div>
    </Link>
  );
}
