import type { Artwork } from "@/types/artwork";
import { formatDimensions } from "@/lib/format";
import { siteConfig } from "@/lib/seo";

export function visualArtworkSchema(artwork: Artwork) {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    artform: "Painting",
    creator: {
      "@type": "Person",
      name: "Keniart",
    },
    dateCreated: artwork.year.toString(),
    artMedium: artwork.technique,
    artworkSurface: artwork.support,
    size: formatDimensions(artwork.dimensions),
    image: artwork.images.main,
    url: `${siteConfig.url}/obras/${artwork.slug}`,
    description: artwork.description,
  };
}

export function collectionSchema(name: string, artworks: Artwork[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    hasPart: artworks.map((artwork) => visualArtworkSchema(artwork)),
  };
}
