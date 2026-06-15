"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface City {
  slug: string;
  name: string;
  icon: string;
  region: string;
}

export default function CitySearch({ cities }: { cities: City[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length === 0 ? [] : cities.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.slug.toLowerCase().includes(query.toLowerCase()) ||
    c.region.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (slug: string) => {
    setQuery("");
    setOpen(false);
    router.push(`/${slug}`);
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
          onFocus={() => setOpen(true)}
          placeholder="Search city or region..."
          className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
        />
        {query && (
          <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="text-gray-400 hover:text-gray-600">✕</button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {results.map((c) => (
            <button
              key={c.slug}
              onClick={() => select(c.slug)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sky-50 transition-colors text-left"
            >
              <span className="text-xl">{c.icon}</span>
              <div>
                <p className="font-medium text-gray-800 text-sm">{c.name}</p>
                <p className="text-xs text-gray-400">{c.region}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
