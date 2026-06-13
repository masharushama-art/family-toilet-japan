import { Suspense } from "react";
import MapPageClient from "../components/MapPageClient";

export default function MapPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-sky-50">
          <div className="text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-sky-600 font-medium">Loading map...</p>
          </div>
        </div>
      }
    >
      <MapPageClient />
    </Suspense>
  );
}
