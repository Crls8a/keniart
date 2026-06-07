import Link from "next/link";

export function DossierDownload() {
  return (
    <div className="border border-line bg-paper p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">Dossier PDF</p>
      <h2 className="mt-4 text-2xl font-medium">Press kit para galerias</h2>
      <p className="mt-3 leading-7 text-muted">
        Placeholder del MVP: la pagina interactiva esta lista y el PDF final se conectara en
        <span className="font-mono"> public/dossier/dossier-galerias.pdf</span> cuando existan assets definitivos.
      </p>
      <Link
        href="/dossier"
        className="mt-6 inline-flex rounded-full border border-foreground px-5 py-3 text-sm uppercase tracking-[0.22em]"
      >
        Ver dossier web
      </Link>
    </div>
  );
}
