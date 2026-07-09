import type { MetadataRoute } from "next";
import { getCatalogArtworks } from "@/data/artworks";
import { series } from "@/data/series";
import { routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  routes.home,
  routes.obras.index,
  routes.series.index,
  routes.galleries,
  routes.artist,
  routes.contact.index,
  routes.dossier,
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path) })),
    ...getCatalogArtworks().map((artwork) => ({
      url: absoluteUrl(routes.obras.detail(artwork.slug)),
      lastModified: new Date(artwork.updatedAt),
    })),
    ...series.map((item) => ({ url: absoluteUrl(routes.series.detail(item.slug)) })),
  ];
}
