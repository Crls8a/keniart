import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { series } from "@/data/series";

export const metadata: Metadata = {
  title: "Series",
  description: "Cuerpos de trabajo y narrativas visuales de Keniart.",
};

export default function SeriesPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Cuerpos de trabajo</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">Series</h1>
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        {series.map((item) => (
          <Link key={item.slug} href={`/series/${item.slug}`} className="group block focus-visible:outline-offset-4">
            <div className="relative aspect-[5/4] overflow-hidden bg-line">
              <Image src={item.coverImage} alt={item.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition duration-700 motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]" />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">{item.years}</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em]">{item.title}</h2>
            <p className="mt-4 leading-7 text-muted">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
