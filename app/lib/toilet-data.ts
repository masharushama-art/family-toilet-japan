import fs from "fs";
import path from "path";
import type { Toilet } from "../types/toilet";

export const CITIES = {
  tokyo:    { name: "Tokyo",    jaName: "東京",  lat: 35.681, lon: 139.767 },
  osaka:    { name: "Osaka",    jaName: "大阪",  lat: 34.693, lon: 135.502 },
  kyoto:    { name: "Kyoto",    jaName: "京都",  lat: 35.011, lon: 135.768 },
  nagoya:   { name: "Nagoya",   jaName: "名古屋", lat: 35.170, lon: 136.882 },
  yokohama: { name: "Yokohama", jaName: "横浜",  lat: 35.443, lon: 139.638 },
  fukuoka:  { name: "Fukuoka",  jaName: "福岡",  lat: 33.590, lon: 130.401 },
  nara:     { name: "Nara",     jaName: "奈良",  lat: 34.685, lon: 135.805 },
  chiba:    { name: "Chiba",    jaName: "千葉",  lat: 35.605, lon: 140.123 },
} as const;

export type CitySlug = keyof typeof CITIES;

export const CATEGORIES = {
  "changing-table": {
    name: "Baby Changing Table",
    description: "Toilets with baby changing tables",
    filter: (t: Toilet) => t.changingTable,
    icon: "🍼",
  },
  wheelchair: {
    name: "Wheelchair Accessible",
    description: "Wheelchair accessible toilets",
    filter: (t: Toilet) => t.wheelchair,
    icon: "♿",
  },
  free: {
    name: "Free Toilets",
    description: "Free public toilets",
    filter: (t: Toilet) => !t.fee,
    icon: "💚",
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

function loadCity(city: string): Toilet[] {
  const filePath = path.join(process.cwd(), "public", "data", "cities", `${city}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Toilet[];
  } catch {
    return [];
  }
}

export function getToiletsByCity(city: CitySlug): Toilet[] {
  return loadCity(city);
}

export function getToiletsByCityAndCategory(city: CitySlug, category: CategorySlug): Toilet[] {
  return getToiletsByCity(city).filter(CATEGORIES[category].filter);
}

export function getCityStats(city: CitySlug) {
  const all = getToiletsByCity(city);
  return {
    total: all.length,
    withChangingTable: all.filter((t) => t.changingTable).length,
    wheelchair: all.filter((t) => t.wheelchair).length,
    free: all.filter((t) => !t.fee).length,
  };
}
