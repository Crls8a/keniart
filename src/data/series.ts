import type { ArtworkSeries } from "@/types/artwork";

export const PINTO_TU_MASCOTA_SERIES_SLUG = "pinto-tu-mascota";
export const PINTO_TU_MASCOTA_ASSET_BASE_PATH = "/artworks/optimized/lomitos";

const kooperCoverImage = `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/desktop/KOOPER/B9970757-2B74-488E-B758-A088FF8093C5.webp`;

const seriesItems: ArtworkSeries[] = [
  {
    slug: PINTO_TU_MASCOTA_SERIES_SLUG,
    internalKey: "lomitos-assets",
    title: "Pinto tu mascota",
    subtitle: "Retratos de compañía, gesto y presencia",
    description:
      "Serie de pintura dedicada a animales de compañía: óleos sobre lienzo pintado, cercanos y afectivos, construidos desde la mirada singular de cada mascota.",
    assetBasePath: PINTO_TU_MASCOTA_ASSET_BASE_PATH,
    coverImage: kooperCoverImage,
    coverImageVariants: {
      main: kooperCoverImage,
      desktop: kooperCoverImage,
      tablet: `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/tablet/KOOPER/B9970757-2B74-488E-B758-A088FF8093C5.webp`,
      mobile: `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/mobile/KOOPER/B9970757-2B74-488E-B758-A088FF8093C5.webp`,
      thumb: `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/thumb/KOOPER/B9970757-2B74-488E-B758-A088FF8093C5.webp`,
    },
    years: "2026",
    category: "commission",
    status: "active",
    featured: true,
    order: 1,
    artworkSlugs: ["bruno", "chapa", "coco", "goliath", "gufis", "jochito", "kooper", "pato", "plutarco"],
  },
];

export const series = [...seriesItems].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export function getSeriesBySlug(slug: string) {
  return series.find((item) => item.slug === slug);
}

export const featuredSeries = series.filter((item) => item.featured);
