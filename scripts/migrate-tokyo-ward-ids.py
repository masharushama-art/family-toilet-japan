"""
一度きりの移行スクリプト（2026-07-29 実施）。

public/data/toilets.json 内の opendata_tokyo_<区名（日本語）>_<lat>_<lon> 形式のIDを
opendata_tokyo_<区名（ローマ字）>_<lat>_<lon> 形式に一括変換し、public/data/cities/*.json を
再生成する（split-by-city.py と同じ処理）。

背景: 生の日本語区名をIDに含めていたため、OpenNext(Cloudflare)のルーティング層が
非ASCIIな動的ルートを常に404にしてしまう不具合があった（ROADMAP参照）。

区名→ローマ字の対応は merge-tokyo-wards.py の WARD_ROMAJI を再利用する
（今後 merge-tokyo-wards.py を再実行しても同じ変換結果になることを保証するため）。

使い方:
  python scripts/migrate-tokyo-ward-ids.py [--dry-run]
"""
import importlib.util
import re
import subprocess
import sys
from pathlib import Path

_spec = importlib.util.spec_from_file_location(
    "merge_tokyo_wards", Path(__file__).parent / "merge-tokyo-wards.py"
)
mtw = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(mtw)
mo = mtw.mo

ID_RE = re.compile(r"^opendata_tokyo_([^_]+)_(-?\d+\.\d+)_(-?\d+\.\d+)$")


def convert_id(old_id: str):
    """変換後のIDを返す。対象外（他都市・OSM由来・既に変換済み等）なら None。"""
    m = ID_RE.match(old_id)
    if not m:
        return None
    ward, lat, lon = m.groups()
    romaji = mtw.WARD_ROMAJI.get(ward)
    if romaji is None:
        return None
    return f"opendata_tokyo_{romaji}_{lat}_{lon}"


def main():
    dry_run = "--dry-run" in sys.argv
    toilets = mo.load_toilets()

    id_map = {}  # old_id -> new_id（変換対象のみ）
    for rec in toilets:
        new_id = convert_id(rec["id"])
        if new_id is not None:
            id_map[rec["id"]] = new_id

    print(f"変換対象: {len(id_map):,} 件")

    # 衝突チェック: このマイグレーションが原因で衝突が起きないことだけを見る
    # （データセットには本件と無関係な既存の重複IDがあり得るため、それらは対象外）。
    # 1) 変換後の新ID同士が重複しないこと
    new_ids = list(id_map.values())
    if len(new_ids) != len(set(new_ids)):
        seen = set()
        dupes = set()
        for i in new_ids:
            if i in seen:
                dupes.add(i)
            seen.add(i)
        raise SystemExit(f"変換後のID同士が衝突しました。処理を中止します: {sorted(dupes)[:10]}")
    # 2) 新IDが、変換対象ではない他レコードの既存IDと重複しないこと
    other_ids = {t["id"] for t in toilets if t["id"] not in id_map}
    collisions = other_ids & set(new_ids)
    if collisions:
        raise SystemExit(f"変換後のIDが既存の別レコードと衝突しました。処理を中止します: {sorted(collisions)[:10]}")

    print("衝突チェック: OK（このマイグレーションに起因する衝突なし）")

    if dry_run:
        print("[dry-run] 保存はスキップします")
        for old_id, new_id in list(id_map.items())[:5]:
            print(f"  {old_id} -> {new_id}")
        return

    for rec in toilets:
        if rec["id"] in id_map:
            rec["id"] = id_map[rec["id"]]

    mo.save_toilets(toilets)

    print("cities/*.json を再生成します...")
    subprocess.run(
        [sys.executable, str(Path(__file__).parent / "split-by-city.py")], check=True
    )


if __name__ == "__main__":
    main()
