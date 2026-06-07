import type { Metadata } from "next";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { DossierDownload } from "@/components/dossier/DossierDownload";
import { ArtistBio } from "@/components/artist/ArtistBio";
import { dossierArtworks } from "@/data/artworks";

export const metadata: Metadata = {
  title: "Dossier",
  description: "Dossier web con statement, bio y seleccion de obra para galerias.",
};

export default function DossierPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Dossier para galerias</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl tracking-[-0.04em] sm:text-7xl">Una seleccion curada para lectura profesional.</h1>
      </section>
      <ArtistBio />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-10">
          <h2 className="font-serif text-4xl tracking-[-0.04em]">Seleccion de obra</h2>
          <p className="mt-4 text-muted">MVP con 4 piezas seleccionadas. El dossier final deberia crecer a 12-20 piezas.</p>
        </div>
        <ArtworkGrid artworks={dossierArtworks} />
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <DossierDownload />
      </section>
    </>
  );
}
