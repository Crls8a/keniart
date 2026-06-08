import type { ArtworkSeries } from "@/types/artwork";

export const PINTO_TU_MASCOTA_SERIES_SLUG = "pinto-tu-mascota";
export const PINTO_TU_MASCOTA_ASSET_BASE_PATH = "/artworks/optimized/lomitos";
export const CARTOGRAFIAS_DEL_ALMA_SERIES_SLUG = "cartografias-del-alma";
export const CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH = "/artworks/optimized/cartografias-del-alma";

const kooperCoverImage = `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/desktop/KOOPER/B9970757-2B74-488E-B758-A088FF8093C5.webp`;
const cartografiasCoverImage = `${CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH}/desktop/la-mirada-del-universo/image-01.webp`;

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
  {
    slug: CARTOGRAFIAS_DEL_ALMA_SERIES_SLUG,
    internalKey: "cartografias-del-alma-assets",
    title: "Cartografías del alma",
    subtitle: "Paisajes interiores, viaje y memoria",
    description:
      "Serie de pinturas reunidas como mapas sensibles: miradas, criaturas, órbitas y territorios íntimos que trazan una geografía serena del mundo interior.",
    assetBasePath: CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH,
    coverImage: cartografiasCoverImage,
    coverImageVariants: {
      main: cartografiasCoverImage,
      desktop: cartografiasCoverImage,
      tablet: `${CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH}/tablet/la-mirada-del-universo/image-01.webp`,
      mobile: `${CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH}/mobile/la-mirada-del-universo/image-01.webp`,
      thumb: `${CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH}/thumb/la-mirada-del-universo/image-01.webp`,
    },
    years: "2026",
    category: "collection",
    status: "active",
    order: 2,
    artworkSlugs: [
      "retratos",
      "la-mirada-del-universo",
      "cuba",
      "aurora-boreal",
      "arbol-de-vida",
      "peces-dorados",
      "venus-el-origen-suave-del-amor",
      "tortuga",
      "guardianes-de-la-luz-y-sabiduria",
      "renacer-interestelar-orbita-8",
      "trascender-viaje-espiritual",
      "presentacion-en-galeria",
    ],
  },
];

export const series = seriesItems.toSorted((a, b) => (a.order ?? 99) - (b.order ?? 99));

export function getSeriesBySlug(slug: string) {
  return series.find((item) => item.slug === slug);
}
