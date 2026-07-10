import type { Metadata } from "next";
import { GalleryPresenceSection } from "@/components/gallery/GalleryPresenceSection";
import { pageContent } from "@/content/pages";
import { galleryPresenceImages } from "@/data/galleryPresence";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: pageContent.galleries.metadata.title,
  description: pageContent.galleries.metadata.description,
  path: routes.galleries,
  image: galleryPresenceImages[0]?.src,
  imageAlt: galleryPresenceImages[0]?.alt,
});

export default function GaleriasPage() {
  return <GalleryPresenceSection images={galleryPresenceImages} content={pageContent.galleryPresence} headingLevel="h1" />;
}
