import type { Artwork } from "@/types/artwork";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";

type ArtworkGridProps = {
  artworks: Artwork[];
  getArtworkHref?: (artwork: Artwork) => string | undefined;
};

export function ArtworkGrid({ artworks, getArtworkHref = (artwork) => `/obras/${artwork.slug}` }: ArtworkGridProps) {
  return (
    <div className="grid items-stretch gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork, index) => (
        <ArtworkCard key={artwork.id} artwork={artwork} href={getArtworkHref(artwork)} priority={index < 2} />
      ))}
    </div>
  );
}
