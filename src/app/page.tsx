import Link from "next/link";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { HeroArtwork } from "@/components/artwork/HeroArtwork";
import { StructuredData } from "@/components/artwork/StructuredData";
import { DossierDownload } from "@/components/dossier/DossierDownload";
import { artworks, featuredArtwork } from "@/data/artworks";
import { series } from "@/data/series";
import { collectionSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <StructuredData data={collectionSchema("Keniart - seleccion destacada", artworks)} />
      <HeroArtwork artwork={featuredArtwork} />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Seleccion</p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">Obras recientes</h2>
          </div>
          <Link href="/obras" className="text-sm uppercase tracking-[0.22em] underline focus-visible:outline-offset-4">
            Ver catalogo completo
          </Link>
        </div>
        <ArtworkGrid artworks={artworks.slice(0, 3)} />
      </section>
      <section className="border-y border-line bg-paper/60 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {series.map((item) => (
            <Link key={item.slug} href={`/series/${item.slug}`} className="group border border-line bg-background p-8 transition motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1 focus-visible:outline-offset-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.years}</p>
              <h3 className="mt-5 font-serif text-4xl tracking-[-0.04em]">{item.title}</h3>
              <p className="mt-4 leading-7 text-muted">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <DossierDownload />
      </section>
    </>
  );
}
