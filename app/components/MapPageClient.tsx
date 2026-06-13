"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-sky-50">
      <div className="text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <p className="text-sky-600 font-medium">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPageClient() {
  return <MapView />;
}
