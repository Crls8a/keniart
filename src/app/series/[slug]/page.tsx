import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { PageSection } from "@/components/layout/PageSection";
import { SeriesHero } from "@/components/series/SeriesHero";
import { pageContent } from "@/content/pages";
import { getCatalogOnlyArtworkHref, getSeriesArtworks, getSeriesYearLabel } from "@/data/artworks";
import { getSeriesBySlug, PINTO_TU_MASCOTA_SERIES_SLUG, series } from "@/data/series";
import { StructuredData } from "@/components/artwork/StructuredData";
import { routes } from "@/lib/routes";
import { seriesPageSchema } from "@/lib/schema";
import { createPageMetadata, whatsappUrl } from "@/lib/seo";

const petPortraitInquiryUrl = whatsappUrl(
  "Hola, quiero consultar la disponibilidad y las condiciones para encargar un retrato de mi mascota.",
);

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

  return createPageMetadata({
    title: item.title,
    description: item.description,
    path: routes.series.detail(item.slug),
    image: item.coverImage,
    imageAlt: item.title,
  });
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getSeriesBySlug(slug);
  if (!item) notFound();
  const seriesArtworks = getSeriesArtworks(item.slug);
  const seriesItem = { ...item, years: getSeriesYearLabel(item.slug) ?? item.years };

  return (
    <>
      <StructuredData data={seriesPageSchema(item, seriesArtworks)} />
      <SeriesHero item={seriesItem} />
      {item.slug === PINTO_TU_MASCOTA_SERIES_SLUG ? (
        <PageSection className="py-14 lg:py-20">
          <div className="max-w-3xl border border-line bg-paper p-6 sm:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Retratos por encargo</p>
            <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
              Retratos de mascotas al óleo por encargo
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-muted">
              Consultá por WhatsApp la disponibilidad y las condiciones para encargar un retrato de tu mascota.
            </p>
            <a
              className="mt-7 inline-flex rounded-full border border-foreground px-5 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-foreground hover:text-background focus-visible:outline-offset-4"
              data-analytics-context="pet-portrait-series"
              href={petPortraitInquiryUrl}
              rel="noreferrer"
              target="_blank"
            >
              Consultar disponibilidad por WhatsApp
            </a>
          </div>
        </PageSection>
      ) : null}
      <PageSection className="py-16 lg:py-24">
        <ArtworkGrid artworks={seriesArtworks} getArtworkHref={getCatalogOnlyArtworkHref} />
      </PageSection>
    </>
  );
}
