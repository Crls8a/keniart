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
};

function GalleryPresenceCard({ image, priority }: { image: GalleryPresenceImage; priority: boolean }) {
  return (
    <figure className="group min-w-full snap-center overflow-hidden rounded-[1.75rem] border border-line bg-paper">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#17120e] sm:aspect-[16/10] lg:aspect-[16/9]">
        <Image
          alt={image.alt}
          className="h-full w-full object-cover transition duration-700 motion-safe:group-hover:scale-[1.025]"
          height={image.height}
          priority={priority}
          quality={92}
          sizes="(min-width: 1280px) 1120px, (min-width: 1024px) calc(100vw - 8rem), calc(100vw - 2rem)"
          src={image.src}
          width={image.width}
        />
      </div>
      <figcaption className="px-5 py-4 text-sm text-muted">{image.caption}</figcaption>
    </figure>
  );
}

export function GalleryPresenceSection({ images, content }: GalleryPresenceSectionProps) {
  if (!images.length) return null;
  const scrollerId = "gallery-presence-carousel";
  const hasMultipleImages = images.length > 1;

  return (
    <PageSection className="py-16 lg:py-24">
      <section className="space-y-8" aria-labelledby="gallery-presence-title">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">{content.eyebrow}</p>
            <h2 id="gallery-presence-title" className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              {content.title}
            </h2>
          </div>
          <p className="max-w-2xl text-muted lg:justify-self-end">{content.description}</p>
        </div>

        <div className="relative">
          <div id={scrollerId} className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2">
          {images.map((image, index) => (
            <GalleryPresenceCard key={image.id} image={image} priority={index < 2} />
          ))}
          </div>
          {hasMultipleImages ? <ArtworkCarouselControls scrollerId={scrollerId} /> : null}
        </div>
      </section>
    </PageSection>
  );
}
