// "use client" モジュールから定数を export するとサーバーコンポーネント側では文字列ではなく
// クライアント参照になり、JSON-LD 等で値が欠落するため、ここに置いて両側から import する
export const CONTACT_FORM_URL = "https://forms.gle/rs3vP7d6srW1pGHs7";
