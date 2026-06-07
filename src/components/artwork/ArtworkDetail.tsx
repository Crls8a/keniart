import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/types/artwork";
import { formatDimensions, formatPrice } from "@/lib/format";
import { AvailabilityBadge } from "@/components/artwork/AvailabilityBadge";

export function ArtworkDetail({ artwork }: { artwork: Artwork }) {
  return (
    <article className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
      <div className="relative aspect-[4/5] overflow-hidden bg-line lg:sticky lg:top-28">
        <Image
          src={artwork.images.main}
          alt={artwork.title}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="self-start">
        <AvailabilityBadge status={artwork.status} />
        <h1 className="mt-6 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{artwork.title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted">{artwork.description}</p>
        <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
          {[
            ["Ano", artwork.year],
            ["Tecnica", artwork.technique],
            ["Soporte", artwork.support],
            ["Medidas", formatDimensions(artwork.dimensions)],
            ["Precio", formatPrice(artwork.price)],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[9rem_1fr] gap-4 py-4">
              <dt className="uppercase tracking-[0.22em] text-muted">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href={`/contacto?obra=${artwork.slug}`}
            className="rounded-full bg-foreground px-7 py-3 text-center text-sm uppercase tracking-[0.22em] text-background"
          >
            Consultar obra
          </Link>
          <Link
            href="/obras"
            className="rounded-full border border-foreground px-7 py-3 text-center text-sm uppercase tracking-[0.22em]"
          >
            Volver al catalogo
          </Link>
        </div>
      </div>
    </article>
  );
}
