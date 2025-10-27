// components/suda/MonthPillar.tsx
export default function MonthPillar({
  side,
  labelTop,
  labelBottom,
  onClick,
  variant = "default",
}: {
  side: "left" | "right";
  labelTop: string;
  labelBottom: string;
  onClick: () => void;
  variant?: "slim" | "default";
}) {
  const isSlim = variant === "slim";
  return (
    <>
      {/* Mobile: horizontal */}
      <button
        onClick={onClick}
        className={`md:hidden w-full rounded-2xl border border-neutral-800/80 px-4 py-3 flex items-center justify-between transition-colors hover:border-neutral-600`}
        aria-label={`${labelTop} ${labelBottom}`}
      >
        <span className="text-[11px] text-neutral-400">{labelTop}</span>
        <span className="font-medium text-sm">{labelBottom}</span>
      </button>

      {/* Desktop: vertical */}
      <button
        onClick={onClick}
        className={`${
          isSlim
            ? "hidden md:flex h-full w-12 md:w-14 rounded-2xl border border-neutral-800/80 p-2 text-center hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600 flex-col justify-between items-center transition-colors"
            : "hidden md:flex w-full min-h-[160px] rounded-2xl border border-neutral-800/80 p-4 text-left hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600 flex-col justify-center transition-colors"
        }`}
        aria-label={`${labelTop} ${labelBottom}`}
      >
        <div className={`${isSlim ? "text-[10px]" : "text-xs"} text-neutral-400`}>{labelTop}</div>
        <div className={`${isSlim ? "mt-1 font-medium text-[13px] leading-tight" : "mt-1 font-medium text-lg"}`}>
          {labelBottom}
        </div>
      </button>
    </>
  );
}
