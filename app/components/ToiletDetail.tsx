"use client";

import type { Toilet } from "../types/toilet";
import { getOpenStatus, formatHours } from "../lib/opening-hours";
import { calcDistance, formatDistance } from "../lib/distance";
import { useI18n } from "../i18n/provider";

interface Props {
  toilet: Toilet;
  userPos: [number, number] | null;
  onClose: () => void;
}

function OpenBadge({ status, t }: { status: "open" | "closed" | "unknown"; t: (k: string) => string }) {
  if (status === "open")
    return <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">{t("openNow")}</span>;
  if (status === "closed")
    return <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">{t("closed")}</span>;
  return null;
}

function Row({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm flex items-center gap-1.5">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
      <span className="text-sm font-medium text-right">{children}</span>
    </div>
  );
}

export default function ToiletDetail({ toilet, userPos, onClose }: Props) {
  const { t } = useI18n();
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${toilet.lat},${toilet.lon}&travelmode=walking`;
  const openStatus = getOpenStatus(toilet.openingHours);
  const distance =
    userPos ? calcDistance(userPos[0], userPos[1], toilet.lat, toilet.lon) : null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-2xl shadow-2xl max-h-[65vh] flex flex-col">
      {/* ドラッグハンドル */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 bg-gray-200 rounded-full" />
      </div>

      <div className="px-5 pb-2 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-gray-900 text-base leading-tight truncate">
            {toilet.nameEn || toilet.name || "Public Toilet"}
          </h2>
          {toilet.nameEn && toilet.name && toilet.nameEn !== toilet.name && (
            <p className="text-xs text-gray-400 leading-tight truncate">{toilet.name}</p>
          )}
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <OpenBadge status={openStatus} t={t} />
            {distance !== null && (
              <span className="text-xs text-gray-500">📍 {formatDistance(distance)}</span>
            )}
            {toilet.fee === false && (
              <span className="text-xs text-green-600 font-medium">Free</span>
            )}
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl ml-3 mt-0.5 flex-shrink-0">✕</button>
      </div>

      {/* おむつ替え台 ハイライト */}
      {toilet.changingTable && (
        <div className="mx-5 mb-2 bg-sky-50 border border-sky-200 rounded-xl px-4 py-2.5 flex items-center gap-3">
          <span className="text-2xl">🍼</span>
          <div>
            <p className="text-sky-700 font-semibold text-sm">{t("changingTable")}</p>
            <p className="text-sky-600 text-xs">Available at this facility</p>
          </div>
        </div>
      )}

      {/* 詳細情報 */}
      <div className="px-5 overflow-y-auto flex-1">
        {!toilet.changingTable && (
          <Row icon="🍼" label={t("changingTable")}>
            <span className="text-gray-400">{t("no")}</span>
          </Row>
        )}
        <Row icon="♿" label={t("wheelchair")}>
          {toilet.wheelchair
            ? <span className="text-green-600">✓ {t("yes")}</span>
            : <span className="text-gray-400">{t("unknown")}</span>}
        </Row>
        <Row icon="💴" label="Fee">
          {toilet.fee
            ? <span className="text-orange-500">Paid</span>
            : <span className="text-green-600">Free</span>}
        </Row>
        {toilet.openingHours && (
          <Row icon="🕐" label={t("hours")}>
            <span className="text-gray-700 max-w-[160px] text-right">
              {formatHours(toilet.openingHours)}
            </span>
          </Row>
        )}
        {toilet.operator && (
          <Row icon="🏢" label={t("facilityName")}>
            <span className="text-gray-700">{toilet.operator}</span>
          </Row>
        )}
        <Row icon="🌐" label="Source">
          <span className="text-gray-400 text-xs">
            {toilet.source === "opendata"
              ? "Municipal Open Data (CC BY)"
              : "OpenStreetMap (ODbL)"}
          </span>
        </Row>
      </div>

      <div className="px-5 py-4">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3.5 rounded-xl transition-colors w-full"
        >
          🗺️ {t("openInMaps")}
        </a>
      </div>
    </div>
  );
}
