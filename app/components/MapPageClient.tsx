"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

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

const CITY_CENTERS: Record<string, [number, number]> = {
  tokyo: [35.681, 139.767],
  osaka: [34.693, 135.502],
  kyoto: [35.011, 135.768],
  nagoya: [35.170, 136.882],
  yokohama: [35.443, 139.638],
  fukuoka: [33.590, 130.401],
  nara: [34.685, 135.805],
};

export default function MapPageClient() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") ?? "tokyo";
  const initialCenter = CITY_CENTERS[city] ?? CITY_CENTERS.tokyo;
  return <MapView initialCenter={initialCenter} />;
}
