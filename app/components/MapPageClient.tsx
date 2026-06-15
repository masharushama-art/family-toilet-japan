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
  tokyo:      [35.681, 139.767],
  yokohama:   [35.443, 139.638],
  chiba:      [35.605, 140.123],
  osaka:      [34.693, 135.502],
  kyoto:      [35.011, 135.768],
  nagoya:     [35.170, 136.882],
  fukuoka:    [33.590, 130.401],
  nara:       [34.685, 135.805],
  sapporo:    [43.062, 141.354],
  sendai:     [38.268, 140.869],
  aomori:     [40.824, 140.740],
  iwate:      [39.703, 141.154],
  akita:      [39.718, 140.102],
  yamagata:   [38.240, 140.363],
  fukushima:  [37.750, 140.467],
  saitama:    [35.861, 139.645],
  ibaraki:    [36.341, 140.446],
  tochigi:    [36.566, 139.883],
  gunma:      [36.391, 139.060],
  niigata:    [37.902, 139.023],
  toyama:     [36.695, 137.211],
  kanazawa:   [36.594, 136.625],
  fukui:      [36.065, 136.221],
  yamanashi:  [35.664, 138.568],
  nagano:     [36.651, 138.181],
  shizuoka:   [34.977, 138.383],
  gifu:       [35.423, 136.760],
  mie:        [34.730, 136.508],
  kobe:       [34.690, 135.195],
  shiga:      [35.004, 135.869],
  wakayama:   [34.226, 135.167],
  hiroshima:  [34.385, 132.455],
  okayama:    [34.655, 133.919],
  tottori:    [35.501, 134.237],
  shimane:    [35.472, 133.050],
  yamaguchi:  [34.186, 131.470],
  tokushima:  [34.066, 134.559],
  kagawa:     [34.340, 134.043],
  ehime:      [33.839, 132.765],
  kochi:      [33.559, 133.531],
  saga:       [33.249, 130.299],
  nagasaki:   [32.745, 129.873],
  kumamoto:   [32.803, 130.707],
  oita:       [33.238, 131.612],
  miyazaki:   [31.911, 131.423],
  kagoshima:  [31.560, 130.558],
  okinawa:    [26.212, 127.681],
};

export default function MapPageClient() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") ?? "tokyo";
  const initialToiletId = searchParams.get("id") ?? undefined;
  const initialCenter = CITY_CENTERS[city] ?? CITY_CENTERS.tokyo;
  return <MapView initialCenter={initialCenter} city={city} initialToiletId={initialToiletId} />;
}
