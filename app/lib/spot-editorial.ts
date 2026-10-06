// 日本語スポットページ向けの「公式情報で確認した授乳室・ベビー休憩室」データ。
// 薄いページ対策（THIN_PAGES_NOINDEX、ROADMAP.md参照）の例外として、ここに載っているスポットの
// 日本語ページだけを index 対象にする。載せてよいのは、施設・鉄道会社・自治体の公式ページで
// 実際に確認できた事実のみ（推測・口コミ・まとめサイトのみの情報は不可）。
// 追加時は出典URLを必ず付け、verifiedAt を更新すること。

export interface EditorialFacility {
  name: string;
  /** 設備の種類（授乳室／ベビー休憩室／おむつ替えベッド 等） */
  kind: string;
  /** 場所（公式に書いてある範囲） */
  where: string;
  /** 利用時間・条件など。公式に記載があるものだけ */
  note?: string;
  sourceUrl: string;
}

export interface SpotEditorial {
  intro: string;
  facilities: EditorialFacility[];
  /** 公式ページを最後に確認した日 */
  verifiedAt: string;
}

const VERIFIED = "2026-10-06";

const UENO_STATION: EditorialFacility[] = [
  {
    name: "上野駅 ベビー休憩室（1階・中央改札内）",
    kind: "ベビー休憩室（おむつ替えベッド、鍵付き授乳室、シンク、親子トイレ）",
    where: "中央改札内、新幹線乗換口改札の付近、みどりの窓口の隣",
    sourceUrl: "https://media.jreast.co.jp/articles/2290",
  },
  {
    name: "上野駅 ベビー休憩室（3階コンコース）",
    kind: "ベビー休憩室（おむつ替えベッド、授乳室、シンク）",
    where: "3階コンコースの1・2番線エレベーター付近",
    note: "授乳室は女性専用、それ以外のスペースは男性も利用可",
    sourceUrl: "https://media.jreast.co.jp/articles/2290",
  },
];

const UENO_PARK: EditorialFacility[] = [
  {
    name: "上野動物園 さるやまキッチンベビールーム（東園）",
    kind: "ベビールーム（授乳用イス、ミルク用お湯、ベビーベッド）",
    where: "東園",
    note: "女性専用エリア以外は男性も利用可",
    sourceUrl: "https://www.tokyo-zoo.net/en/ueno/visitor-info/infant-care/index.html",
  },
  {
    name: "上野動物園 弁天門ベビールーム（西園）",
    kind: "ベビールーム（授乳用イス、ミルク用お湯、ベビーベッド）",
    where: "西園",
    note: "女性専用エリア以外は男性も利用可",
    sourceUrl: "https://www.tokyo-zoo.net/en/ueno/visitor-info/infant-care/index.html",
  },
  {
    name: "上野動物園 屋外ベビーケアルーム mamaro",
    kind: "個室のベビーケアルーム（授乳・おむつ替え。ミルク用の温水器はなし）",
    where: "東園、総合案内所の前",
    sourceUrl: "https://www.tokyo-zoo.net/en/ueno/visitor-info/infant-care/index.html",
  },
  {
    name: "国立科学博物館 授乳室",
    kind: "授乳室、多目的トイレのおむつ替え設備",
    where: "日本館地下1階と地球館3階に授乳室。おむつ替えは日本館B1〜2階と地球館（B1階を除く各階）の多目的トイレ",
    sourceUrl: "https://www.kahaku.go.jp/riyou/kannai-guide/accessibility.html",
  },
  {
    name: "東京都美術館 授乳室",
    kind: "授乳室（個室、ミルク用お湯、おむつ交換設備）",
    where: "中央棟ロビー階のインフォメーション付近",
    note: "9:30〜17:30（特別展開催中の金曜は20:00まで）。無料・予約不可で、空いていれば利用できる",
    sourceUrl: "https://www.tobikan.jp/guide/barrierfree.html",
  },
];

export const SPOT_EDITORIAL: Record<string, SpotEditorial> = {
  "ueno-station": {
    intro:
      "上野駅の構内には、JR東日本が案内しているベビー休憩室が1階と3階の2か所あります。駅の外の上野公園側では、動物園や博物館・美術館が授乳室を設けています。公園エリアの設備は下の「上野公園・動物園周辺」ページにまとめています。",
    facilities: UENO_STATION,
    verifiedAt: VERIFIED,
  },
  "ueno-park-zoo": {
    intro:
      "上野公園の周辺では、上野動物園、国立科学博物館、東京都美術館がそれぞれ授乳室やベビールームを案内しています。動物園は東園・西園に複数あるので、入園後の動線に合わせて選べます。駅構内の設備は「上野駅」ページにあります。",
    facilities: UENO_PARK,
    verifiedAt: VERIFIED,
  },
  "asakusa-sensoji": {
    intro:
      "浅草寺の周辺では、台東区が運営する浅草文化観光センターの授乳室と、駅直結の商業施設（浅草ROX、浅草EKIMISE）、松屋浅草のおむつ替え設備を公式ページで確認できました。",
    facilities: [
      {
        name: "浅草文化観光センター",
        kind: "授乳室（授乳スペース2部屋、調乳器、おむつ替えベッド）",
        where: "2階",
        note: "9:00〜20:00。入口のドアは開けたまま利用し、個室のドアは閉められる",
        sourceUrl:
          "https://www.city.taito.lg.jp/bunka_kanko/kankoinfo/info/oyakudachi/kankocenter/20141001090022547.html",
      },
      {
        name: "浅草ROX",
        kind: "授乳室、ベビーシート（バリアフリートイレにもベビーシートあり）",
        where: "5階。3階（ROX・3G）にも授乳室とベビーシート",
        note: "利用は館の営業時間内",
        sourceUrl: "https://www.rox.co.jp/information/",
      },
      {
        name: "浅草EKIMISE（エキミセ）",
        kind: "ベビー休憩室（ベビーベッド、授乳室、調乳器、洗面台）",
        where: "5階、女性用お手洗いの横",
        note: "授乳室以外は男性も入室可",
        sourceUrl: "https://ekimise.jp/",
      },
      {
        name: "松屋浅草",
        kind: "おむつ替えベッド（授乳室の案内は公式ページになし）、ベビーカー貸出",
        where: "おむつ替えベッドは地下1階（南側女性用トイレ）と1階（北側女性用トイレ）。ベビーカー貸出は1階西側",
        sourceUrl: "https://www.matsuya.com/asakusa/services/",
      },
    ],
    verifiedAt: VERIFIED,
  },
  akihabara: {
    intro:
      "秋葉原駅の周辺では、アトレ秋葉原と秋葉原UDXが、授乳室やおむつ替え設備を公式ページで案内しています。駅の改札を出てすぐ使える場所を中心に挙げます。",
    facilities: [
      {
        name: "アトレ秋葉原1",
        kind: "授乳室（個室1室・女性専用）、調乳用の給湯設備、おむつ替えベッド",
        where: "3階。ベビーベッドは2階の男子化粧室内にもある",
        note: "調乳機とおむつ替えスペースは男性も利用可",
        sourceUrl: "https://www.atre.co.jp/akihabara/service/",
      },
      {
        name: "アトレ秋葉原2",
        kind: "お子様同伴対応化粧室（ベビーベッド設置）",
        where: "2階の車椅子・お子様同伴対応化粧室",
        sourceUrl: "https://www.atre.co.jp/akihabara/service/",
      },
      {
        name: "秋葉原UDX",
        kind: "ベビールーム（授乳室、おむつ交換台、調乳用のお湯、洗面台）",
        where: "4階",
        sourceUrl: "https://udx.jp/en/facilities/",
      },
    ],
    verifiedAt: VERIFIED,
  },
  "shinjuku-station": {
    intro:
      "新宿駅の周辺は大型の百貨店・商業施設が多く、新宿高島屋、伊勢丹新宿店、京王百貨店、ルミネ新宿が、赤ちゃん休憩室や授乳室を公式ページで案内しています。駅からの距離や混雑は時間帯で変わるため、行き先に近い施設を選んでください。",
    facilities: [
      {
        name: "新宿高島屋",
        kind: "赤ちゃん休憩室（9階は授乳用の個室、調乳用のお湯、電子レンジ、オゾン脱臭除菌器）",
        where: "9階と14階",
        note: "設備の詳細を公式ページで確認できたのは9階のみ",
        sourceUrl: "https://www.takashimaya.co.jp/shinjuku/service/",
      },
      {
        name: "伊勢丹新宿店 本館",
        kind: "ベビー休憩所（個室授乳室3室、おむつ替えスペース、親子トイレ、電子レンジ、電子温水器、離乳食・飲料の自動販売機）",
        where: "本館6階",
        sourceUrl: "https://www.mistore.jp/store/shinjuku/service/nursingroom.html",
      },
      {
        name: "京王百貨店 新宿店",
        kind: "ベビー休憩室（授乳室、おむつ替えベッド、調乳用の浄水・温水器、プレイスペース）",
        where: "7階。ベビーカー貸出は7階と1階の正面案内所",
        sourceUrl: "https://www.keionet.com/info/shinjuku/service/",
      },
      {
        name: "ルミネ新宿（ルミネ1・ルミネ2）",
        kind: "授乳室（調乳用の温水器あり）、ベビーベッド付きトイレ、ベビーチェア付きトイレ",
        where: "授乳室はルミネ1が7階、ルミネ2が4階。ベビーベッド付きトイレはルミネ1が4〜7階、ルミネ2が2〜5階",
        note: "利用は館の営業時間内",
        sourceUrl: "https://www.lumine.ne.jp/shinjuku/information/",
      },
    ],
    verifiedAt: VERIFIED,
  },
  harajuku: {
    intro:
      "原宿では、ハラカド、ラフォーレ原宿、東急プラザ表参道原宿（オモカド）の3つの商業施設が、授乳やおむつ替えの設備を公式ページで案内しています。竹下通り周辺は混み合うので、先に場所を確認しておくと安心です。",
    facilities: [
      {
        name: "東急プラザ原宿 ハラカド",
        kind: "授乳スペース、おむつ交換台、調乳用の温水器",
        where: "6階のキッズスペース内",
        sourceUrl: "https://www.tokyu-plaza.com/harakado/facility/detail/9",
      },
      {
        name: "ラフォーレ原宿",
        kind: "授乳室、おむつ交換台（お手洗い内）",
        where: "4階のお手洗い",
        sourceUrl: "https://www.laforet.ne.jp/guide/",
      },
      {
        name: "東急プラザ表参道原宿（オモカド）",
        kind: "ベビーケアルーム「mamaro」（授乳・おむつ替え・離乳食）",
        where: "6階",
        note: "調乳用の温水器はなく、ごみは持ち帰り",
        sourceUrl: "https://www.tokyu-plaza.com/omokado/facility/detail/9",
      },
    ],
    verifiedAt: VERIFIED,
  },
  "tokyo-dome": {
    intro:
      "東京ドームシティ内には、ラクーアや後楽園ホールビル、アトラクションズなど、エリアごとにベビールームがあります。公式の案内で確認できた場所を挙げます。",
    facilities: [
      {
        name: "ラクーア ベビールーム",
        kind: "授乳室、おむつ替えベッド",
        where: "3階の女性用トイレの隣。1〜4階と9階のトイレにもおむつ替え台",
        note: "11:00〜21:00（ラクーアの営業時間に準ずる）。授乳エリアは母親専用、おむつ替えは男性も利用可",
        sourceUrl: "https://www.laqua.jp/shops-restaurants/service/",
      },
      {
        name: "後楽園ホールビル ベビールーム",
        kind: "ベビールーム",
        where: "1階",
        note: "10:00〜23:00",
        sourceUrl: "https://www.tokyo-dome.co.jp/en/guide/child.html",
      },
      {
        name: "東京ドームシティ アトラクションズ（ジオポリス・ヴァイキングゾーン）",
        kind: "ベビールーム",
        where: "各ゾーンの1階",
        note: "アトラクションの営業時間中",
        sourceUrl: "https://www.tokyo-dome.co.jp/en/guide/child.html",
      },
      {
        name: "ASOBono!（アソボーノ）",
        kind: "ベビールーム（おむつ交換台、授乳室、給湯設備）",
        where: "休憩エリアの近く、乳児向けの遊び場「ハイハイガーデン」の隣",
        sourceUrl: "https://www.tokyo-dome.co.jp/asobono/area/?tabChange=sea",
      },
    ],
    verifiedAt: VERIFIED,
  },
};

export function getSpotEditorial(slug: string): SpotEditorial | undefined {
  return SPOT_EDITORIAL[slug];
}

/** 日本語ページを index 対象にするスポット（sitemap・robots 判定に使う） */
export const INDEXABLE_JA_SPOT_SLUGS = Object.keys(SPOT_EDITORIAL);
