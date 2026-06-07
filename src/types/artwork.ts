export type ArtworkStatus = "available" | "reserved" | "sold" | "not_for_sale";

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  year: number;
  seriesSlug?: string;
  technique: string;
  support: string;
  dimensions: {
    heightCm: number;
    widthCm: number;
    depthCm?: number;
  };
  price?: {
    amount: number;
    currency: "MXN" | "USD" | "EUR";
    visibility: "public" | "on_request" | "private";
  };
  status: ArtworkStatus;
  images: {
    main: string;
    details?: string[];
    inRoom?: string;
    back?: string;
  };
  description: string;
  tags: string[];
  featured?: boolean;
  dossierSelected?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ArtworkSeries = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  years: string;
};
