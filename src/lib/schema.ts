import type { Artwork, ArtworkSeries } from "@/types/artwork";
import { artist } from "@/data/artist";
import { isCatalogArtwork } from "@/data/artworks";
import { formatDimensions } from "@/lib/format";
import { routes } from "@/lib/routes";
import { absoluteUrl, siteConfig } from "@/lib/seo";

const schemaContext = "https://schema.org";

function personId() {
  return absoluteUrl("/#artist");
}

function websiteId() {
  return absoluteUrl("/#website");
}

function personNode() {
  return {
    "@type": "Person",
    "@id": personId(),
    name: artist.name,
    url: absoluteUrl(routes.artist),
    sameAs: [artist.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "consultas de obra por WhatsApp",
      telephone: artist.whatsappDisplay,
    },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId(),
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "es-MX",
    creator: { "@id": personId() },
  };
}

function visualArtworkNode(artwork: Artwork) {
  const size = formatDimensions(artwork.dimensions);
  const canonicalPath = isCatalogArtwork(artwork) ? routes.obras.detail(artwork.slug) : undefined;
  const entityPage = canonicalPath ?? (artwork.seriesSlug ? routes.series.detail(artwork.seriesSlug) : routes.series.index);
  const isPrint = artwork.technique.toLocaleLowerCase("es").includes("giclée");

  return {
    "@type": "VisualArtwork",
    "@id": canonicalPath
      ? `${absoluteUrl(canonicalPath)}#artwork`
      : `${absoluteUrl(entityPage)}#artwork-${artwork.slug}`,
    name: artwork.title,
    artform: isPrint ? "Print" : "Painting",
    creator: { "@id": personId() },
    dateCreated: String(isPrint ? (artwork.editionYear ?? artwork.year) : (artwork.originalYear ?? artwork.year)),
    artMedium: artwork.technique,
    artworkSurface: artwork.support,
    ...(artwork.dimensions.kind === "unknown" ? {} : { size }),
    image: absoluteUrl(artwork.images.main),
    ...(canonicalPath ? { url: absoluteUrl(canonicalPath) } : {}),
    description: artwork.description,
  };
}

type CollectionPageSchemaOptions = {
  name: string;
  description: string;
  path: string;
  artworks: Artwork[];
};

function collectionPageNode({ name, description, path, artworks }: CollectionPageSchemaOptions) {
  const url = absoluteUrl(path);

  return {
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name,
    description,
    url,
    isPartOf: { "@id": websiteId() },
    creator: { "@id": personId() },
    hasPart: artworks.map((artwork) => visualArtworkNode(artwork)),
  };
}

function breadcrumbListNode(path: string, items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function schemaGraph(nodes: object[]) {
  return { "@context": schemaContext, "@graph": nodes };
}

export function visualArtworkSchema(artwork: Artwork) {
  return schemaGraph([personNode(), websiteNode(), visualArtworkNode(artwork)]);
}

export function collectionPageSchema(options: CollectionPageSchemaOptions) {
  return schemaGraph([personNode(), websiteNode(), collectionPageNode(options)]);
}

export function homePageSchema(options: Omit<CollectionPageSchemaOptions, "path">) {
  return collectionPageSchema({ ...options, path: routes.home });
}

export function seriesPageSchema(item: ArtworkSeries, artworks: Artwork[]) {
  const path = routes.series.detail(item.slug);

  return schemaGraph([
    personNode(),
    websiteNode(),
    collectionPageNode({
      name: item.title,
      description: item.description,
      path,
      artworks,
    }),
    breadcrumbListNode(path, [
      { name: "Inicio", path: routes.home },
      { name: "Series", path: routes.series.index },
      { name: item.title, path },
    ]),
  ]);
}
