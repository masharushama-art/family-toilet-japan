"use client";

import { useState, useEffect } from "react";
import type { Toilet } from "../types/toilet";
import { getOpenStatus, formatHours } from "../lib/opening-hours";
import { calcDistance, formatDistance } from "../lib/distance";
import { useI18n } from "../i18n/provider";
import ShareButtons from "./ShareButtons";
import { isFavorite, toggleFavorite } from "../lib/favorites";
import { addToHistory } from "../lib/history";

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
  const [fav, setFav] = useState(false);
  useEffect(() => {
    setFav(isFavorite(toilet.id));
    addToHistory(toilet.id);
  }, [toilet.id]);
  const handleFav = () => { setFav(toggleFavorite(toilet.id)); };

  // OSMタイルサムネイル用のタイル座標を計算
  const zoom = 17;
  const tileX = Math.floor(((toilet.lon + 180) / 360) * Math.pow(2, zoom));
  const tileY = Math.floor(
    (1 - Math.log(Math.tan((toilet.lat * Math.PI) / 180) + 1 / Math.cos((toilet.lat * Math.PI) / 180)) / Math.PI) /
      2 *
      Math.pow(2, zoom)
  );
  const tileUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${zoom}/${tileY}/${tileX}`;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-2xl shadow-2xl max-h-[65vh] flex flex-col">
      {/* 地図サムネイル */}
      <div className="relative h-28 rounded-t-2xl overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tileUrl}
          alt="Location map"
          className="w-full h-full object-cover"
          style={{ imageRendering: "pixelated" }}
        />
        {/* 中央ピン */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-5 h-5 rounded-full bg-sky-500 border-3 border-white shadow-lg" style={{ border: "3px solid white" }} />
        </div>
        {/* 閉じるボタン（サムネイル上に重ねる） */}
        <button onClick={onClose} className="absolute top-2 right-2 bg-white/80 rounded-full w-7 h-7 flex items-center justify-center text-gray-600 text-sm shadow">✕</button>
      </div>

      {/* ドラッグハンドル */}
      <div className="flex justify-center pt-2 pb-1">
        <div className="w-10 h-1 bg-gray-200 rounded-full" />
      </div>

      <div className="px-5 pb-2 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-gray-900 text-base leading-tight truncate">
            {toilet.nameEn || toilet.name ||
              (toilet.changingTable ? t("unnamedToiletBaby") : t("unnamedToilet"))}
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
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          <button
            onClick={handleFav}
            className={`text-2xl transition-transform active:scale-110 ${fav ? "text-red-500" : "text-gray-300"}`}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          >
            {fav ? "♥" : "♡"}
          </button>
        </div>
      </div>

      {/* 概算位置の注記（ジオコーディング座標） */}
      {toilet.geocoded && (
        <div className="mx-5 mb-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 flex items-center gap-2">
          <span className="text-base">📍</span>
          <p className="text-amber-700 text-xs">{t("approxLocationNote")}</p>
        </div>
      )}

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
          {toilet.fee === true
            ? <span className="text-orange-500">Paid</span>
            : toilet.fee === false
            ? <span className="text-green-600">Free</span>
            : <span className="text-gray-400">{t("unknown")}</span>}
        </Row>
        {toilet.openingHours && (
          <Row icon="🕐" label={t("hours")}>
            <span className="text-gray-700 max-w-[160px] text-right">
              {formatHours(toilet.openingHours)}
            </span>
          </Row>
        )}
        {toilet.address && (
          <Row icon="📮" label={t("address")}>
            <span className="text-gray-700 max-w-[180px] text-right">{toilet.address}</span>
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
              : <a href={`https://www.openstreetmap.org/node/${toilet.id}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">OpenStreetMap (ODbL)</a>}
            {toilet.geocoded && " · 国土地理院 (GSI)"}
          </span>
        </Row>
        {toilet.source !== "opendata" && (
          <div className="py-2">
            <a
              href={`https://www.openstreetmap.org/edit?node=${toilet.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-sky-600 transition-colors"
            >
              ✏️ Fix incorrect data on OpenStreetMap
            </a>
          </div>
        )}
      </div>

      <div className="px-5 py-4 space-y-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3.5 rounded-xl transition-colors w-full"
        >
          🗺️ {t("openInMaps")}
        </a>
        <div className="flex justify-center">
          <ShareButtons
            url={`https://www.google.com/maps?q=${toilet.lat},${toilet.lon}`}
            text={`${toilet.nameEn || toilet.name || "Family-friendly toilet"} — found on Family Toilet Japan 🚽🍼`}
          />
        </div>
      </div>
    </div>
  );
}
