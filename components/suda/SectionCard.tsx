// components/suda/SectionCard.tsx
export default function SectionCard({
  title,
  kicker,
  children,
  step,
  sectionsVisible,
  onNext,
  onHide,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
  step: number;
  sectionsVisible: number;
  onNext?: () => void;
  onHide?: () => void;
}) {
  const isLastVisible = sectionsVisible === step;
  const hasNext = typeof onNext === "function";
  const actionLabel = isLastVisible && hasNext ? "Mostrar siguiente sección" : "Ocultar sección";
  const actionHandler = isLastVisible && hasNext ? onNext : onHide;

  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-neutral-800/80 p-6">
        {kicker && <div className="text-xs text-neutral-400">{kicker}</div>}
        <h3 className="text-2xl font-semibold mt-1 mb-4">{title}</h3>
        <div className="text-sm">{children}</div>
        {actionHandler && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={actionHandler}
              className="rounded-full px-5 py-2 border border-neutral-700 hover:border-neutral-500 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600"
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
