import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkDetail } from "@/components/artwork/ArtworkDetail";
import { StructuredData } from "@/components/artwork/StructuredData";
import { pageContent } from "@/content/pages";
import { artworks, getArtworkBySlug } from "@/data/artworks";
import { visualArtworkSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return { title: "Obra no encontrada" };

  return {
    title: artwork.title,
    description: artwork.description,
    openGraph: {
      title: artwork.title,
      description: artwork.description,
      images: [artwork.images.main],
    },
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  return (
    <>
      <StructuredData data={visualArtworkSchema(artwork)} />
      <ArtworkDetail artwork={artwork} content={pageContent.artworkDetail} />
    </>
  );
}
