"use client";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 px-6 text-center">
      <div className="text-6xl mb-4">📴</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">You&apos;re offline</h1>
      <p className="text-gray-600 max-w-sm mb-6">
        No internet connection detected. Cities and map tiles you&apos;ve already browsed are cached and still available.
      </p>
      <button
        onClick={() => window.location.href = "/map"}
        className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold transition-colors mb-4"
      >
        🗺️ Open Cached Map
      </button>
      <p className="text-xs text-gray-400">
        Tip: browse an area while online to save it for offline use
      </p>
    </div>
  );
}
