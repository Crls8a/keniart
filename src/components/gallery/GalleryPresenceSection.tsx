import Image from "next/image";

import { ArtworkCarouselControls } from "@/components/artwork/ArtworkCarouselControls";
import { PageSection } from "@/components/layout/PageSection";
import type { GalleryPresenceImage } from "@/data/galleryPresence";

type GalleryPresenceSectionProps = {
  images: GalleryPresenceImage[];
  content: {
    eyebrow: string;
    title: string;
    description: string;
  };
  headingLevel?: "h1" | "h2";
};

function GalleryPresenceCard({ image, priority }: { image: GalleryPresenceImage; priority: boolean }) {
  return (
    <figure className="min-w-full snap-center">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#17120e]">
        <Image
          alt={image.alt}
          className="h-full w-full object-cover"
          fetchPriority={priority ? "high" : "auto"}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          quality={92}
          sizes="(min-width: 1280px) 522px, (min-width: 1024px) 42vw, 100vw"
          src={image.src}
          width={image.width}
        />
      </div>
      <figcaption className="mt-4 text-sm leading-6 text-muted">{image.caption}</figcaption>
    </figure>
  );
}

export function GalleryPresenceSection({ images, content, headingLevel = "h2" }: GalleryPresenceSectionProps) {
  if (!images.length) return null;
  const scrollerId = "gallery-presence-carousel";
  const hasMultipleImages = images.length > 1;
  const Heading = headingLevel;

  return (
    <PageSection className="py-12 lg:py-16">
      <section className="grid min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" aria-labelledby="gallery-presence-title">
        <div className="relative order-2 min-w-0 max-w-full lg:order-1">
          <div id={scrollerId} className="flex w-full max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 motion-safe:scroll-smooth motion-reduce:scroll-auto">
            {images.map((image, index) => (
              <GalleryPresenceCard key={image.id} image={image} priority={index === 0} />
            ))}
          </div>
          {hasMultipleImages ? <ArtworkCarouselControls scrollerId={scrollerId} /> : null}
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">{content.eyebrow}</p>
          <Heading id="gallery-presence-title" className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
            {content.title}
          </Heading>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{content.description}</p>
        </div>
      </section>
    </PageSection>
  );
}
