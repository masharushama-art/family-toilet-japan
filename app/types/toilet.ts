export interface Toilet {
  id: string;
  lat: number;
  lon: number;
  name?: string;
  nameEn?: string;
  operator?: string;
  address?: string;
  changingTable?: boolean;
  wheelchair?: boolean;
  openingHours?: string;
  fee?: boolean;
  image?: string;
  city: string;
  ward?: string;
  source: "osm" | "opendata";
  geocoded?: boolean;
  // ROADMAP P3-11: OSMタグ強化データ（未取得の既存レコードでは省略可）
  changingTableLocation?: string; // 例: "male" | "female" | "unisex" | "dedicated_room"
  level?: string; // 階数（例: "3" は3階）
  ostomate?: boolean; // オストメイト対応
}

export interface FilterState {
  familyFriendlyOnly: boolean;
  changingTableOnly: boolean;
  wheelchairOnly: boolean;
  open24hOnly: boolean;
  ostomateOnly: boolean;
}
