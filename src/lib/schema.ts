import type { Artwork } from "@/types/artwork";
import { formatDimensions } from "@/lib/format";
import { absoluteUrl, siteConfig } from "@/lib/seo";

const creatorSchema = {
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  sameAs: [siteConfig.contact.instagram],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "consultas de obra por WhatsApp",
    telephone: siteConfig.contact.whatsappDisplay,
  },
};

export function visualArtworkSchema(artwork: Artwork) {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    artform: "Painting",
    creator: creatorSchema,
    dateCreated: artwork.year.toString(),
    artMedium: artwork.technique,
    artworkSurface: artwork.support,
    size: formatDimensions(artwork.dimensions),
    image: absoluteUrl(artwork.images.main),
    url: absoluteUrl(`/obras/${artwork.slug}`),
    description: artwork.description,
  };
}

export function collectionSchema(name: string, artworks: Artwork[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: siteConfig.url,
    creator: creatorSchema,
    hasPart: artworks.map((artwork) => visualArtworkSchema(artwork)),
  };
}
