"use client";

import type { Toilet } from "../types/toilet";

interface Props {
  toilet: Toilet;
  onClose: () => void;
}

function Badge({ value }: { value: boolean | undefined }) {
  if (value === true) return <span className="text-green-600 font-medium">✓ Yes</span>;
  if (value === false) return <span className="text-gray-400">No</span>;
  return <span className="text-gray-400">Unknown</span>;
}

export default function ToiletDetail({ toilet, onClose }: Props) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${toilet.lat},${toilet.lon}&travelmode=walking`;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-2xl shadow-2xl p-5 max-h-[60vh] overflow-y-auto">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="font-bold text-gray-900 text-base">
            {toilet.name || "Public Toilet"}
          </h2>
          {toilet.operator && (
            <p className="text-xs text-gray-500 mt-0.5">{toilet.operator}</p>
          )}
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl ml-2">✕</button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between py-1.5 border-b border-gray-100">
          <span className="text-gray-500">🍼 Baby changing table</span>
          <Badge value={toilet.changingTable} />
        </div>
        <div className="flex justify-between py-1.5 border-b border-gray-100">
          <span className="text-gray-500">♿ Wheelchair</span>
          <Badge value={toilet.wheelchair} />
        </div>
        <div className="flex justify-between py-1.5 border-b border-gray-100">
          <span className="text-gray-500">💴 Fee</span>
          <span className={toilet.fee ? "text-orange-500" : "text-green-600 font-medium"}>
            {toilet.fee ? "Paid" : "Free"}
          </span>
        </div>
        {toilet.openingHours && (
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">🕐 Hours</span>
            <span className="text-gray-700 text-right max-w-[160px]">{toilet.openingHours}</span>
          </div>
        )}
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition-colors w-full"
      >
        🗺️ Open in Google Maps
      </a>
    </div>
  );
}
