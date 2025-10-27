// components/suda/Tile.tsx
import type { Item } from "@/lib/types";

export default function Tile({
  item,
  onClick,
  extraClass = "",
}: {
  item: Item;
  onClick: () => void;
  extraClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800/80 hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors ${extraClass}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.04),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.03),transparent_55%)] bg-neutral-900" />
      <div className="absolute inset-0 p-4 flex flex-col justify-between text-left">
        <span className="self-start rounded-full px-3 py-1 text-[10px] border border-neutral-700/70 bg-neutral-900/60 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
          {item.kind}
        </span>
        <h4 className="text-sm font-medium pr-2 line-clamp-2">{item.title}</h4>
      </div>
    </button>
  );
}
