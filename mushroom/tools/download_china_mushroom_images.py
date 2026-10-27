"""下载已核对逐图许可的中国野外研究级观测照片，不以分类默认封面冒充当地实拍。"""
import argparse
import concurrent.futures

from mushroom_image_sources import REVIEW, download_image, eligible_rows, read_json, save_json


def make_candidate(source, row):
    author = source["author"]
    if author.casefold() == "no rights reserved" and source["license_code"] == "cc0":
        author = "未署名（CC0；来源观测见链接）"
    return {"mushroom_id": row["编号"], "mushroom_name": row["名称"], "scientific_name": row["拉丁名"],
            "source": "iNaturalist", "source_id": str(source["photo_id"]), "source_title": source["scientific_name"] + " / " + str(source["observation_id"]),
            "source_url": source["observation_url"], "photo_page_url": source["photo_page_url"],
            "download_url": source["photo_url"], "original_url": source["original_url"],
            "author": author, "license": source["license_code"].upper(), "license_url": source["license_url"],
            "source_description": source["attribution"], "source_api_url": source["source_api_url"],
            "location_label": source["region"] + "：" + (source["place_guess"] or "观测未公开更细地点"), "china_record": True,
            "identification_status": "来源研究级野生观测，学名精确匹配；未经本项目标本或专家复核",
            "observed_on": source["observed_on"], "source_taxon_id": source["source_taxon_id"],
            "changes": "使用来源large尺寸图，未裁切或改色", "checked_at": "2026-10-26"}


def main():
    parser = argparse.ArgumentParser(description="下载中国地点候选，保留逐图来源和许可")
    parser.add_argument("--source", choices=("inaturalist", "commons"), default="inaturalist")
    args = parser.parse_args()
    commons = args.source == "commons"
    prefix = "commons-china" if commons else "china"
    index = {row["拉丁名"].casefold(): row for row in eligible_rows()}
    sources = read_json(REVIEW / (prefix + ("-candidates.json" if commons else "-photo-candidates.json")), [])
    images = read_json(REVIEW / (prefix + "-downloads.json"), [])
    # CC0的“不保留权利”不是摄影者姓名，不能在署名栏当成人名展示。
    for item in images:
        if item["author"].casefold() == "no rights reserved" and item["license"] == "CC0":
            item["author"] = "未署名（CC0；来源观测见链接）"
    done = {item["source_id"] for item in images}
    pending = []
    skipped = []
    for source in sources:
        row = index.get(source["scientific_name"].casefold())
        if row is None:
            skipped.append({"name": source["scientific_name"], "reason": "主表无确切学名匹配，或主条有已登记分类争议"})
        elif commons:
            if source["mushroom_id"] == row["编号"] and source["source_id"] not in done:
                pending.append(source)
        elif str(source["photo_id"]) not in done and source["quality_grade"] == "research" and source["captive"] is False and source["license_code"] in {"cc0", "cc-by", "cc-by-sa"}:
            pending.append(make_candidate(source, row))
    failures = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        futures = {pool.submit(download_image, item): item for item in pending}
        for number, future in enumerate(concurrent.futures.as_completed(futures), 1):
            try:
                images.append(future.result())
            except Exception as error:
                failures.append({"item": futures[future], "error": str(error)[:300]})
            save_json(REVIEW / (prefix + "-downloads.json"), images)
            if number % 20 == 0 or number == len(pending):
                print(f"中国照片本批处理 {number}/{len(pending)}，累计成功 {len(images)} 张", flush=True)
    save_json(REVIEW / (prefix + "-downloads.json"), images)
    save_json(REVIEW / (prefix + "-download-report.json"), {"downloaded": len(images), "matched_candidates": len(pending), "skipped": skipped, "failures": failures})


if __name__ == "__main__":
    main()
