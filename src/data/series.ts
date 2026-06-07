import type { ArtworkSeries } from "@/types/artwork";

export const series: ArtworkSeries[] = [
  {
    slug: "silencios-minerales",
    title: "Silencios minerales",
    subtitle: "Materia, pausa y luz baja",
    description:
      "Un cuerpo de trabajo que observa superficies quietas, capas erosionadas y la belleza de lo casi imperceptible.",
    coverImage:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1400&q=80",
    years: "2026",
  },
  {
    slug: "botanica-interior",
    title: "Botanica interior",
    subtitle: "Formas organicas y memoria domestica",
    description:
      "Serie de lienzos donde lo vegetal aparece como una arquitectura emocional: sombra, refugio y crecimiento lento.",
    coverImage:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1400&q=80",
    years: "2025",
  },
];

export function getSeriesBySlug(slug: string) {
  return series.find((item) => item.slug === slug);
}
