import type { Metadata } from "next";
import { StructuredData } from "@/components/artwork/StructuredData";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { PageSection } from "@/components/layout/PageSection";
import { pageContent } from "@/content/pages";
import { artworks } from "@/data/artworks";
import { collectionSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: pageContent.artworks.metadata.title,
  description: pageContent.artworks.metadata.description,
};

export default function ObrasPage() {
  return (
    <PageSection className="py-16 lg:py-24">
      <StructuredData data={collectionSchema(pageContent.artworks.collectionSchemaName, artworks)} />
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{pageContent.artworks.header.eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{pageContent.artworks.header.title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted">{pageContent.artworks.header.description}</p>
      </div>
      <GalleryExperience artworks={artworks} content={pageContent.galleryExperience} />
    </PageSection>
  );
}
