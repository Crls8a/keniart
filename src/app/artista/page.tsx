import type { Metadata } from "next";
import { ArtistBio } from "@/components/artist/ArtistBio";
import { pageContent } from "@/content/pages";
import { artist } from "@/data/artist";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: pageContent.artist.metadata.title,
  description: artist.shortBio,
  path: routes.artist,
  image: artist.aboutMedia.images[0]?.src,
  imageAlt: artist.aboutMedia.images[0]?.alt,
});

export default function ArtistaPage() {
  return <ArtistBio artist={artist} content={pageContent.artist.bio} />;
}
