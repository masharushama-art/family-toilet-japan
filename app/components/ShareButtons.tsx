"use client";

interface Props {
  url: string;
  text: string;
}

export default function ShareButtons({ url, text }: Props) {
  const encoded = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: text, url });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 mr-1">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
      >
        𝕏
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#06C755] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#05a849] transition-colors"
      >
        LINE
      </a>
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={share}
          className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
        >
          ↗ More
        </button>
      )}
    </div>
  );
}
