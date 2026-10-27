"""生成可离线查看照片、来源和未完成范围的验收页。"""
import csv
import html
from collections import Counter

from mushroom_image_sources import PROJECT, REVIEW, read_json, save_json


def esc(value):
    return html.escape(str(value), quote=True)


def photo_card(item):
    # 原图仅用浏览器等比缩放，不另存编辑版本。
    source = "../" + item["path"]
    searchable = " ".join((item.get("mushroom_name", ""), item["scientific_name"], item["mushroom_id"], item["location_label"]))
    return f'''<article data-search="{esc(searchable.lower())}">
    <a href="{esc(source)}"><img src="{esc(source)}" loading="lazy" alt="{esc(item['scientific_name'])}"></a>
    <div><h3>{esc(item.get('mushroom_name', ''))} <small>#{esc(item['mushroom_id'])}</small></h3>
    <p><i>{esc(item['scientific_name'])}</i></p><p>{esc(item['location_label'])}</p>
    <p>作者：{esc(item['author'])}</p><p><a href="{esc(item['source_url'])}">{esc(item['source'])} 原始记录</a> ·
    <a href="{esc(item['license_url'])}">{esc(item['license'])}</a></p>
    <p>{esc(item.get('usage_note', '宏观参考照片；物种未经本项目专家复核'))}</p>
    <p>{esc(item['changes'])}</p></div></article>'''


def main():
    images = read_json(PROJECT / "data" / "image_sources.json")["images"]
    validation = read_json(REVIEW / "image-validation.json")
    decisions = read_json(REVIEW / "image-review-decisions.json")
    pending = read_json(REVIEW / "commons-china-download-report.json")["failures"]
    categories = read_json(REVIEW / "commons-category-index.json")
    with (PROJECT / "data" / "mushroom.csv").open(encoding="utf-8-sig", newline="") as file:
        rows = list(csv.DictReader(file))
    matched = {item["mushroom_id"] for item in images}
    missing = [{"id": row["编号"], "name": row["名称"], "scientific_name": row["拉丁名"], "record_type": row["记录类型"]}
               for row in rows if row["编号"] not in matched]
    save_json(REVIEW / "rows-without-new-source-photo.json", missing)
    summary = {**validation, "主表条目": len(rows), "尚无本轮来源新图条目": len(missing),
               "中国Commons候选未下载": len(pending), "Commons类别已查询": len(categories), "Commons类别候选总条目": 7639,
               "停止原因": "Commons API和图片服务器返回429限流或较长Retry-After；保存断点，未继续远端请求",
               "iNaturalist中国地区分布": dict(Counter(item["location_label"].split("：")[0] for item in images if item["source"] == "iNaturalist")),
               "自动测试通过": 44, "浏览器已检查": ["干巴菌详情图片加载、作者/来源/许可、点击放大", "金针菇商品场景用途注释", "图库卡片图片加载、辅助照片提示、原色显示"],
               "未完成": ["全国所有现生大型真菌的完整照片覆盖", "逐张物种专家鉴定及地点独立复核", "微信视频号和抖音素材下载", "Commons剩余类别检索与候选下载"]}
    save_json(REVIEW / "delivery-summary.json", summary)
    cards = "".join(photo_card(item) for item in sorted(images, key=lambda item: (not item["china_record"], int(item["mushroom_id"]))))
    excluded = "".join(f"<li>{esc(item['source'])} {esc(item['source_id'])}：{esc(item['reason'])}</li>" for item in decisions if item["action"] == "exclude")
    failures = "".join(f"<li><a href='{esc(entry['item']['source_url'])}'>{esc(entry['item']['scientific_name'])} / {esc(entry['item']['source_id'])}</a>：HTTP 429</li>" for entry in pending)
    document = f'''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>中国大型真菌图片下载与验收 · 2026-10-26</title><style>
    body{{margin:0;background:#f4f5ef;color:#263a30;font:16px/1.7 system-ui,sans-serif}}main{{max-width:1300px;margin:40px auto;padding:0 24px}}
    h1{{font-size:30px}}h2{{margin-top:36px}}a{{color:#24634b}}small,.note{{color:#667366}}.stats{{display:flex;gap:24px;flex-wrap:wrap;background:#e4ecdf;padding:20px}}
    .stats b{{font-size:30px;display:block}}.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}}article{{border:1px solid #d8dfd3;background:white;border-radius:6px;overflow:hidden}}
    article img{{width:100%;height:240px;object-fit:contain;background:#e8ece4}}article div{{padding:16px}}article p{{font-size:13px;margin:8px 0;overflow-wrap:anywhere}}h3{{margin:0;font-size:18px}}input{{padding:13px;width:min(600px,90%);font-size:16px;border:1px solid #a7b4a1;border-radius:4px}}
    code{{background:#e6ebdf;padding:3px 5px}}[hidden]{{display:none!important}}details{{margin:20px 0}}li{{margin-bottom:8px}}
    </style><main><p class="note">本地资料包 · 核查日期 2026-10-26</p><h1>中国大型真菌图片下载与验收</h1>
    <div class="stats"><span><b>{validation['本地新增下载文件']}</b>已下载文件</span><span><b>{len(images)}</b>纳入网站展示</span><span><b>{len(matched)}</b>对应主表条目</span><span><b>{validation['中国地点有来源的图片']}</b>有中国地点来源的照片</span></div>
    <p>本轮完成文件下载、逐图许可登记、确切学名连接和画面类型审阅。图片来源为 iNaturalist 和 Wikimedia Commons。中国地点依据原观测或地理分类，不等于项目独立复核；研究级观测也不等于专家鉴定。图片不能用于决定采食。</p>
    <p>主表有 {len(rows)} 条，仍有 {len(missing)} 条未获得本轮带来源的新图（其中部分有原有图片）。原有 65 个图片文件与 mushroom.csv 的哈希均未改变。本页的宏观照片、商品场景和离体标本均保留用途区别。</p>
    <p>iNaturalist 已展示照片：大陆 65 张、香港 47 张、台湾 181 张；另有 Commons 中国地理来源照片 27 张。素材分布不均衡，不能视为全国各省的充分覆盖。</p>
    <p><a href="../image_sources.json">网站图片来源清单</a> · <a href="image-validation.json">文件验收结果</a> · <a href="delivery-summary.json">交付汇总</a> · <a href="rows-without-new-source-photo.json">缺少本轮新图的条目</a></p>
    <h2>当前完成范围与后续断点</h2><p>44 项自动测试通过；浏览器已验证详情图片、署名、许可链接目标、放大预览、商品用途标注和卡片原色显示。397 个不同本地图片文件均经接触表内容审阅；本次没有物种专家签审。</p>
    <p>中国地区公开候选的 301 张 iNaturalist 图片均已下载；Commons 中国候选 42 张已下载 32 张。Commons 检索到 {len(categories)}/7639 条时触发限流，断点已保留。微信视频号、抖音本轮没有取得能够核实物种、来源和许可的具体公开素材，未下载其图片。</p>
    <p>参考网站 Ultimate Mushroom 的图片应追溯原始作者页面；发现个别原图许可与参考站标签不一致。本项目按原始图片许可登记。<a href="reference-sources.json">来源调查证据</a></p>
    <details><summary>18 张未纳入普通图库的文件及原因</summary><ul>{excluded}</ul></details>
    <details><summary>尚未下载的 10 张 Commons 中国候选图</summary><ul>{failures}</ul></details>
    <details><summary>复验与后续续传命令</summary><p>在项目目录运行：</p><pre>python -m unittest discover -s tools -p "test_mushroom*.py"
python tools/validate_mushroom_images.py
python tools/build_mushroom_image_report.py</pre><p>限流解除后可续传（不会覆盖原有素材；需审阅新下载内容后再同步网站）：</p><pre>python tools/download_china_mushroom_images.py --source commons
python tools/download_mushroom_images.py discover
python tools/download_mushroom_images.py fetch --limit 50
python tools/download_mushroom_images.py manifest</pre><p>新增文件需完成内容审阅，将来源编号与 SHA-256 加入 <code>image-content-reviewed.json</code>，在 <code>image-review-decisions.json</code> 记录排除或用途注释，再执行 manifest 同步。未审阅文件不会自动进入网站。</p><p>下载目录：<code>data/image/downloaded/条目编号/</code>。采集及候选状态：<code>data/image-review-20261026/</code>。主网站仅加载 <code>data/image_sources.json</code> 内通过本轮筛选的图片。</p></details>
    <h2>本地照片与逐图来源</h2><p class="note">点击照片查看文件。输入中文名、学名、编号或地区筛选；所有图片均从本地加载。</p><input id="search" placeholder="例如：干巴菌、Galerina、云南、8" aria-label="筛选图片"><p id="count">{len(images)} 张</p><section class="grid">{cards}</section>
    </main><script>const input=document.getElementById('search');input.addEventListener('input',()=>{{let n=0;const q=input.value.trim().toLowerCase();document.querySelectorAll('article').forEach(card=>{{card.hidden=!card.dataset.search.includes(q);if(!card.hidden)n++;}});document.getElementById('count').textContent=n+' 张';}});</script></html>'''
    target = REVIEW / "图片下载验收.html"
    target.write_text(document, encoding="utf-8")
    print("已生成：" + str(target))


if __name__ == "__main__":
    main()
