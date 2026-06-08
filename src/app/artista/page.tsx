import type { Metadata } from "next";
import Image from "next/image";
import { ArtistBio } from "@/components/artist/ArtistBio";
import { PageSection } from "@/components/layout/PageSection";
import { pageContent } from "@/content/pages";
import { artist } from "@/data/artist";

export const metadata: Metadata = {
  title: pageContent.artist.metadata.title,
  description: artist.shortBio,
};

export default function ArtistaPage() {
  return (
    <>
      <ArtistBio artist={artist} content={pageContent.artist.bio} />
      <PageSection className="pb-16">
        <div className="border-y border-line py-10 lg:grid lg:grid-cols-[0.65fr_1.35fr] lg:gap-12 lg:py-14">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">{artist.aboutMedia.eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{artist.aboutMedia.title}</h2>
            <p className="mt-5 leading-7 text-muted">{artist.aboutMedia.description}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-0">
            {artist.aboutMedia.images.map((image) => (
              <figure key={image.id} className="group">
                <div className="relative aspect-[2/3] overflow-hidden bg-[#17120e]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 motion-safe:group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-4 text-sm leading-6 text-muted">{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </PageSection>
      <PageSection className="pb-20">
        <div className="border-t border-line pt-10">
          <h2 className="text-2xl font-medium">{pageContent.artist.cvTitle}</h2>
          <ul className="mt-6 grid gap-4 text-muted">
            {artist.cv.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </PageSection>
    </>
  );
}
