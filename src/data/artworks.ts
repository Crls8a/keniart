import type { Artwork } from "@/types/artwork";

const demoWallPreviewImage = {
  src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  alt: "Demo interior wall used only for artwork scale previews.",
};

export const artworks: Artwork[] = [
  {
    id: "aw-001",
    slug: "umbral-de-cal",
    title: "Umbral de cal",
    year: 2026,
    seriesSlug: "silencios-minerales",
    technique: "Acrilico y pigmento mineral",
    support: "Lienzo",
    dimensions: { heightCm: 120, widthCm: 90, depthCm: 4, aspectRatio: 0.75 },
    price: { amount: 1800, currency: "USD", visibility: "on_request" },
    status: "available",
    images: {
      main: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1400&q=80",
      inRoom: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    },
    description:
      "Una superficie contenida donde la materia parece respirar apenas antes de revelar su borde.",
    tags: ["mineral", "textura", "luz"],
    featured: true,
    dossierSelected: true,
    experience: {
      heroCrop: { focus: "center", objectPosition: "50% 42%" },
      dominantColor: "#8d8175",
      textureImages: [
        {
          src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=900&q=80",
          alt: "Demo close crop of mineral texture for Umbral de cal.",
        },
      ],
      wallPreviewImage: demoWallPreviewImage,
      animationPriority: "hero",
      galleryNotes: "Demo hero candidate for the mineral series and presentation opener.",
      dossierOrder: 1,
      aspectRatio: 0.75,
    },
    createdAt: "2026-04-20",
    updatedAt: "2026-06-07",
  },
  {
    id: "aw-002",
    slug: "jardin-nocturno",
    title: "Jardin nocturno",
    year: 2025,
    seriesSlug: "botanica-interior",
    technique: "Oleo",
    support: "Lienzo preparado",
    dimensions: { heightCm: 100, widthCm: 80, depthCm: 3, aspectRatio: 0.8 },
    status: "reserved",
    images: {
      main: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1400&q=80",
    },
    description:
      "Una pieza de pulso botanico que trabaja el contraste entre sombra densa y floracion tenue.",
    tags: ["botanica", "oleo", "noche"],
    featured: true,
    dossierSelected: true,
    experience: {
      heroCrop: { focus: "top", objectPosition: "50% 38%" },
      dominantColor: "#283328",
      textureImages: [
        {
          src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=80",
          alt: "Demo close crop of dark botanical brushwork for Jardin nocturno.",
        },
      ],
      wallPreviewImage: demoWallPreviewImage,
      animationPriority: "featured",
      galleryNotes: "Reserved demo work; later UI should avoid presenting it as available inventory.",
      dossierOrder: 2,
      aspectRatio: 0.8,
    },
    createdAt: "2025-11-14",
    updatedAt: "2026-06-07",
  },
  {
    id: "aw-003",
    slug: "respiracion-de-piedra",
    title: "Respiracion de piedra",
    year: 2026,
    seriesSlug: "silencios-minerales",
    technique: "Tecnica mixta",
    support: "Algodon sobre bastidor",
    dimensions: { heightCm: 150, widthCm: 110, depthCm: 4, aspectRatio: 0.73 },
    status: "available",
    images: {
      main: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80",
    },
    description:
      "Campo vertical de capas veladas, pensado como una pausa larga frente a la obra.",
    tags: ["gran formato", "materia", "vertical"],
    dossierSelected: true,
    experience: {
      heroCrop: { focus: "center", objectPosition: "50% 48%" },
      dominantColor: "#6f6b62",
      textureImages: [
        {
          src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80",
          alt: "Demo detail crop for Respiracion de piedra.",
        },
      ],
      wallPreviewImage: demoWallPreviewImage,
      animationPriority: "featured",
      galleryNotes: "Large-format demo candidate for wall preview scale checks.",
      dossierOrder: 3,
      aspectRatio: 0.73,
    },
    createdAt: "2026-02-09",
    updatedAt: "2026-06-07",
  },
  {
    id: "aw-004",
    slug: "hoja-en-suspenso",
    title: "Hoja en suspenso",
    year: 2025,
    seriesSlug: "botanica-interior",
    technique: "Acrilico",
    support: "Lienzo",
    dimensions: { heightCm: 70, widthCm: 60, depthCm: 3, aspectRatio: 0.86 },
    status: "sold",
    images: {
      main: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=1400&q=80",
    },
    description:
      "Estudio de una forma organica detenida entre gesto, memoria y respiracion.",
    tags: ["botanica", "pequeno formato", "gesto"],
    experience: {
      heroCrop: { focus: "center", objectPosition: "50% 44%" },
      dominantColor: "#6e5a45",
      textureImages: [
        {
          src: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=900&q=80",
          alt: "Demo detail crop for Hoja en suspenso.",
        },
      ],
      wallPreviewImage: demoWallPreviewImage,
      animationPriority: "low",
      galleryNotes: "Sold demo work retained for archive storytelling only.",
      aspectRatio: 0.86,
    },
    createdAt: "2025-09-02",
    updatedAt: "2026-06-07",
  },
  {
    id: "aw-005",
    slug: "corte-de-luz",
    title: "Corte de luz",
    year: 2024,
    technique: "Oleo y grafito",
    support: "Lino",
    dimensions: { heightCm: 90, widthCm: 120, depthCm: 4, aspectRatio: 1.33 },
    status: "available",
    images: {
      main: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1400&q=80",
    },
    description:
      "Composicion horizontal donde una linea clara ordena el peso del color y el silencio.",
    tags: ["lino", "horizontal", "grafito"],
    dossierSelected: true,
    experience: {
      heroCrop: { focus: "center", objectPosition: "50% 52%" },
      dominantColor: "#a67a48",
      textureImages: [
        {
          src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=80",
          alt: "Demo horizontal crop for Corte de luz.",
        },
      ],
      wallPreviewImage: demoWallPreviewImage,
      animationPriority: "standard",
      galleryNotes: "Horizontal demo work for archive and wall-preview layout variation.",
      dossierOrder: 4,
      aspectRatio: 1.33,
    },
    createdAt: "2024-12-12",
    updatedAt: "2026-06-07",
  },
  {
    id: "aw-006",
    slug: "archivo-del-aire",
    title: "Archivo del aire",
    year: 2026,
    seriesSlug: "silencios-minerales",
    technique: "Pigmento, acrilico y carbonilla",
    support: "Lienzo",
    dimensions: { heightCm: 80, widthCm: 80, depthCm: 3, aspectRatio: 1 },
    status: "not_for_sale",
    images: {
      main: "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=1400&q=80",
    },
    description:
      "Pieza cuadrada de archivo, conservada como referencia del cuerpo actual de trabajo.",
    tags: ["archivo", "carbonilla", "cuadrado"],
    experience: {
      heroCrop: { focus: "center", objectPosition: "50% 50%" },
      dominantColor: "#505352",
      textureImages: [
        {
          src: "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=900&q=80",
          alt: "Demo square crop for Archivo del aire.",
        },
      ],
      wallPreviewImage: demoWallPreviewImage,
      animationPriority: "low",
      galleryNotes: "Archive-only demo reference; later UI should label it without purchase framing.",
      aspectRatio: 1,
    },
    createdAt: "2026-01-18",
    updatedAt: "2026-06-07",
  },
];

export const featuredArtwork = artworks.find((artwork) => artwork.featured) ?? artworks[0];

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function getArtworksBySeries(seriesSlug: string) {
  return artworks.filter((artwork) => artwork.seriesSlug === seriesSlug);
}

export const dossierArtworks = artworks.filter((artwork) => artwork.dossierSelected);
