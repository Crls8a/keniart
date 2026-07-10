"use client";

type ArtworkCarouselControlsProps = {
  scrollerId: string;
};

export function ArtworkCarouselControls({ scrollerId }: ArtworkCarouselControlsProps) {
  function scrollByImage(direction: -1 | 1) {
    const scroller = document.getElementById(scrollerId);
    if (!scroller) return;

    const slides = Array.from(scroller.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
    if (!slides.length) return;

    const currentIndex = slides.reduce((closestIndex, slide, index) => {
      const closestDistance = Math.abs(slides[closestIndex].offsetLeft - scroller.scrollLeft);
      const slideDistance = Math.abs(slide.offsetLeft - scroller.scrollLeft);

      return slideDistance < closestDistance ? index : closestIndex;
    }, 0);
    const nextIndex = Math.max(0, Math.min(slides.length - 1, currentIndex + direction));

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({ behavior: prefersReducedMotion ? "auto" : "smooth", left: slides[nextIndex].offsetLeft });
  }

  return (
    <div className="pointer-events-none absolute inset-x-3 top-1/2 z-20 flex -translate-y-1/2 justify-between gap-3 sm:inset-x-5">
      <button
        type="button"
        onClick={() => scrollByImage(-1)}
        aria-label="Ver imagen anterior"
        className="pointer-events-auto grid size-12 touch-manipulation place-items-center rounded-full border border-line bg-paper/95 text-2xl shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur transition hover:bg-paper focus-visible:outline-offset-4 sm:size-14"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => scrollByImage(1)}
        aria-label="Ver imagen siguiente"
        className="pointer-events-auto grid size-12 touch-manipulation place-items-center rounded-full border border-line bg-paper/95 text-2xl shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur transition hover:bg-paper focus-visible:outline-offset-4 sm:size-14"
      >
        ›
      </button>
    </div>
  );
}
