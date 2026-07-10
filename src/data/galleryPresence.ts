export type GalleryPresenceImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

const GALLERY_PRESENCE_ASSET_BASE_PATH = "/artist/optimized/gallery-presence";

export const galleryPresenceImages: GalleryPresenceImage[] = [
  {
    id: "gallery-presence-01",
    src: `${GALLERY_PRESENCE_ASSET_BASE_PATH}/49026333-8897-496B-B828-BD14B5229991_1_102_o.webp`,
    alt: "Vista de una presentación de Keniart en galería con obra instalada en sala.",
    caption: "Presentación en galería.",
    width: 1800,
    height: 1350,
  },
  {
    id: "gallery-presence-02",
    src: `${GALLERY_PRESENCE_ASSET_BASE_PATH}/F6F3EFAD-DC28-46B6-BE90-070D64DDBFE4_1_102_o.webp`,
    alt: "Keniart durante una presentación en galería junto a obra expuesta.",
    caption: "Presencia de la artista en sala.",
    width: 1350,
    height: 1800,
  },
  {
    id: "gallery-presence-03",
    src: `${GALLERY_PRESENCE_ASSET_BASE_PATH}/B3FF9002-3154-4476-B28C-6DFED00024AB_1_105_c.webp`,
    alt: "Registro de sala de galería con obra de Keniart en contexto expositivo.",
    caption: "Registro de montaje y encuentro.",
    width: 768,
    height: 1024,
  },
  {
    id: "gallery-presence-04",
    src: `${GALLERY_PRESENCE_ASSET_BASE_PATH}/2D980EE0-279A-4FF5-B267-DD0336E17A26_1_105_c.webp`,
    alt: "Detalle de presentación de Keniart en galería con público y obra en sala.",
    caption: "Contexto de exhibición.",
    width: 712,
    height: 1104,
  },
  {
    id: "gallery-presence-05",
    src: `${GALLERY_PRESENCE_ASSET_BASE_PATH}/00CA4F3D-1E53-4A72-AFBD-244CDB0AE2C0_1_105_c.webp`,
    alt: "Momento de una presentación en galería relacionada con la obra de Keniart.",
    caption: "Recorrido en galería.",
    width: 594,
    height: 1321,
  },
  {
    id: "gallery-presence-06",
    src: `${GALLERY_PRESENCE_ASSET_BASE_PATH}/23B2CB80-4F7F-4ABC-8967-AFEB35563EC4_1_105_c.webp`,
    alt: "Registro vertical de presencia de Keniart en un espacio de galería.",
    caption: "Presencia en galerías.",
    width: 594,
    height: 1321,
  },
  {
    id: "gallery-presence-07",
    src: `${GALLERY_PRESENCE_ASSET_BASE_PATH}/A7187F9B-679B-4460-AA48-844B1371E08B_1_105_c.webp`,
    alt: "Fotografía de presentación en galería con obra y ambiente expositivo.",
    caption: "Archivo de presentación.",
    width: 768,
    height: 1024,
  },
  {
    id: "gallery-presence-08",
    src: `${GALLERY_PRESENCE_ASSET_BASE_PATH}/DFFBB0EE-ED05-4F5B-9BFB-960EE8E489FE_1_105_c.webp`,
    alt: "Registro de galería que documenta la participación expositiva de Keniart.",
    caption: "Registro expositivo.",
    width: 594,
    height: 1321,
  },
];
