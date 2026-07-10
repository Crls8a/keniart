import Image from "next/image";
import type { ArtworkSeries } from "@/types/artwork";

type SeriesHeroProps = {
  item: ArtworkSeries;
};

export function SeriesHero({ item }: SeriesHeroProps) {
  return (
    <section className="grid min-h-[70vh] lg:grid-cols-2">
      <div className="flex items-center px-5 py-16 sm:px-8 lg:px-16">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">{item.years}</p>
          <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{item.title}</h1>
          <p className="mt-5 text-xl text-muted">{item.subtitle}</p>
          <p className="mt-8 text-lg leading-8 text-muted">{item.description}</p>
        </div>
      </div>
      <div className="relative min-h-[50vh] bg-[#17120e]">
        <Image src={item.coverImage} alt={item.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-5" />
      </div>
    </section>
  );
}
