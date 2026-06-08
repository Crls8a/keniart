export type ArtworkStatus = "available" | "reserved" | "sold" | "not_for_sale";

export type ArtworkFilter = "all" | "featured" | "available" | "dossier" | string;

export type ArtworkSort = "dossier_order" | "newest" | "title";

export type ArtworkImageFocus = "center" | "top" | "bottom" | "left" | "right";

export type ArtworkSeriesCategory = "collection" | "commission" | "study" | "archive";

export type ArtworkSeriesStatus = "active" | "planned" | "archived";

export type ArtworkImageVariants = {
  main: string;
  desktop?: string;
  tablet?: string;
  mobile?: string;
  thumb?: string;
};

export type ArtworkImageOrientation = "portrait" | "landscape" | "square";

export type ArtworkImageAsset = {
  src: string;
  alt: string;
  variants?: ArtworkImageVariants;
  width: number;
  height: number;
  aspectRatio: number;
  orientation: ArtworkImageOrientation;
};

export type ArtworkDimensions =
  | {
      kind?: "known";
      heightCm: number;
      widthCm: number;
      depthCm?: number;
      aspectRatio?: number;
    }
  | {
      kind: "unknown";
      label?: string;
      aspectRatio?: number;
    };

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
  dimensions: ArtworkDimensions;
  price?: {
    amount: number;
    currency: "MXN" | "USD" | "EUR";
    visibility: "public" | "on_request" | "private";
  };
  status: ArtworkStatus;
  images: {
    main: string;
    variants?: ArtworkImageVariants;
    thumbnail?: string;
    details?: string[];
    detailVariants?: ArtworkImageVariants[];
    gallery?: ArtworkImageAsset[];
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
  internalKey?: string;
  title: string;
  subtitle: string;
  description: string;
  assetBasePath?: string;
  coverImage: string;
  coverImageVariants?: ArtworkImageVariants;
  years: string;
  category?: ArtworkSeriesCategory;
  status?: ArtworkSeriesStatus;
  featured?: boolean;
  order?: number;
  artworkSlugs?: string[];
};
