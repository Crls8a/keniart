import Image from "next/image";
import type { ArtworkSeries } from "@/types/artwork";

type SeriesHeroProps = {
  item: ArtworkSeries;
  eyebrow?: string;
  action?: {
    href: string;
    label: string;
    analyticsContext: string;
    supportingText: string;
  };
};

export function SeriesHero({ item, eyebrow, action }: SeriesHeroProps) {
  return (
    <section className="grid min-h-[70vh] lg:grid-cols-2">
      <div className="flex items-center px-5 py-16 sm:px-8 lg:px-16">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">{eyebrow ?? item.years}</p>
          <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{item.title}</h1>
          <p className="mt-5 text-xl text-muted">{item.subtitle}</p>
          <p className="mt-8 text-lg leading-8 text-muted">{item.description}</p>
          {action ? (
            <div className="mt-8">
              <a
                className="inline-flex rounded-full bg-foreground px-6 py-3 text-center text-sm uppercase tracking-[0.18em] text-background transition hover:opacity-85 focus-visible:outline-offset-4"
                data-analytics-context={action.analyticsContext}
                href={action.href}
                rel="noreferrer"
                target="_blank"
              >
                {action.label}
              </a>
              <p className="mt-3 text-sm leading-6 text-muted">{action.supportingText}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="relative min-h-[50vh] bg-[#17120e]">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          priority={!action}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-5"
        />
      </div>
    </section>
  );
}
