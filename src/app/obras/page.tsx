import type { Metadata } from "next";
import { StructuredData } from "@/components/artwork/StructuredData";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { PageSection } from "@/components/layout/PageSection";
import { pageContent } from "@/content/pages";
import { featuredArtwork, getCatalogArtworks } from "@/data/artworks";
import { routes } from "@/lib/routes";
import { collectionPageSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: pageContent.artworks.metadata.title,
  description: pageContent.artworks.metadata.description,
  path: routes.obras.index,
  image: featuredArtwork.images.main,
  imageAlt: featuredArtwork.title,
});

export default function ObrasPage() {
  const catalogArtworks = getCatalogArtworks();

  return (
    <PageSection className="py-16 lg:py-24">
      <StructuredData
        data={collectionPageSchema({
          name: pageContent.artworks.collectionSchemaName,
          description: pageContent.artworks.metadata.description,
          path: routes.obras.index,
          artworks: catalogArtworks,
        })}
      />
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{pageContent.artworks.header.eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{pageContent.artworks.header.title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted">{pageContent.artworks.header.description}</p>
      </div>
      <GalleryExperience artworks={catalogArtworks} content={pageContent.galleryExperience} />
    </PageSection>
  );
}
