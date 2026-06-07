import type { ArtworkStatus } from "@/types/artwork";

const labels: Record<ArtworkStatus, string> = {
  available: "Disponible",
  reserved: "Reservada",
  sold: "Vendida",
  not_for_sale: "Archivo",
};

export function AvailabilityBadge({ status }: { status: ArtworkStatus }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-paper/80 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-muted">
      {labels[status]}
    </span>
  );
}
