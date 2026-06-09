import type { Artwork } from "@/types/artwork";

export const routes = {
  home: "/",
  obras: {
    index: "/obras",
    detail: (slug: string) => `/obras/${slug}`,
  },
  series: {
    index: "/series",
    detail: (slug: string) => `/series/${slug}`,
  },
  galleries: "/galerias",
  artist: "/artista",
  contact: {
    index: "/contacto",
    withArtwork: (artwork: Artwork | string) => {
      const slug = typeof artwork === "string" ? artwork : artwork.slug;
      return `/contacto?obra=${encodeURIComponent(slug)}`;
    },
  },
  dossier: "/dossier",
  dossierPdf: "/dossier/dossier-galerias.pdf",
} as const;
