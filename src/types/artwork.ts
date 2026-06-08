export type ArtworkStatus = "available" | "reserved" | "sold" | "not_for_sale";

export type GalleryMode = "archive" | "detail" | "presentation" | "lightbox" | "wall_preview";

export type ArtworkFilter = "all" | "featured" | "available" | "dossier" | string;

export type ArtworkSort = "dossier_order" | "newest" | "title";

export type ArtworkImageFocus = "center" | "top" | "bottom" | "left" | "right";

export type ArtworkExperienceImage = {
  src: string;
  alt: string;
};

export type ArtworkExperience = {
  heroCrop?: {
    focus: ArtworkImageFocus;
    objectPosition?: string;
  };
  dominantColor?: string;
  textureImages?: ArtworkExperienceImage[];
  wallPreviewImage?: ArtworkExperienceImage;
  animationPriority?: "hero" | "featured" | "standard" | "low";
  galleryNotes?: string;
  dossierOrder?: number;
  aspectRatio?: number;
};

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
    aspectRatio?: number;
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
  experience?: ArtworkExperience;
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
