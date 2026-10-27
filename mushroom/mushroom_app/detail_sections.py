"""将既有CSV字段组织为阅读分组，保留未知字段，不改变资料内容。"""

DETAIL_GROUPS = (
    ("basic", "基本资料", True, ("拉丁名", "规范中文名", "记录类型", "科名", "分类与异名说明", "关联编号")),
    ("habitat", "生境与识别", True, ("生长环境", "中国记录与分布", "识别特征", "近似种与鉴别局限", "红色名录评估（2018）")),
    ("risk", "毒性与用途", True, ("是否有毒性", "是否可食用", "食用价值", "其他价值", "文献食药用途（2026）")),
    ("price", "参考行情", False, ("参考价格", "价格地区", "价格日期", "价格商品与口径", "价格来源")),
    ("sources", "来源与核查", False, ("资料来源", "来源定位", "字段核查状态", "核查日期", "图片核查状态")),
)


def build_detail_sections(fields: list[dict[str, str]]) -> list[dict]:
    """按已知字段分组，每个原字段只归属一组；新列进入其他资料。"""
    by_label = {field["label"]: field for field in fields}
    sections = []
    used = set()
    for key, title, expanded, labels in DETAIL_GROUPS:
        items = [by_label[label] for label in labels if label in by_label]
        if items:
            sections.append({"id": key, "title": title, "expanded": expanded, "fields": items})
            used.update(field["label"] for field in items)
    remaining = [field for field in fields if field["label"] not in used]
    if remaining:
        sections.append({"id": "other", "title": "其他资料", "expanded": True, "fields": remaining})
    return sections
