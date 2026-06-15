import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Family Toilet Japan",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-4">🚽</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-500 text-sm mb-8 max-w-xs">
        Sorry, we couldn&apos;t find that page. Try searching for a toilet near you instead.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/map"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          📍 Find Toilets Near Me
        </Link>
        <Link
          href="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
