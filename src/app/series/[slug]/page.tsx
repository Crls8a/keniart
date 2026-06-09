import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { PageSection } from "@/components/layout/PageSection";
import { SeriesHero } from "@/components/series/SeriesHero";
import { pageContent } from "@/content/pages";
import { getArtworksBySeries, getCatalogArtworkHref } from "@/data/artworks";
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
  if (!item) return { title: pageContent.series.metadata.notFoundTitle };

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
      <SeriesHero item={item} />
      <PageSection className="py-16 lg:py-24">
        <ArtworkGrid artworks={seriesArtworks} getArtworkHref={getCatalogArtworkHref} />
      </PageSection>
    </>
  );
}
