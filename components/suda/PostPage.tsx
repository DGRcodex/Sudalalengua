// components/suda/PostPage.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { Item } from "@/lib/types";

export default function PostPage({
  item,
  month,
  onBack,
}: {
  item: Item;
  month: string;
  onBack: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const p = Math.max(0, Math.min(1, el.scrollTop / (max || 1)));
      setProgress(Math.round(p * 100));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/98 backdrop-blur-sm">
      <div className="sticky top-0 z-50 h-1 bg-neutral-900">
        <div className="h-1 bg-neutral-200 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div ref={ref} className="h-[calc(100vh-4px)] overflow-y-auto">
        <article className="mx-auto max-w-3xl px-4 md:px-0 py-8">
          <div className="mb-6 flex items-center gap-2 text-xs text-neutral-400">
            <button onClick={onBack} className="underline">
              Volver
            </button>
            <span>•</span>
            <span>{month}</span>
            <span>•</span>
            <span>{item.kind}</span>
          </div>

          <header className="mb-6">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-neutral-50">
              {item.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-300">
              <span>
                Por{" "}
                <a href="#" className="underline">
                  Nombre Autora/Autor
                </a>
              </span>
              <span>•</span>
              <time dateTime="2026-01-12">12 de enero de 2026</time>
              <span>•</span>
              <button className="rounded-full border border-neutral-700 px-2 py-0.5 text-xs hover:border-neutral-500">
                Compartir
              </button>
            </div>
          </header>

          <figure className="my-6">
            <div className="aspect-[16/9] w-full rounded-2xl border border-neutral-800 bg-neutral-900" />
            <figcaption className="mt-2 text-xs text-neutral-400">Crédito / Pie de foto opcional</figcaption>
          </figure>

          <section className="prose prose-invert prose-neutral max-w-none">
            <p>
              El viento empuja la tarde contra las ventanas. Deja marcas de sal en los marcos y una luz oblicua que
              cae sobre los libros.
            </p>
            <p>
              No sé si la casa respira o si somos nosotrxs quienes aprendemos a hacerlo con sus grietas. El hervidor
              pita como un tren de juguete.
            </p>
            <blockquote className="not-prose border-l-4 border-neutral-200 pl-4 py-2 my-6 text-lg leading-relaxed text-neutral-100">
              En el límite del patio, el viento se sienta un momento: también merece descanso.
            </blockquote>
            <p>La taza humea. El poema se escribe solo si lo dejo.</p>
            <div className="not-prose my-6 rounded-xl border border-neutral-800 bg-neutral-900 p-4 font-serif leading-relaxed text-neutral-100">
              <p>Una sílaba sostiene la tarde,</p>
              <p>otra se cae y rueda hasta la puerta.</p>
              <p>tres pasos más y el miedo se hace pequeño.</p>
            </div>
            <figure className="not-prose my-8">
              <div className="aspect-[4/3] w-full rounded-xl border border-neutral-800 bg-neutral-900" />
              <figcaption className="mt-2 text-xs text-neutral-400">Mapa mínimo de una memoria.</figcaption>
            </figure>
            <p>Cuando el viento baja, abrimos las ventanas. La casa aprende otra vez a ser casa.</p>
          </section>

          <section className="mt-10 text-sm text-neutral-300">
            <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-900/60">
              <div className="font-medium">Créditos & notas</div>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Edición: Equipo SLL</li>
                <li>Fotografía: Nombre Persona</li>
                <li>Agradecimientos: Archivo Comunitario</li>
              </ul>
            </div>
          </section>

          <section className="mt-6">
            <div className="flex flex-wrap gap-2 text-xs">
              {["crónica", "casa", "viento", "memoria"].map((t) => (
                <span key={t} className="rounded-full border border-neutral-700 px-3 py-1">
                  #{t}
                </span>
              ))}
            </div>
          </section>

          <nav className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
            <button className="rounded-2xl border border-neutral-800 p-4 text-left hover:border-neutral-600">
              <div className="text-xs text-neutral-400">Número anterior</div>
              <div className="font-medium text-neutral-100">Diciembre · La ciudad y el río</div>
            </button>
            <button className="rounded-2xl border border-neutral-800 p-4 text-right hover:border-neutral-600">
              <div className="text-xs text-neutral-400">Número siguiente</div>
              <div className="font-medium text-neutral-100">Febrero · Geografías mínimas</div>
            </button>
          </nav>

          <aside className="mt-12 flex items-center gap-4 border-top border-neutral-800 pt-6">
            <div className="h-12 w-12 rounded-full bg-neutral-900 border border-neutral-800" />
            <div>
              <div className="font-medium text-neutral-100">Nombre Autora/Autor</div>
              <p className="text-sm text-neutral-300">
                Escritora e investigadora. Vive entre Valdivia y Santiago. Publicó "El ruido del agua" (2024).
              </p>
            </div>
          </aside>
        </article>
      </div>
    </div>
  );
}
