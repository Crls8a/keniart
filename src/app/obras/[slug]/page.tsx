import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkDetail } from "@/components/artwork/ArtworkDetail";
import { StructuredData } from "@/components/artwork/StructuredData";
import { pageContent } from "@/content/pages";
import { getCatalogArtworkBySlug, getCatalogArtworks } from "@/data/artworks";
import { routes } from "@/lib/routes";
import { visualArtworkSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCatalogArtworks().map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getCatalogArtworkBySlug(slug);
  if (!artwork) return { title: "Obra no encontrada" };

  return createPageMetadata({
    title: artwork.title,
    description: artwork.description,
    path: routes.obras.detail(artwork.slug),
    image: artwork.images.main,
    imageAlt: artwork.title,
  });
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const artwork = getCatalogArtworkBySlug(slug);
  if (!artwork) notFound();

  return (
    <>
      <StructuredData data={visualArtworkSchema(artwork)} />
      <ArtworkDetail artwork={artwork} content={pageContent.artworkDetail} />
    </>
  );
}
