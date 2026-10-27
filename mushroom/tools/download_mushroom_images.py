"""下载有明确许可的菌物参考图片，保存精确名称连接和可恢复的采集状态。"""
import argparse
import concurrent.futures
import time

from mushroom_image_sources import (PROJECT, REVIEW, commons_candidate, download_image, eligible_rows,
                                    read_json, request_json, save_json)


def discover():
    rows = eligible_rows()
    target = REVIEW / "commons-category-index.json"
    index = read_json(target, {})
    pending = [row for row in rows if row["编号"] not in index]
    batches = [pending[start:start + 50] for start in range(0, len(pending), 50)]
    for number, batch in enumerate(batches, 1):
        data = request_json({"titles": "|".join("Category:" + row["拉丁名"] for row in batch), "prop": "categoryinfo"})
        pages = {page["title"].casefold(): page for page in data.get("query", {}).get("pages", [])}
        for row in batch:
            page = pages.get(("Category:" + row["拉丁名"]).casefold(), {})
            index[row["编号"]] = {"mushroom_id": row["编号"], "name": row["名称"], "scientific_name": row["拉丁名"],
                                  "category": page.get("title", ""), "files": page.get("categoryinfo", {}).get("files", 0),
                                  "subcategories": page.get("categoryinfo", {}).get("subcats", 0), "missing": "missing" in page or not page}
        save_json(target, index)
        if number % 10 == 0 or number == len(batches):
            print(f"已查询 {len(index)}/{len(rows)} 条；含直系图片类别 {sum(x['files'] > 0 for x in index.values())}", flush=True)
        time.sleep(0.3)


def fetch_one(row):
    data = request_json({"generator": "categorymembers", "gcmtitle": "Category:" + row["拉丁名"], "gcmnamespace": 6,
                         "gcmlimit": 4, "prop": "imageinfo", "iiprop": "url|extmetadata|size|mime|mediatype", "iiurlwidth": 1280,
                         "iiextmetadatafilter": "Artist|LicenseShortName|LicenseUrl|ImageDescription|Categories|Restrictions"})
    candidates = [commons_candidate(row, page) for page in data.get("query", {}).get("pages", [])]
    candidates = [item for item in candidates if item]
    candidates.sort(key=lambda item: not item["china_record"])
    errors = []
    for item in candidates[:3]:
        try:
            return {"status": "downloaded", "image": download_image(item), "candidates": len(candidates)}
        except (OSError, ValueError, RuntimeError) as error:
            errors.append(str(error)[:300])
    return {"status": "no_eligible_photo" if not errors else "download_failed", "candidates": len(candidates), "errors": errors}


def apply_review(images):
    decisions = read_json(REVIEW / "image-review-decisions.json", [])
    index = {(item["source"], item["source_id"]): item for item in decisions}
    reviewed = read_json(REVIEW / "image-content-reviewed.json", [])
    reviewed_keys = {(item["source"], item["source_id"], item["sha256"]) for item in reviewed}
    accepted = []
    for image in images:
        # 下载通过并不表示适合普通图库，须先完成对应文件的内容类型审阅。
        if (image["source"], image["source_id"], image.get("sha256")) not in reviewed_keys:
            continue
        decision = index.get((image["source"], image["source_id"]), {})
        if decision.get("action") == "exclude":
            continue
        item = dict(image)
        if item["source"] == "iNaturalist":
            item["identification_status"] = "来源研究级观测，学名精确匹配；未经本项目标本或专家复核"
        if decision.get("action") == "annotate":
            item.update(usage_note=decision["reason"], reference_only=True)
        accepted.append(item)
    return accepted


def sync_manifest(states):
    images = [entry["image"] for entry in states.values() if entry.get("status") == "downloaded"]
    chinese = read_json(REVIEW / "china-downloads.json", [])
    chinese += read_json(REVIEW / "commons-china-downloads.json", [])
    # 同种中国实拍优先，Commons图保留为第二张，不覆盖原有图片文件。
    unique = {(item["mushroom_id"], item["source"], item["source_id"]): item for item in images + chinese}
    save_json(PROJECT / "data" / "image_sources.json", {"version": 1, "updated_at": "2026-10-26",
              "identification_limit": "来源标注匹配不是本项目独立物种鉴定，图片不能作为采食依据", "images": apply_review(list(unique.values()))})


def fetch(limit):
    index = read_json(REVIEW / "commons-category-index.json", {})
    state_path = REVIEW / "commons-download-state.json"
    states = read_json(state_path, {})
    pending = [row for row in eligible_rows() if index.get(row["编号"], {}).get("files", 0) and row["编号"] not in states]
    pending.sort(key=lambda row: (int(row["编号"]) > 61, "中毒" not in row["是否有毒性"] and "有毒" not in row["是否有毒性"], int(row["编号"])))
    if limit:
        pending = pending[:limit]
    started = time.monotonic()
    # 两个工作线程限制并发；每次结果立即落盘，便于中断后继续。
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        futures = {pool.submit(fetch_one, row): row for row in pending}
        for number, future in enumerate(concurrent.futures.as_completed(futures), 1):
            row = futures[future]
            try:
                result = future.result()
            except Exception as error:
                result = {"status": "request_failed", "error": str(error)[:300]}
            states[row["编号"]] = {"scientific_name": row["拉丁名"], **result}
            save_json(state_path, states)
            if number % 10 == 0 or number == len(pending):
                sync_manifest(states)
                print(f"本批处理 {number}/{len(pending)}；累计下载 {sum(x['status'] == 'downloaded' for x in states.values())} 张；用时 {time.monotonic()-started:.0f} 秒", flush=True)
    sync_manifest(states)


def main():
    parser = argparse.ArgumentParser(description="按确切学名下载并登记开放许可菌物图片")
    parser.add_argument("action", choices=("discover", "fetch", "manifest"))
    parser.add_argument("--limit", type=int, default=0, help="本批最多处理条目数，0为全部已找到类别")
    args = parser.parse_args()
    if args.action == "discover":
        discover()
    elif args.action == "fetch":
        fetch(args.limit)
    else:
        sync_manifest(read_json(REVIEW / "commons-download-state.json", {}))


if __name__ == "__main__":
    main()
