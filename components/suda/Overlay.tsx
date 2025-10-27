// components/suda/Overlay.tsx
"use client";

import { useEffect, useRef } from "react";

export default function Overlay({
  onClose,
  month,
  title,
}: {
  onClose: () => void;
  month: string;
  title: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl rounded-2xl border border-neutral-700 bg-neutral-950 p-6 shadow-2xl">
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md border border-neutral-700 px-2 py-1 text-xs hover:border-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600"
          aria-label="Cerrar"
        >
          Cerrar
        </button>
        <div className="mb-2 text-xs text-neutral-400">Suda La Lengua · {month}</div>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <div className="h-48 rounded-xl border border-neutral-800 bg-neutral-900 mb-4" />
        <p className="text-neutral-300 text-sm leading-relaxed">
          Contenido de ejemplo para el wireframe. Aquí irá el cuento, crónica, entrevista u otro formato publicado
          en el mes.
        </p>
      </div>
    </div>
  );
}
