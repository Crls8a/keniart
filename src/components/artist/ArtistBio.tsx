import Image from "next/image";
import { ArtworkCarouselControls } from "@/components/artwork/ArtworkCarouselControls";
import { PageSection } from "@/components/layout/PageSection";

type ArtistBioProps = {
  artist: {
    name: string;
    statement: string;
    shortBio: string;
    extendedBio: string;
    aboutMedia: {
      images: {
        id: string;
        src: string;
        alt: string;
        caption: string;
        width: number;
        height: number;
      }[];
    };
  };
  content: {
    eyebrow: string;
  };
};

export function ArtistBio({ artist, content }: ArtistBioProps) {
  const scrollerId = "artist-about-media";
  const hasMultipleImages = artist.aboutMedia.images.length > 1;

  return (
    <PageSection className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
      <div className="relative order-2 lg:order-1">
        <div id={scrollerId} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2">
          {artist.aboutMedia.images.map((image) => (
            <figure key={image.id} className="min-w-full snap-center">
              <div className="relative aspect-[2/3] overflow-hidden bg-[#17120e]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  priority={image.id === artist.aboutMedia.images[0]?.id}
                />
              </div>
              <figcaption className="mt-4 text-sm leading-6 text-muted">{image.caption}</figcaption>
            </figure>
          ))}
        </div>
        {hasMultipleImages ? <ArtworkCarouselControls scrollerId={scrollerId} /> : null}
      </div>

      <div className="order-1 lg:order-2">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{content.eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{artist.name}</h1>
        <div className="mt-8 space-y-7 text-lg leading-8 text-muted">
          <p className="text-2xl leading-10 text-foreground">{artist.statement}</p>
          <p>{artist.shortBio}</p>
          <p>{artist.extendedBio}</p>
        </div>
      </div>
    </PageSection>
  );
}
