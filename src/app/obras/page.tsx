import type { Metadata } from "next";
import { StructuredData } from "@/components/artwork/StructuredData";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { artworks } from "@/data/artworks";
import { collectionSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Obras",
  description: "Catalogo de lienzos disponibles, reservados y de archivo.",
};

export default function ObrasPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <StructuredData data={collectionSchema("Catalogo de obras Keniart", artworks)} />
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Catalogo</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">Obras</h1>
        <p className="mt-6 text-lg leading-8 text-muted">Lienzos organizados como archivo publico del estudio. Los estados indican disponibilidad inicial para consulta.</p>
      </div>
      <GalleryExperience artworks={artworks} />
    </section>
  );
}
