import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/types/artwork";

export function GalleryMode({ artworks }: { artworks: Artwork[] }) {
  return (
    <section className="bg-[#16120e] text-[#f7efe3]">
      {artworks.map((artwork, index) => (
        <article key={artwork.id} className="grid min-h-screen items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_22rem] lg:px-16">
          <Link href={`/obras/${artwork.slug}`} className="relative min-h-[65vh] overflow-hidden bg-black/30">
            <Image
              src={artwork.images.main}
              alt={artwork.title}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-contain"
            />
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#b8aa98]">
              Pieza {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-5 font-serif text-4xl tracking-[-0.04em]">{artwork.title}</h2>
            <p className="mt-4 leading-7 text-[#cfc2b1]">{artwork.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
