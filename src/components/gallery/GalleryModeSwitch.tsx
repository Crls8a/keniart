"use client";

import type { GalleryMode } from "@/types/artwork";

type GalleryModeOption = {
  id: GalleryMode;
  label: string;
  description: string;
};

const galleryModeOptions: GalleryModeOption[] = [
  {
    id: "archive",
    label: "Archivo",
    description: "Recorrido completo por las obras demo del estudio.",
  },
  {
    id: "curated",
    label: "Curaduría",
    description: "Selección editorial preparada para lectura de galería.",
  },
  {
    id: "wall_preview",
    label: "Muro",
    description: "Vista 2D de escala con interiores demo, sin 3D.",
  },
  {
    id: "presentation",
    label: "Presentación",
    description: "Modo secuencial para revisar una pieza por pantalla.",
  },
];

type GalleryModeSwitchProps = {
  activeMode: GalleryMode;
  onModeChange: (mode: GalleryMode) => void;
};

export function GalleryModeSwitch({ activeMode, onModeChange }: GalleryModeSwitchProps) {
  return (
    <fieldset aria-label="Modos de galería" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {galleryModeOptions.map((mode) => {
        const isActive = activeMode === mode.id;

        return (
          <button
            aria-pressed={isActive}
            className={`rounded-3xl border p-5 text-left transition ${
              isActive ? "border-foreground bg-foreground text-background" : "border-line bg-paper hover:border-foreground/50"
            }`}
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            type="button"
          >
            <span className="block text-xs uppercase tracking-[0.28em] opacity-70">Modo</span>
            <span className="mt-3 block font-serif text-2xl tracking-[-0.03em]">{mode.label}</span>
            <span className="mt-3 block text-sm leading-6 opacity-75">{mode.description}</span>
          </button>
        );
      })}
    </fieldset>
  );
}
