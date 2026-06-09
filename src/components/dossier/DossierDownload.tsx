import Link from "next/link";
import { routes } from "@/lib/routes";

type DossierDownloadContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  downloadCta: string;
};

export function DossierDownload({ content, showCta = true }: { content: DossierDownloadContent; showCta?: boolean }) {
  return (
    <div className="border border-line bg-paper p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">{content.eyebrow}</p>
      <h2 className="mt-4 text-2xl font-medium">{content.title}</h2>
      <p className="mt-3 leading-7 text-muted">{content.description}</p>
      {showCta ? (
        <Link
          href={routes.dossier}
          className="mt-6 inline-flex rounded-full border border-foreground px-5 py-3 text-sm uppercase tracking-[0.22em]"
        >
          {content.cta}
        </Link>
      ) : (
        <a
          href={routes.dossierPdf}
          download
          className="mt-6 inline-flex rounded-full border border-foreground px-5 py-3 text-sm uppercase tracking-[0.22em]"
        >
          {content.downloadCta}
        </a>
      )}
    </div>
  );
}
