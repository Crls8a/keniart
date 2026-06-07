import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { getArtworksBySeries } from "@/data/artworks";
import { getSeriesBySlug, series } from "@/data/series";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return series.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getSeriesBySlug(slug);
  if (!item) return { title: "Serie no encontrada" };

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getSeriesBySlug(slug);
  if (!item) notFound();
  const seriesArtworks = getArtworksBySeries(item.slug);

  return (
    <>
      <section className="grid min-h-[70vh] lg:grid-cols-2">
        <div className="flex items-center px-5 py-16 sm:px-8 lg:px-16">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">{item.years}</p>
            <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{item.title}</h1>
            <p className="mt-5 text-xl text-muted">{item.subtitle}</p>
            <p className="mt-8 text-lg leading-8 text-muted">{item.description}</p>
          </div>
        </div>
        <div className="relative min-h-[50vh] bg-line">
          <Image src={item.coverImage} alt={item.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <ArtworkGrid artworks={seriesArtworks} />
      </section>
    </>
  );
}
