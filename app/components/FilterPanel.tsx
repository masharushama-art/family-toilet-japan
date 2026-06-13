"use client";

import type { FilterState } from "../types/toilet";
import { useI18n } from "../i18n/provider";

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClose: () => void;
}

export default function FilterPanel({ filters, onChange, onClose }: Props) {
  const { t } = useI18n();
  const toggle = (key: keyof FilterState) =>
    onChange({ ...filters, [key]: !filters[key] });

  const items = [
    { key: "familyFriendlyOnly" as const, label: `👨‍👩‍👧 ${t("familyFriendlyOnly")}`, desc: "Excludes bars, pachinko, etc." },
    { key: "changingTableOnly" as const, label: `🍼 ${t("changingTable")}` },
    { key: "wheelchairOnly" as const, label: `♿ ${t("wheelchair")}` },
    { key: "open24hOnly" as const, label: `🕐 ${t("open24h")}` },
  ];

  return (
    <div className="absolute top-14 right-4 z-[1001] bg-white rounded-2xl shadow-xl p-4 w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800">{t("filters")}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
      </div>

      {items.map(({ key, label, desc }) => (
        <label key={key} className="flex items-center justify-between py-2 border-b border-gray-100 cursor-pointer">
          <div>
            <span className="text-sm text-gray-700">{label}</span>
            {desc && <p className="text-xs text-gray-400">{desc}</p>}
          </div>
          <div
            onClick={() => toggle(key)}
            className={`w-10 h-6 rounded-full transition-colors flex-shrink-0 ml-2 ${
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
