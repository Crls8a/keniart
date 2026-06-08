"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

type MobileNavigationProps = {
  items: readonly NavigationItem[];
  dossierHref: string;
  dossierLabel: string;
  menuLabel: string;
  closeMenuLabel: string;
  navigationLabel: string;
};

export function MobileNavigation({
  items,
  dossierHref,
  dossierLabel,
  menuLabel,
  closeMenuLabel,
  navigationLabel,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    firstLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="relative z-50 rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.22em] text-foreground transition hover:border-foreground focus-visible:outline-offset-4"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? closeMenuLabel : menuLabel}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 top-[65px] z-40 bg-foreground/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <nav
            id={panelId}
            aria-label={navigationLabel}
            className="mx-5 rounded-b-[2rem] border border-line bg-paper p-6 shadow-2xl shadow-foreground/10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-2 text-sm uppercase tracking-[0.24em] text-muted">
              {items.map(({ label, href }, index) => (
                <Link
                  key={href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={href}
                  className="rounded-2xl px-4 py-3 transition hover:bg-background hover:text-foreground focus-visible:text-foreground focus-visible:outline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href={dossierHref}
                className="mt-3 rounded-full border border-foreground px-4 py-3 text-center text-foreground transition hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-offset-4"
                onClick={() => setIsOpen(false)}
              >
                {dossierLabel}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
