import type { Metadata } from "next";
import { GalleryPresenceSection } from "@/components/gallery/GalleryPresenceSection";
import { pageContent } from "@/content/pages";
import { galleryPresenceImages } from "@/data/galleryPresence";

export const metadata: Metadata = {
  title: pageContent.galleries.metadata.title,
  description: pageContent.galleries.metadata.description,
};

export default function GaleriasPage() {
  return <GalleryPresenceSection images={galleryPresenceImages} content={pageContent.galleryPresence} />;
}
