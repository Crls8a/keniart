import type { Artwork } from "@/types/artwork";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";

export function ArtworkGrid({ artworks }: { artworks: Artwork[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork, index) => (
        <ArtworkCard key={artwork.id} artwork={artwork} priority={index < 2} />
      ))}
    </div>
  );
}
