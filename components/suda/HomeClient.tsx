// components/suda/HomeClient.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Item, MonthState } from "@/lib/types";
import { MOCK_ITEMS } from "@/lib/mock";
import Tile from "./Tile";
import MonthPillar from "./MonthPillar";
import SectionCard from "./SectionCard";
import Overlay from "./Overlay";
import PostPage from "./PostPage";

export default function HomeClient() {
  const [month, setMonth] = useState<MonthState>({ label: "Enero 2026", index: 0 });
  const [items] = useState<Item[]>(MOCK_ITEMS);
  const [activeId, setActiveId] = useState<string>(MOCK_ITEMS[0].id);
  const [openId, setOpenId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [view, setView] = useState<"home" | "post">("home");
  const [postId, setPostId] = useState<string | null>(null);
  const [sectionsVisible, setSectionsVisible] = useState<number>(0);
  const sectionsRootRef = useRef<HTMLDivElement>(null);

  const active = useMemo(() => items.find((i) => i.id === activeId)!, [items, activeId]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (openId || paused || prefersReducedMotion) return;
    const t = setInterval(() => {
      setActiveId((prev) => {
        const idx = items.findIndex((i) => i.id === prev);
        const next = items[(idx + 1) % items.length];
        return next.id;
      });
    }, 2000);
    return () => clearInterval(t);
  }, [openId, paused, items]);

  function goPrevMonth() {
    setMonth({ label: "Diciembre 2025", index: month.index - 1 });
  }
  function goNextMonth() {
    setMonth({ label: "Febrero 2026", index: month.index + 1 });
  }
  function openOverlay(id: string) {
    setOpenId(id);
  }
  function closeOverlay() {
    setOpenId(null);
  }
  function openPost(id: string) {
    setPostId(id);
    setView("post");
  }
  function backToHome() {
    setView("home");
    setPostId(null);
  }

  function revealFirstSection() {
    if (sectionsVisible < 1) setSectionsVisible(1);
    setTimeout(() => {
      sectionsRootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }
  function revealNextSection() {
    setSectionsVisible((n) => Math.min(5, n + 1));
    setTimeout(() => {
      sectionsRootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <h1 className="text-xl tracking-wider font-medium">SUDA LA LENGUA</h1>
            <span className="text-sm text-neutral-400">Magazine mensual</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-neutral-300">
            {["Cuerpos", "Palabra", "Amigos", "Aparecemos", "YouTube"].map((l) => (
              <a
                key={l}
                href="#"
                className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 rounded px-1"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main layout */}
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-14 md:grid-rows-[auto_auto] gap-6">
        <aside className="md:col-span-2 md:row-span-2 flex items-stretch justify-end md:-mr-2">
          <MonthPillar
            variant="slim"
            side="left"
            labelTop="Número anterior"
            labelBottom="Diciembre"
            onClick={goPrevMonth}
          />
        </aside>

        <aside className="md:col-span-2 md:row-span-2 flex flex-col gap-4">
          {["arte", "poesia", "musica", "archivo"].map((id) => (
            <Tile
              key={id}
              item={items.find((i) => i.id === id)!}
              onClick={() => openPost(id)}
              extraClass={id === "archivo" ? "h-[220px]" : ""}
            />
          ))}
        </aside>

        <section className="md:col-span-8 md:row-span-2 relative">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest text-neutral-400">{month.label}</h2>
            <span className="text-sm text-neutral-400">Portada</span>
          </div>

          <button
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onClick={() => openPost(active.id)}
            className="group relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-neutral-800/80 hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors"
            aria-label={`Abrir ${active.title}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.03),transparent_45%)] bg-neutral-900" />
            <div className="absolute inset-0 grid place-items-center text-center px-6">
              <span className="rounded-full px-4 py-2 text-xs border border-neutral-700/70 bg-neutral-900/60 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
                {active.kind}
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold opacity-95">{active.title}</h3>
            </div>
          </button>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tile item={items.find((i) => i.id === "suplemento")!} onClick={() => openPost("suplemento")} />
            {["opinion", "cine", "entrevista"].map((id) => (
              <Tile key={id} item={items.find((i) => i.id === id)!} onClick={() => openPost(id)} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={revealFirstSection}
              className="rounded-full px-5 py-3 border border-neutral-700 hover:border-neutral-500 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600"
              aria-label="Mostrar secciones: archivos, videos, podcasts, proyectos y donar"
            >
              Archivos, podcasts, videos, proyectos, donar
            </button>
          </div>
        </section>

        <aside className="md:col-span-2 md:row-span-2 flex items-stretch justify-start md:-ml-2">
          <MonthPillar
            variant="slim"
            side="right"
            labelTop="Número siguiente"
            labelBottom="Febrero"
            onClick={goNextMonth}
          />
        </aside>
      </main>

      {/* Secciones secundarias */}
      <div ref={sectionsRootRef} className="mx-auto max-w-6xl px-4 md:px-6 pb-12">
        {sectionsVisible >= 1 && (
          <SectionCard
            title="Quiénes somos"
            kicker="Sobre el proyecto"
            step={1}
            sectionsVisible={sectionsVisible}
            onNext={revealNextSection}
            onHide={() => setSectionsVisible(0)}
          >
            <p className="text-neutral-300 text-sm leading-relaxed">
              Suda La Lengua es una revista independiente que cruza literatura, arte y pensamiento latinoamericano.
              Creemos en las voces que se arriesgan y en la edición como gesto político.
            </p>
          </SectionCard>
        )}

        {sectionsVisible >= 2 && (
          <SectionCard
            title="Dona al proyecto"
            kicker="Sostenibilidad"
            step={2}
            sectionsVisible={sectionsVisible}
            onNext={revealNextSection}
            onHide={() => setSectionsVisible(1)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-xs text-neutral-400">Aporte único</div>
                <div className="mt-1 font-medium">Transferencia / PayPal</div>
              </div>
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-xs text-neutral-400">Suscripción</div>
                <div className="mt-1 font-medium">Mensual (CLP)</div>
              </div>
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-xs text-neutral-400">Aliados</div>
                <div className="mt-1 font-medium">Instituciones & residencias</div>
              </div>
            </div>
          </SectionCard>
        )}

        {sectionsVisible >= 3 && (
          <SectionCard
            title="Archivo"
            kicker="Números y dossiers"
            step={3}
            sectionsVisible={sectionsVisible}
            onNext={revealNextSection}
            onHide={() => setSectionsVisible(2)}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Dic 2025", "Nov 2025", "Oct 2025", "Sep 2025"].map((m) => (
                <div
                  key={m}
                  className="aspect-[4/3] rounded-xl border border-neutral-800 grid place-items-center text-sm text-neutral-300"
                >
                  {m}
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {sectionsVisible >= 4 && (
          <SectionCard
            title="Videos & Podcasts"
            kicker="Sesiones y conversaciones"
            step={4}
            sectionsVisible={sectionsVisible}
            onNext={revealNextSection}
            onHide={() => setSectionsVisible(3)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-xs text-neutral-400">Video</div>
                <div className="mt-1 font-medium">Sesión en vivo: Poética del ruido</div>
              </div>
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-xs text-neutral-400">Podcast</div>
                <div className="mt-1 font-medium">Entrevista: Cuerpo, territorio y memoria</div>
              </div>
            </div>
          </SectionCard>
        )}

        {sectionsVisible >= 5 && (
          <SectionCard title="Proyectos & Amigos" kicker="Red y colaboraciones" step={5} sectionsVisible={sectionsVisible} onHide={() => setSectionsVisible(4)}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Residencia Andina", "Archivo Sonoro", "Mapa de Cuerpos"].map((p) => (
                <div key={p} className="rounded-xl border border-neutral-800 p-4">
                  <div className="text-xs text-neutral-400">Proyecto</div>
                  <div className="mt-1 font-medium">{p}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>

      {view === "post" && postId && (
        <PostPage item={items.find((i) => i.id === postId)!} month={month.label} onBack={backToHome} />
      )}

      <footer className="border-t border-neutral-800/80">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-neutral-400">
          © 2025 Suda La Lengua — Wireframe
        </div>
      </footer>

      {openId && (
        <Overlay onClose={closeOverlay} month={month.label} title={items.find((i) => i.id === openId)?.title ?? ""} />
      )}
    </div>
  );
}
