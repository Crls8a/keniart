import type { Metadata } from "next";
import { PageSection } from "@/components/layout/PageSection";
import { SeriesGrid } from "@/components/series/SeriesGrid";
import { pageContent } from "@/content/pages";
import { getSeriesYearLabel } from "@/data/artworks";
import { series } from "@/data/series";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: pageContent.series.metadata.title,
  description: pageContent.series.metadata.description,
  path: routes.series.index,
  image: series[0]?.coverImage,
  imageAlt: series[0]?.title,
});

export default function SeriesPage() {
  const seriesItems = series.map((item) => ({ ...item, years: getSeriesYearLabel(item.slug) ?? item.years }));

  return (
    <PageSection className="py-16 lg:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{pageContent.series.header.eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{pageContent.series.header.title}</h1>
      </div>
      <SeriesGrid items={seriesItems} />
    </PageSection>
  );
}
