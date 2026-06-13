"use client";

import type { FilterState } from "../types/toilet";

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClose: () => void;
}

export default function FilterPanel({ filters, onChange, onClose }: Props) {
  const toggle = (key: keyof FilterState) =>
    onChange({ ...filters, [key]: !filters[key] });

  return (
    <div className="absolute top-14 right-4 z-[1001] bg-white rounded-2xl shadow-xl p-4 w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800">Filters</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
      </div>

      {[
        { key: "familyFriendlyOnly" as const, label: "👨‍👩‍👧 Family friendly only", desc: "Excludes bars, pachinko, etc." },
        { key: "changingTableOnly" as const, label: "🍼 Baby changing table" },
        { key: "wheelchairOnly" as const, label: "♿ Wheelchair accessible" },
        { key: "open24hOnly" as const, label: "🕐 Open 24 hours" },
      ].map(({ key, label, desc }) => (
        <label key={key} className="flex items-center justify-between py-2 border-b border-gray-100 cursor-pointer">
          <div>
            <span className="text-sm text-gray-700">{label}</span>
            {desc && <p className="text-xs text-gray-400">{desc}</p>}
          </div>
          <div
            onClick={() => toggle(key)}
            className={`w-10 h-6 rounded-full transition-colors ${
              filters[key] ? "bg-sky-500" : "bg-gray-200"
            } relative`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                filters[key] ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>
        </label>
      ))}
    </div>
  );
}
