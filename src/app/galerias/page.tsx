import type { Metadata } from "next";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { PageSection } from "@/components/layout/PageSection";
import { pageContent } from "@/content/pages";
import { dossierArtworks } from "@/data/artworks";

export const metadata: Metadata = {
  title: pageContent.galleries.metadata.title,
  description: pageContent.galleries.metadata.description,
};

export default function GaleriasPage() {
  return (
    <PageSection className="py-16 lg:py-24">
      <GalleryExperience artworks={dossierArtworks} content={pageContent.galleryExperience} />
    </PageSection>
  );
}
