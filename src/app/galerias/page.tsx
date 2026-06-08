import type { Metadata } from "next";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { dossierArtworks } from "@/data/artworks";

export const metadata: Metadata = {
  title: "Para galerias",
  description: "Seleccion fullscreen curada para galerias y propuestas curatoriales.",
};

export default function GaleriasPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <GalleryExperience artworks={dossierArtworks} defaultMode="curated" />
    </section>
  );
}
