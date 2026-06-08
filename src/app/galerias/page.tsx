import type { Metadata } from "next";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { GalleryPresenceSection } from "@/components/gallery/GalleryPresenceSection";
import { PageSection } from "@/components/layout/PageSection";
import { pageContent } from "@/content/pages";
import { dossierArtworks } from "@/data/artworks";
import { galleryPresenceImages } from "@/data/galleryPresence";

export const metadata: Metadata = {
  title: pageContent.galleries.metadata.title,
  description: pageContent.galleries.metadata.description,
};

export default function GaleriasPage() {
  return (
    <>
      <GalleryPresenceSection images={galleryPresenceImages} content={pageContent.galleryPresence} />
      <PageSection className="pb-16 pt-12 lg:pb-24 lg:pt-16">
        <GalleryExperience artworks={dossierArtworks} content={pageContent.galleryExperience} />
      </PageSection>
    </>
  );
}
