import Image from "next/image";

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
    <figure className="group overflow-hidden rounded-[1.75rem] border border-line bg-paper">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#17120e]">
        <Image
          alt={image.alt}
          className="h-full w-full object-cover transition duration-700 motion-safe:group-hover:scale-[1.025]"
          height={image.height}
          priority={priority}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <GalleryPresenceCard key={image.id} image={image} priority={index < 2} />
          ))}
        </div>
      </section>
    </PageSection>
  );
}
