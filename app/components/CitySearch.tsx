"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "../lib/analytics";

interface City {
  slug: string;
  name: string;
  icon: string;
  region: string;
}

interface IndexEntry {
  n: string; // 表示名（英語優先）
  j?: string; // 日本語名
  u: string; // 遷移先パス
  t: "city" | "spot" | "guide" | "toilet";
}

const TYPE_META: Record<IndexEntry["t"], { icon: string; label: string }> = {
  city: { icon: "🏙️", label: "City" },
  spot: { icon: "📍", label: "Spot" },
  guide: { icon: "📖", label: "Guide" },
  toilet: { icon: "🚽", label: "Toilet" },
};

// 種別ごとの表示上限（都市・スポット・ガイドを優先し、トイレはロングテール扱い）
const TYPE_LIMIT: Record<IndexEntry["t"], number> = { city: 3, spot: 4, guide: 3, toilet: 5 };

function matchScore(entry: IndexEntry, q: string): number {
  const n = entry.n.toLowerCase();
  const j = entry.j?.toLowerCase() ?? "";
  if (n.startsWith(q) || j.startsWith(q)) return 2;
  if (n.includes(q) || j.includes(q)) return 1;
  return 0;
}

export default function CitySearch({ cities }: { cities: City[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<IndexEntry[] | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fetchStarted = useRef(false);

  // 初回フォーカス時にインデックスを一度だけ取得（トップページ初期表示を重くしない）
  const loadIndex = () => {
    if (fetchStarted.current) return;
    fetchStarted.current = true;
    fetch("/api/search-index")
      .then((r) => r.json())
      .then((data: IndexEntry[]) => setIndex(data))
      .catch(() => { fetchStarted.current = false; });
  };

  const q = query.trim().toLowerCase();
  let results: IndexEntry[] = [];
  if (q.length > 0) {
    if (index) {
      const counts: Record<string, number> = { city: 0, spot: 0, guide: 0, toilet: 0 };
      results = index
        .map((e) => ({ e, s: matchScore(e, q) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.e)
        .filter((e) => counts[e.t]++ < TYPE_LIMIT[e.t])
        .slice(0, 12);
    } else {
      // インデックス取得前のフォールバック: 従来どおり都市のみ即時検索
      results = cities
        .filter((c) =>
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q)
        )
        .slice(0, 6)
        .map((c) => ({ n: c.name, u: `/${c.slug}`, t: "city" as const }));
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (entry: IndexEntry) => {
    trackEvent("site_search_select", { query: q, result_type: entry.t, result_url: entry.u });
    setQuery("");
    setOpen(false);
    router.push(entry.u);
  };

  return (
    <div ref={containerRef} className="relative max-w-md mx-auto mt-4">
      <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-200 px-4 py-2.5 gap-2">
        <span className="text-gray-400">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { setOpen(true); loadIndex(); }}
          placeholder="Search city, station, spot, or guide..."
          className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
        />
        {query && (
          <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="text-gray-400 hover:text-gray-600">✕</button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
          {results.map((e) => (
            <button
              key={e.u}
              onClick={() => select(e)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sky-50 transition-colors text-left"
            >
              <span className="text-xl">{TYPE_META[e.t].icon}</span>
              <div className="min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">{e.n}</p>
                <p className="text-xs text-gray-400 truncate">
                  {TYPE_META[e.t].label}
                  {e.j ? ` · ${e.j}` : ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
