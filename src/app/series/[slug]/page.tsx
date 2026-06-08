import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { ArtworkMediaFrame } from "@/components/artwork/ArtworkMediaFrame";
import { ResponsiveArtworkImage } from "@/components/artwork/ResponsiveArtworkImage";
import { PageSection } from "@/components/layout/PageSection";
import { SeriesHero } from "@/components/series/SeriesHero";
import { pageContent } from "@/content/pages";
import { cartografiasPresentationImages, getArtworksBySeries } from "@/data/artworks";
import { CARTOGRAFIAS_DEL_ALMA_SERIES_SLUG, getSeriesBySlug, series } from "@/data/series";

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
  const showPresentationSection = item.slug === CARTOGRAFIAS_DEL_ALMA_SERIES_SLUG;

  return (
    <>
      <SeriesHero item={item} />
      <PageSection className="py-16 lg:py-24">
        <ArtworkGrid artworks={seriesArtworks} />
      </PageSection>
      {showPresentationSection ? <GalleryPresentationSection /> : null}
    </>
  );
}

function GalleryPresentationSection() {
  return (
    <PageSection className="border-t border-line py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Registro</p>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">Presentación en galería</h2>
          <p className="mt-5 max-w-xl text-muted">
            Una pausa documental para mirar la escala, el montaje y la conversación de las obras con el espacio.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cartografiasPresentationImages.map((image, index) => (
            <ArtworkMediaFrame key={image.src} image={image} size="card">
              <ResponsiveArtworkImage image={image} alt={`Presentación en galería, imagen ${index + 1}.`} className="object-contain" />
            </ArtworkMediaFrame>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
