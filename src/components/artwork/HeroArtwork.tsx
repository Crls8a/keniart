import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/types/artwork";
import { formatDimensions } from "@/lib/format";
import { AvailabilityBadge } from "@/components/artwork/AvailabilityBadge";

export function HeroArtwork({ artwork }: { artwork: Artwork }) {
  return (
    <section className="grid min-h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex items-center px-5 py-16 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted">Galeria digital</p>
          <h1 className="font-serif text-5xl leading-tight tracking-[-0.04em] sm:text-7xl">
            Pintura contemporanea para mirar en silencio.
          </h1>
          <p className="mt-8 text-lg leading-8 text-muted">
            Catalogo curado de lienzos, series y dossier profesional para coleccionistas y galerias.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/obras"
              className="rounded-full bg-foreground px-7 py-3 text-center text-sm uppercase tracking-[0.22em] text-background transition hover:opacity-85"
            >
              Ver obras
            </Link>
            <Link
              href="/galerias"
              className="rounded-full border border-foreground px-7 py-3 text-center text-sm uppercase tracking-[0.22em] transition hover:bg-foreground hover:text-background"
            >
              Modo galeria
            </Link>
          </div>
        </div>
      </div>
      <Link href={`/obras/${artwork.slug}`} className="group relative min-h-[70vh] overflow-hidden bg-line">
        <Image
          src={artwork.images.main}
          alt={artwork.title}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="slow-zoom object-cover"
        />
        <div className="absolute inset-x-5 bottom-5 bg-paper/90 p-5 backdrop-blur sm:inset-x-8 sm:bottom-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <AvailabilityBadge status={artwork.status} />
            <span className="text-xs uppercase tracking-[0.24em] text-muted">Obra destacada</span>
          </div>
          <h2 className="text-2xl font-medium">{artwork.title}</h2>
          <p className="mt-2 text-sm text-muted">
            {artwork.year} - {artwork.technique} - {formatDimensions(artwork.dimensions)}
          </p>
        </div>
      </Link>
    </section>
  );
}
