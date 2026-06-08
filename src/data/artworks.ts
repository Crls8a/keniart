import type { Artwork, ArtworkImageAsset } from "@/types/artwork";
import {
  CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH,
  CARTOGRAFIAS_DEL_ALMA_SERIES_SLUG,
  PINTO_TU_MASCOTA_ASSET_BASE_PATH,
  PINTO_TU_MASCOTA_SERIES_SLUG,
} from "@/data/series";

type ArtworkImageInput = {
  file: string;
  width: number;
  height: number;
};

type PetPortraitImageInput = ArtworkImageInput;

type PetPortraitArtworkInput = {
  slug: string;
  title: string;
  folder: string;
  files: PetPortraitImageInput[];
  featured?: boolean;
  dossierOrder: number;
};

type CartografiasArtworkInput = {
  slug: string;
  title: string;
  folder: string;
  files: ArtworkImageInput[];
  description: string;
  year: number;
  technique: string;
  support: string;
  dimensions: Artwork["dimensions"];
  status: Artwork["status"];
  price?: Artwork["price"];
  tags: string[];
  featured?: boolean;
  dossierOrder: number;
  galleryNotes?: string;
};

function petPortraitImageVariants(folder: string, file: string) {
  return {
    main: `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/desktop/${folder}/${file}`,
    desktop: `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/desktop/${folder}/${file}`,
    tablet: `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/tablet/${folder}/${file}`,
    mobile: `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/mobile/${folder}/${file}`,
    thumb: `${PINTO_TU_MASCOTA_ASSET_BASE_PATH}/thumb/${folder}/${file}`,
  };
}

function imageOrientation({ width, height }: PetPortraitImageInput) {
  if (width === height) return "square";
  return width > height ? "landscape" : "portrait";
}

function petPortraitImageAsset(folder: string, petName: string, image: PetPortraitImageInput): ArtworkImageAsset {
  const variants = petPortraitImageVariants(folder, image.file);

  return {
    src: variants.main,
    alt: `Retrato de ${petName} en la serie Pinto tu mascota.`,
    variants,
    width: image.width,
    height: image.height,
    aspectRatio: Number((image.width / image.height).toFixed(4)),
    orientation: imageOrientation(image),
  };
}

function createPetPortraitArtwork({ slug, title, folder, files, featured = false, dossierOrder }: PetPortraitArtworkInput): Artwork {
  const petName = title.replace("Retrato de ", "");
  const gallery = files.map((file) => petPortraitImageAsset(folder, petName, file));
  const [mainImage, ...detailImages] = gallery;
  const detailVariants = detailImages.flatMap((image) => (image.variants ? [image.variants] : []));

  if (!mainImage) {
    throw new Error(`Pinto tu mascota artwork ${slug} needs at least one image.`);
  }

  return {
    id: `${PINTO_TU_MASCOTA_SERIES_SLUG}-${slug}`,
    slug,
    title,
    year: 2026,
    seriesSlug: PINTO_TU_MASCOTA_SERIES_SLUG,
    technique: "Óleo",
    support: "Lienzo pintado",
    dimensions: { kind: "unknown", label: "Medidas a confirmar" },
    status: "not_for_sale",
    images: {
      main: mainImage.src,
      variants: mainImage.variants,
      thumbnail: mainImage.variants?.thumb,
      details: detailImages.map((image) => image.src),
      detailVariants,
      gallery,
    },
    description: `Óleo sobre lienzo pintado de ${petName}, parte de la serie Pinto tu mascota: retratos de compañía construidos desde el gesto, la mirada y la presencia singular de cada animal.`,
    tags: ["mascotas", "retrato por encargo", "pinto tu mascota"],
    featured,
    dossierSelected: true,
    experience: {
      heroCrop: { focus: "center", objectPosition: "50% 45%" },
      animationPriority: featured ? "hero" : "standard",
      galleryNotes: "Óleo sobre lienzo pintado. Medidas finales pendientes de confirmación.",
      dossierOrder,
      aspectRatio: mainImage.aspectRatio,
    },
    createdAt: "2026-06-08",
    updatedAt: "2026-06-08",
  };
}

function cartografiasImageVariants(folder: string, file: string) {
  return {
    main: `${CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH}/desktop/${folder}/${file}`,
    desktop: `${CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH}/desktop/${folder}/${file}`,
    tablet: `${CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH}/tablet/${folder}/${file}`,
    mobile: `${CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH}/mobile/${folder}/${file}`,
    thumb: `${CARTOGRAFIAS_DEL_ALMA_ASSET_BASE_PATH}/thumb/${folder}/${file}`,
  };
}

function cartografiasImageAsset(folder: string, title: string, image: ArtworkImageInput): ArtworkImageAsset {
  const variants = cartografiasImageVariants(folder, image.file);

  return {
    src: variants.main,
    alt: `${title}, serie Cartografías del alma.`,
    variants,
    width: image.width,
    height: image.height,
    aspectRatio: Number((image.width / image.height).toFixed(4)),
    orientation: imageOrientation(image),
  };
}

function createCartografiasArtwork({
  slug,
  title,
  folder,
  files,
  description,
  year,
  technique,
  support,
  dimensions,
  status,
  price,
  tags,
  featured = false,
  dossierOrder,
  galleryNotes,
}: CartografiasArtworkInput): Artwork {
  const gallery = files.map((file) => cartografiasImageAsset(folder, title, file));
  const [mainImage, ...detailImages] = gallery;
  const detailVariants = detailImages.flatMap((image) => (image.variants ? [image.variants] : []));

  if (!mainImage) {
    throw new Error(`Cartografías del alma artwork ${slug} needs at least one image.`);
  }

  return {
    id: `${CARTOGRAFIAS_DEL_ALMA_SERIES_SLUG}-${slug}`,
    slug,
    title,
    year,
    seriesSlug: CARTOGRAFIAS_DEL_ALMA_SERIES_SLUG,
    technique,
    support,
    dimensions,
    price,
    status,
    images: {
      main: mainImage.src,
      variants: mainImage.variants,
      thumbnail: mainImage.variants?.thumb,
      details: detailImages.map((image) => image.src),
      detailVariants,
      gallery,
    },
    description,
    tags: ["cartografías del alma", ...tags],
    featured,
    dossierSelected: true,
    experience: {
      heroCrop: { focus: "center", objectPosition: "50% 45%" },
      animationPriority: featured ? "featured" : "standard",
      galleryNotes,
      dossierOrder,
      aspectRatio: mainImage.aspectRatio,
    },
    createdAt: "2026-06-08",
    updatedAt: "2026-06-08",
  };
}

const petPortraitArtworks: Artwork[] = [
  createPetPortraitArtwork({
    slug: "bruno",
    title: "Retrato de Bruno",
    folder: "Bruno",
    files: [
      { file: "A8469144-86E8-43BA-AB17-62567E9B0643_1_105_c.webp", width: 772, height: 1018 },
      { file: "A0F28944-0E4A-4E56-BB8B-966CB3FCF77F_1_105_c.webp", width: 768, height: 1024 },
    ],
    dossierOrder: 10,
  }),
  createPetPortraitArtwork({
    slug: "chapa",
    title: "Retrato de Chapa",
    folder: "Chapa",
    files: [
      { file: "5025E593-A90C-44D7-93C3-CFC60487E34C_1_105_c.webp", width: 1024, height: 768 },
      { file: "103FC6C2-53C6-42F5-829A-BF0476BA34FA_1_105_c.webp", width: 768, height: 1024 },
    ],
    dossierOrder: 11,
  }),
  createPetPortraitArtwork({
    slug: "coco",
    title: "Retrato de Coco",
    folder: "Coco",
    files: [{ file: "E46F0670-5080-49A0-A062-5B48E437821A_1_105_c.webp", width: 768, height: 1024 }],
    dossierOrder: 12,
  }),
  createPetPortraitArtwork({
    slug: "goliath",
    title: "Retrato de Goliath",
    folder: "Goliath",
    files: [
      { file: "97CA26BC-FEAE-4441-A2AE-B4417DF3AF34_1_105_c.webp", width: 768, height: 1024 },
      { file: "4C864272-3C16-481B-9269-A67773000A14_1_105_c.webp", width: 768, height: 1024 },
    ],
    dossierOrder: 13,
  }),
  createPetPortraitArtwork({
    slug: "gufis",
    title: "Retrato de Gufis",
    folder: "Gufis",
    files: [{ file: "DE18B67F-A4EF-4CBD-882C-C525D64D5EFC_1_105_c.webp", width: 886, height: 886 }],
    dossierOrder: 14,
  }),
  createPetPortraitArtwork({
    slug: "jochito",
    title: "Retrato de Jochito",
    folder: "Jochito",
    files: [
      { file: "7598AA0D-C459-48F1-8F8B-0C2AF75D0538_1_105_c.webp", width: 768, height: 1024 },
      { file: "20A6A447-F9C7-426E-9730-3E5DD3691882_1_105_c.webp", width: 768, height: 1024 },
    ],
    dossierOrder: 15,
  }),
  createPetPortraitArtwork({
    slug: "kooper",
    title: "Retrato de Kooper",
    folder: "KOOPER",
    files: [
      { file: "B9970757-2B74-488E-B758-A088FF8093C5.webp", width: 744, height: 992 },
      { file: "94BB8573-56BB-4743-9BDD-EE1C5794CE70_1_102_o.webp", width: 640, height: 1138 },
      { file: "4502EABD-6263-4683-A2C4-4693F9BFC673_1_201_a.webp", width: 507, height: 562 },
      { file: "377B4663-BE89-49E6-9B3C-690B2285307C_1_201_a.webp", width: 610, height: 562 },
      { file: "1C57224E-D3F0-4E93-8599-ABC3B0F74F09_1_105_c.webp", width: 886, height: 886 },
      { file: "1A5899DA-15BD-405E-886A-306D9EC6E30E.webp", width: 750, height: 898 },
      { file: "178FAB41-B27B-40BB-A7F6-5BF18EBFBE76_1_105_c.webp", width: 886, height: 886 },
    ],
    featured: true,
    dossierOrder: 1,
  }),
  createPetPortraitArtwork({
    slug: "pato",
    title: "Retrato de Pato",
    folder: "PATO",
    files: [
      { file: "E8F1809B-043E-461F-AD6D-18E6374250B2_1_105_c.webp", width: 768, height: 1024 },
      { file: "B0AB88B0-A63E-4B95-863D-75ED4201C7D8_1_105_c.webp", width: 735, height: 1068 },
      { file: "74EF9F0E-92F4-44DB-8B55-D2C54350C3B2_1_106_c.webp", width: 720, height: 1280 },
      { file: "3FC35F0B-7139-44FA-B144-E92861207AE6_1_105_c.webp", width: 886, height: 886 },
      { file: "3FC35F0B-7139-44FA-B144-E92861207AE6_1_105_c(1).webp", width: 886, height: 886 },
      { file: "322B6597-CB1A-488E-B2FE-9ACA1AE18AA8_1_105_c.webp", width: 886, height: 886 },
    ],
    dossierOrder: 16,
  }),
  createPetPortraitArtwork({
    slug: "plutarco",
    title: "Retrato de Plutarco",
    folder: "Plutarco",
    files: [
      { file: "65CD9DBB-91E3-40D2-BF91-1852E416BCBE_1_105_c.webp", width: 768, height: 1024 },
      { file: "448EDEF3-4E38-42E5-8A3D-4E02AF0695CF_1_105_c.webp", width: 768, height: 1024 },
    ],
    dossierOrder: 17,
  }),
];

const cartografiasArtworks: Artwork[] = [
  createCartografiasArtwork({
    slug: "guardianes-de-la-luz-y-sabiduria",
    title: "Guardianes de la luz y sabiduría",
    folder: "guardianes-de-la-luz-y-sabiduria",
    files: [
      { file: "image-01.webp", width: 806, height: 974 },
      { file: "image-02.webp", width: 806, height: 974 },
      { file: "image-03.webp", width: 806, height: 974 },
      { file: "image-04.webp", width: 806, height: 974 },
      { file: "image-05.webp", width: 1182, height: 665 },
    ],
    description: "Caminar juntos es recordar el origen. La fuerza habita en nuestras raíces y la luz, en quienes nos protegen en el silencio.",
    year: 2025,
    technique: "Óleo",
    support: "Lienzo",
    dimensions: { heightCm: 80, widthCm: 120 },
    status: "sold",
    price: { amount: 50000, currency: "MXN", visibility: "public" },
    tags: ["guardianes", "luz", "sabiduría"],
    featured: true,
    dossierOrder: 1,
    galleryNotes: "Óleo sobre lienzo. Exhibida en Galería Vértice, noviembre de 2025.",
  }),
  createCartografiasArtwork({
    slug: "arbol-de-vida",
    title: "Árbol de vida",
    folder: "arbol-de-vida",
    files: [
      { file: "image-01.webp", width: 1440, height: 1800 },
      { file: "image-02.webp", width: 1490, height: 1800 },
      { file: "image-03.webp", width: 1490, height: 1800 },
      { file: "image-04.webp", width: 1800, height: 1800 },
    ],
    description: "Raíces divinas en el árbol de la vida: florece el amor. En el canto del colibrí habita el abrazo que nos recuerda lo vital; el eterno retorno a la esencia del alma.",
    year: 2024,
    technique: "Óleo",
    support: "Lienzo",
    dimensions: { heightCm: 100, widthCm: 150 },
    status: "sold",
    price: { amount: 60000, currency: "MXN", visibility: "public" },
    tags: ["árbol", "vida", "naturaleza"],
    dossierOrder: 2,
    galleryNotes: "Óleo sobre lienzo.",
  }),
  createCartografiasArtwork({
    slug: "trascender-viaje-espiritual",
    title: "Trascender (viaje espiritual)",
    folder: "trascender-viaje-espiritual",
    files: [
      { file: "image-01.webp", width: 1350, height: 1800 },
      { file: "image-02.webp", width: 807, height: 974 },
      { file: "image-03.webp", width: 1350, height: 1800 },
      { file: "image-04.webp", width: 1350, height: 1800 },
    ],
    description: "Madre que respiras en el silencio, en el brote de lo tierno y en la raíz antigua, habitas dentro como un latido incesante. Desde las alturas, el águila blanca vigila el alma como mensajera de lo místico y símbolo de absoluta claridad.",
    year: 2025,
    technique: "Óleo",
    support: "Lienzo",
    dimensions: { heightCm: 100, widthCm: 150 },
    status: "sold",
    price: { amount: 60000, currency: "MXN", visibility: "public" },
    tags: ["trascender", "viaje espiritual", "tránsito"],
    dossierOrder: 3,
    galleryNotes: "Óleo sobre lienzo.",
  }),
  createCartografiasArtwork({
    slug: "venus-el-origen-suave-del-amor",
    title: "Venus (el origen suave del amor)",
    folder: "venus-el-origen-suave-del-amor",
    files: [
      { file: "image-02.webp", width: 1350, height: 1800 },
      { file: "image-03.webp", width: 806, height: 974 },
      { file: "image-04.webp", width: 1350, height: 1800 },
      { file: "image-05.webp", width: 1800, height: 1800 },
    ],
    description: "Una danza de nácar y oro sobre el lienzo del océano. El mar se vuelve cuna y la brisa, abrazo; tres fuerzas, un solo instante: el suspiro que empuja, la belleza que transita y la tierra que recibe.",
    year: 2024,
    technique: "Óleo",
    support: "Lienzo",
    dimensions: { heightCm: 90, widthCm: 80 },
    status: "available",
    price: { amount: 50000, currency: "MXN", visibility: "public" },
    tags: ["venus", "amor", "origen"],
    dossierOrder: 4,
    galleryNotes: "Óleo sobre lienzo. Exhibida en Galería Espacio Libre, diciembre de 2024.",
  }),
  createCartografiasArtwork({
    slug: "renacer-interestelar-orbita-8",
    title: "Renacer interestelar (Órbita 8)",
    folder: "renacer-interestelar-orbita-8",
    files: [
      { file: "image-01.webp", width: 806, height: 974 },
      { file: "image-02.webp", width: 806, height: 974 },
      { file: "image-03.webp", width: 806, height: 974 },
      { file: "image-04.webp", width: 806, height: 974 },
      { file: "image-05.webp", width: 1182, height: 665 },
    ],
    description: "El ciclo infinito del reencuentro entre dos conciencias que se aman desde otras galaxias. Órbita 8 abre una edición limitada de ocho reproducciones seriadas en alta fidelidad.",
    year: 2025,
    technique: "Impresión Giclée",
    support: "Lienzo de algodón",
    dimensions: { kind: "unknown", label: "80 x 120 cm o 50 x 40 cm" },
    status: "available",
    price: { amount: 3500, currency: "MXN", visibility: "public" },
    tags: ["renacer", "órbita", "interestelar"],
    dossierOrder: 5,
    galleryNotes: "Edición especial limitada de 8 ejemplares, numerados y firmados al reverso.",
  }),
  createCartografiasArtwork({
    slug: "habana-cuba",
    title: "Habana, Cuba",
    folder: "habana-cuba",
    files: [
      { file: "image-01.webp", width: 1350, height: 1800 },
      { file: "image-02.webp", width: 1350, height: 1800 },
      { file: "image-03.webp", width: 1350, height: 1800 },
      { file: "image-04.webp", width: 1350, height: 1800 },
      { file: "image-05.webp", width: 1800, height: 1800 },
    ],
    description: "Este lienzo nació de los contrastes, la luz y la calidez de La Habana. La ciudad se vuelve un latido constante: testimonio visual de un viaje que transformó la memoria en presencia.",
    year: 2022,
    technique: "Impresión Giclée",
    support: "Lienzo texturizado",
    dimensions: { heightCm: 50, widthCm: 40 },
    status: "available",
    price: { amount: 6000, currency: "MXN", visibility: "public" },
    tags: ["habana", "cuba", "memoria"],
    dossierOrder: 6,
    galleryNotes: "Edición limitada de 3 ejemplares. Reproducción digital autorizada del óleo original de 2022.",
  }),
];

export const artworks: Artwork[] = [...petPortraitArtworks, ...cartografiasArtworks];

export const featuredArtwork = artworks.find((artwork) => artwork.featured) ?? artworks[0];

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function getArtworksBySeries(seriesSlug: string) {
  return artworks.filter((artwork) => artwork.seriesSlug === seriesSlug);
}

export const dossierArtworks = artworks.filter((artwork) => artwork.dossierSelected);
