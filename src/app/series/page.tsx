import type { Metadata } from "next";
import { PageSection } from "@/components/layout/PageSection";
import { SeriesGrid } from "@/components/series/SeriesGrid";
import { pageContent } from "@/content/pages";
import { series } from "@/data/series";

export const metadata: Metadata = {
  title: pageContent.series.metadata.title,
  description: pageContent.series.metadata.description,
};

export default function SeriesPage() {
  return (
    <PageSection className="py-16 lg:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{pageContent.series.header.eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{pageContent.series.header.title}</h1>
      </div>
      <SeriesGrid items={series} />
    </PageSection>
  );
}
