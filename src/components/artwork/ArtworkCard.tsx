import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/types/artwork";
import { formatDimensions } from "@/lib/format";
import { AvailabilityBadge } from "@/components/artwork/AvailabilityBadge";

export function ArtworkCard({ artwork, priority = false }: { artwork: Artwork; priority?: boolean }) {
  return (
    <Link href={`/obras/${artwork.slug}`} className="group block focus-visible:outline-offset-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        <Image
          src={artwork.images.main}
          alt={artwork.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-700 motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
        />
        <div className="absolute inset-x-4 bottom-4 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
          <AvailabilityBadge status={artwork.status} />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">{artwork.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {artwork.year} - {artwork.technique}
          </p>
        </div>
        <p className="shrink-0 text-right text-xs uppercase tracking-[0.2em] text-muted">
          {formatDimensions(artwork.dimensions)}
        </p>
      </div>
    </Link>
  );
}
