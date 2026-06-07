import type { Metadata } from "next";
import { GalleryMode } from "@/components/artwork/GalleryMode";
import { dossierArtworks } from "@/data/artworks";

export const metadata: Metadata = {
  title: "Para galerias",
  description: "Seleccion fullscreen curada para galerias y propuestas curatoriales.",
};

export default function GaleriasPage() {
  return <GalleryMode artworks={dossierArtworks} />;
}
