"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "../lib/analytics";

type VoteType = "clean" | "ok" | "dirty";

const LABELS: Record<VoteType, { emoji: string; en: string }> = {
  clean: { emoji: "✨", en: "Clean" },
  ok: { emoji: "👍", en: "OK" },
  dirty: { emoji: "🚫", en: "Dirty" },
};

const VOTED_KEY_PREFIX = "ftj_voted_";

/** トイレの清潔度ワンタップ投票ウィジェット。Upstash未設定の環境では自動的に何も表示しない。 */
export default function CleanlinessVote({ toiletId }: { toiletId: string }) {
  const [enabled, setEnabled] = useState<boolean | null>(null); // null=判定中
  const [counts, setCounts] = useState<Record<VoteType, number>>({ clean: 0, ok: 0, dirty: 0 });
  const [myVote, setMyVote] = useState<VoteType | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/vote?toiletId=${encodeURIComponent(toiletId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.enabled) {
          setEnabled(false);
          return;
        }
        setEnabled(true);
        setCounts({ clean: data.clean, ok: data.ok, dirty: data.dirty });
      })
      .catch(() => setEnabled(false));

    try {
      const stored = localStorage.getItem(VOTED_KEY_PREFIX + toiletId);
      if (stored) setMyVote(stored as VoteType);
    } catch { /* ignore */ }

    return () => { cancelled = true; };
  }, [toiletId]);

  if (enabled === null || enabled === false) return null;

  const handleVote = async (vote: VoteType) => {
    if (myVote || submitting) return; // 1端末1回まで
    setSubmitting(true);
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toiletId, vote }),
      });
      const data = await res.json();
      if (data.enabled) {
        setCounts({ clean: data.clean, ok: data.ok, dirty: data.dirty });
        setMyVote(vote);
        try { localStorage.setItem(VOTED_KEY_PREFIX + toiletId, vote); } catch { /* ignore */ }
        trackEvent("cleanliness_vote", { toilet_id: toiletId, vote });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const total = counts.clean + counts.ok + counts.dirty;

  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 my-4">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {myVote ? "Thanks for your feedback!" : "How clean was this toilet?"}
      </p>
      <div className="flex gap-2">
        {(Object.keys(LABELS) as VoteType[]).map((v) => (
          <button
            key={v}
            onClick={() => handleVote(v)}
            disabled={Boolean(myVote) || submitting}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-colors ${
              myVote === v
                ? "bg-sky-500 text-white"
                : myVote
                ? "bg-gray-50 dark:bg-gray-800/40 text-gray-400 cursor-not-allowed"
                : "bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            }`}
          >
            <span className="text-lg">{LABELS[v].emoji}</span>
            <span>{LABELS[v].en}</span>
            {total > 0 && <span className="text-[10px] text-gray-400">{counts[v]}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
