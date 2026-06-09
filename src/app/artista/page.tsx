import type { Metadata } from "next";
import { ArtistBio } from "@/components/artist/ArtistBio";
import { pageContent } from "@/content/pages";
import { artist } from "@/data/artist";

export const metadata: Metadata = {
  title: pageContent.artist.metadata.title,
  description: artist.shortBio,
};

export default function ArtistaPage() {
  return <ArtistBio artist={artist} content={pageContent.artist.bio} />;
}
