"use client";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 px-6 text-center">
      <div className="text-6xl mb-4">📴</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">You&apos;re offline</h1>
      <p className="text-gray-600 max-w-sm mb-6">
        No internet connection. Previously viewed toilets are still available on the map.
      </p>
      <button
        onClick={() => window.location.href = "/map"}
        className="bg-sky-500 text-white px-6 py-3 rounded-full font-semibold"
      >
        Open Map
      </button>
    </div>
  );
}
