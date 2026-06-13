import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-sky-50">
      <main className="flex flex-col items-center gap-8 px-6 text-center">
        <div className="text-6xl">🚽</div>
        <h1 className="text-3xl font-bold text-sky-700">Family Toilet Japan</h1>
        <p className="text-lg text-gray-600 max-w-sm">
          Find family-friendly toilets with baby changing tables in Japan
        </p>
        <Link
          href="/map"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors"
        >
          Find Near Me 📍
        </Link>
        <p className="text-sm text-gray-400">
          Free · No registration required · Works offline
        </p>
      </main>
    </div>
  );
}
