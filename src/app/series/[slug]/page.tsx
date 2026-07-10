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

const petPortraitLanding = {
  metadataTitle: "Pinturas personalizadas de perritos al óleo",
  metadataDescription:
    "Pinturas personalizadas de perritos y otras mascotas al óleo sobre lienzo. Conocé ejemplos reales y consultá por WhatsApp las condiciones de tu encargo.",
  eyebrow: "Retratos de mascotas por encargo",
  title: "Pinturas personalizadas de perritos",
  subtitle: "Un retrato al óleo inspirado en la mirada de tu mascota",
  description:
    "Conocé retratos realizados por Keniart y contanos cómo te gustaría recordar la personalidad de tu mascota en una obra pintada sobre lienzo.",
  actionLabel: "Consultar mi retrato por WhatsApp",
  actionSupportingText: "Disponibilidad y condiciones se confirman directamente por WhatsApp.",
} as const;

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
  const isPetPortraitLanding = item.slug === PINTO_TU_MASCOTA_SERIES_SLUG;

  return createPageMetadata({
    title: isPetPortraitLanding ? petPortraitLanding.metadataTitle : item.title,
    description: isPetPortraitLanding ? petPortraitLanding.metadataDescription : item.description,
    path: routes.series.detail(item.slug),
    image: item.coverImage,
    imageAlt: item.title,
    openGraphTitle: isPetPortraitLanding ? petPortraitLanding.metadataTitle : undefined,
  });
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getSeriesBySlug(slug);
  if (!item) notFound();
  const seriesArtworks = getSeriesArtworks(item.slug);
  const isPetPortraitLanding = item.slug === PINTO_TU_MASCOTA_SERIES_SLUG;
  const seriesItem = {
    ...item,
    years: getSeriesYearLabel(item.slug) ?? item.years,
    ...(isPetPortraitLanding
      ? {
          title: petPortraitLanding.title,
          subtitle: petPortraitLanding.subtitle,
          description: petPortraitLanding.description,
        }
      : {}),
  };

  return (
    <>
      <StructuredData data={seriesPageSchema(seriesItem, seriesArtworks)} />
      <SeriesHero
        item={seriesItem}
        eyebrow={isPetPortraitLanding ? petPortraitLanding.eyebrow : undefined}
        action={
          isPetPortraitLanding
            ? {
                href: petPortraitInquiryUrl,
                label: petPortraitLanding.actionLabel,
                analyticsContext: "pet-portrait-hero",
                supportingText: petPortraitLanding.actionSupportingText,
              }
            : undefined
        }
      />
      {isPetPortraitLanding ? (
        <PageSection className="py-14 lg:py-20">
          <div className="max-w-3xl border border-line bg-paper p-6 sm:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Retratos por encargo</p>
            <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
              Pinturas personalizadas de perritos y otras mascotas
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-muted">
              Si querés una pintura personalizada de tu perrito, compartinos tu idea y consultá por WhatsApp la
              disponibilidad y las condiciones del encargo.
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
