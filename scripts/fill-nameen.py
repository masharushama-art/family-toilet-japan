"""
nameEn(英語名)が空のレコードをルールベースで補完する。

方針:
  1. 施設種別語を英訳辞書で置換（長い語を優先マッチ）
  2. 残った固有名部分のみ pykakasi でヘボン式ローマ字化（Title Case）
  3. 既に nameEn があるレコードは上書きしない
  4. 全角数字→半角、区切り(／・全角空白)を整理
  5. dry-run でサンプル確認 → 本実行

使い方:
  python scripts/fill-nameen.py --dry-run
  python scripts/fill-nameen.py
"""

import json, re, sys, random
from pathlib import Path
import pykakasi

DATA_FILE = Path(__file__).parent.parent / "public" / "data" / "toilets.json"

# 施設種別語 → 英語（長い語ほど先に並べる＝最長一致を優先）
TERM_MAP = [
    ("公衆トイレ", "Public Toilet"),
    ("公衆便所", "Public Toilet"),
    ("児童遊園", "Children's Playground"),
    ("児童公園", "Children's Park"),
    ("近隣公園", "Park"),
    ("総合公園", "Park"),
    ("運動公園", "Sports Park"),
    ("文化公園", "Cultural Park"),
    ("記念公園", "Memorial Park"),
    ("中央公園", "Central Park"),
    ("緑地公園", "Green Park"),
    ("レクリエーション", "Recreation"),
    ("コミュニティ", "Community"),
    ("センター", "Center"),
    ("グラウンド", "Ground"),
    ("グランド", "Ground"),
    ("体育館", "Gymnasium"),
    ("図書館", "Library"),
    ("野球場", "Baseball Field"),
    ("運動場", "Athletic Field"),
    ("文化会館", "Cultural Hall"),
    ("区民館", "Residents' Hall"),
    ("市民館", "Citizens' Hall"),
    ("保育園", "Nursery"),
    ("幼稚園", "Kindergarten"),
    ("小学校", "Elementary School"),
    ("中学校", "Junior High School"),
    ("公園", "Park"),
    ("緑地", "Green Space"),
    ("広場", "Plaza"),
    ("会館", "Hall"),
    ("ホール", "Hall"),
    ("プール", "Pool"),
    ("市場", "Market"),
    ("病院", "Hospital"),
    ("神社", "Shrine"),
    ("手洗所", "Washroom"),
    ("緑道", "Greenway"),
    ("遊園", "Playground"),
    ("公衆", "Public"),
    ("トイレ", "Toilet"),
    ("便所", "Toilet"),
    ("駅", "Station"),
    ("神社", "Shrine"),
    # 注: 川/池/橋/寺 は地名に融合しやすく「今川→Imagawa」等を誤訳するため
    #     辞書に入れず固有名としてローマ字化する
    # 方位・位置（接尾）
    ("西口", "West Exit"),
    ("東口", "East Exit"),
    ("南口", "South Exit"),
    ("北口", "North Exit"),
    ("北側", "North Side"),
    ("南側", "South Side"),
    ("東側", "East Side"),
    ("西側", "West Side"),
    # 位置補助（ドロップ）
    ("内", ""),
    ("横", ""),
    ("際", ""),
    # 属性（接頭）
    ("区立", "Municipal"),
    ("市立", "Municipal"),
    ("都立", "Metropolitan"),
]

_kks = pykakasi.kakasi()

ZEN2HAN = str.maketrans("０１２３４５６７８９", "0123456789")


def has_japanese(s: str) -> bool:
    return bool(re.search(r"[぀-ヿ一-鿿]", s))


def romaji(jp: str) -> str:
    """日本語片をヘボン式ローマ字(Title Case)へ。非日本語はそのまま。"""
    jp = jp.strip()
    if not jp:
        return ""
    out = []
    for item in _kks.convert(jp):
        h = item["hepburn"].strip()
        if h:
            out.append(h.capitalize())
    return " ".join(out)


def convert_name(name: str):
    """
    name を英語名に変換。
    戻り値: (english, fully_recognized)
      fully_recognized=False は辞書語を1つも含まず固有名のみだった等のフラグ
    """
    s = name.translate(ZEN2HAN)
    # 「(漢数字/数字)丁目」は英語名では冗長なので除去（例: 八丁目→除去）
    s = re.sub(r"[一二三四五六七八九十0-9]+丁目", " ", s)
    # 区切り・括弧を空白へ
    s = re.sub(r"[／/・　　\(\)（）]+", " ", s).strip()

    if not has_japanese(s):
        # 既に英数字のみ（例: AEON）→ そのまま採用
        return s.strip(), True

    tokens = []           # 出力トークン（英語）
    buf = ""              # ローマ字化待ちの日本語バッファ
    matched_term = False
    i = 0
    while i < len(s):
        # 最長一致で辞書語を探す
        hit = None
        for term, en in TERM_MAP:
            if s.startswith(term, i):
                hit = (term, en)
                break
        if hit:
            if buf:
                r = romaji(buf)
                if r:
                    tokens.append(r)
                buf = ""
            tokens.append(hit[1])
            matched_term = True
            i += len(hit[0])
        else:
            buf += s[i]
            i += 1
    if buf:
        r = romaji(buf)
        if r:
            tokens.append(r)

    english = " ".join(t for t in tokens if t).strip()
    english = re.sub(r"\s+", " ", english)
    return english, matched_term


def main():
    dry = "--dry-run" in sys.argv
    data = json.load(open(DATA_FILE, encoding="utf-8"))
    targets = [t for t in data if t.get("name") and not t.get("nameEn")]

    converted = 0
    unrecognized = []   # 辞書語なしで固有名のみだったもの
    empty = []          # 変換結果が空になったもの
    samples = []

    for t in targets:
        en, ok = convert_name(t["name"])
        if not en:
            empty.append(t["name"])
            continue
        if not ok:
            unrecognized.append((t["name"], en))
        samples.append((t["name"], en))
        if not dry:
            t["nameEn"] = en
        converted += 1

    print(f"対象(name有・nameEn空): {len(targets)}")
    print(f"変換成功: {converted}")
    print(f"辞書語を含まず固有名のみ(要確認): {len(unrecognized)}")
    print(f"変換結果が空: {len(empty)}")

    print("\n=== 変換サンプル 20件 ===")
    random.seed(7)
    for jp, en in random.sample(samples, min(20, len(samples))):
        print(f"  {jp}  ->  {en}")

    if unrecognized:
        print("\n=== 辞書外パターン例（固有名のみ・最大15件）===")
        for jp, en in unrecognized[:15]:
            print(f"  {jp}  ->  {en}")

    if empty:
        print("\n=== 変換できなかった例（最大10件）===")
        for jp in empty[:10]:
            print(f"  {jp}")

    if dry:
        print("\n[dry-run] 保存なし")
    else:
        json.dump(data, open(DATA_FILE, "w", encoding="utf-8"),
                  ensure_ascii=False, separators=(",", ":"))
        print(f"\nSaved {len(data):,} records -> {DATA_FILE}")
        print(f"nameEn 補完: +{converted}")


if __name__ == "__main__":
    main()
