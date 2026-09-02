#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import math
import os
import re
import struct
import zipfile
from collections import Counter, defaultdict
from pathlib import Path
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
OUT_FILE = ROOT / "docs" / "前200关资源表.xlsx"

IMAGE_EXTS = {".png", ".jpg", ".jpeg"}


def rel(path: Path) -> str:
    return path.resolve().relative_to(ROOT).as_posix()


def norm(path: str) -> str:
    return path.replace("\\", "/")


def xml_text(value) -> str:
    if value is None:
        value = ""
    return escape(str(value), {'"': "&quot;"})


def safe_sheet_name(name: str) -> str:
    name = re.sub(r"[\[\]\:\*\?\/\\]", "_", name)
    return name[:31] or "Sheet"


def col_name(idx: int) -> str:
    name = ""
    while idx:
        idx, r = divmod(idx - 1, 26)
        name = chr(65 + r) + name
    return name


def image_size(path: Path):
    try:
        with path.open("rb") as f:
            head = f.read(32)
            if head.startswith(b"\x89PNG\r\n\x1a\n"):
                return struct.unpack(">II", head[16:24])
            if head[:2] == b"\xff\xd8":
                f.seek(2)
                while True:
                    b = f.read(1)
                    if not b:
                        break
                    if b != b"\xff":
                        continue
                    marker = f.read(1)
                    while marker == b"\xff":
                        marker = f.read(1)
                    if marker in [b"\xd8", b"\xd9"]:
                        continue
                    length_data = f.read(2)
                    if len(length_data) != 2:
                        break
                    length = struct.unpack(">H", length_data)[0]
                    if marker[0] in list(range(0xC0, 0xC4)) + list(range(0xC5, 0xC8)) + list(range(0xC9, 0xCC)) + list(range(0xCD, 0xD0)):
                        data = f.read(5)
                        if len(data) == 5:
                            h, w = struct.unpack(">HH", data[1:5])
                            return w, h
                        break
                    f.seek(length - 2, os.SEEK_CUR)
    except Exception:
        return None
    return None


def list_images(base: Path):
    if not base.exists():
        return []
    return sorted(
        p for p in base.rglob("*")
        if p.is_file() and p.suffix.lower() in IMAGE_EXTS
    )


def find_first(patterns):
    for raw in patterns:
        p = ROOT / raw
        if p.exists():
            return p
    return None


def load_json(path: Path):
    try:
        with path.open("r", encoding="utf-8-sig") as f:
            return json.load(f)
    except Exception:
        return None


def first_200_level_files():
    base = ROOT / "assets/resources/config/level/new"
    paths = []
    for i in range(1, 201):
        filename = f"{i:04d}.json"
        hits = sorted(base.glob(f"levels-*/{filename}"))
        if hits:
            paths.append(hits[0])
    return paths


def walk_level_cells(obj):
    if isinstance(obj, dict):
        yield obj
        for value in obj.values():
            yield from walk_level_cells(value)
    elif isinstance(obj, list):
        for value in obj:
            yield from walk_level_cells(value)


CELL_INFO = {
    0: ("0 Apple / 苹果", "普通可交换元素；可三消、可作为收集目标。"),
    1: ("1 Leaf / 叶子", "普通可交换元素；可三消、可作为收集目标。"),
    2: ("2 Grape / 葡萄", "普通可交换元素；可三消、可作为收集目标。"),
    3: ("3 Pear / 梨", "普通可交换元素；可三消、可作为收集目标。"),
    4: ("4 Water / 水滴", "普通可交换元素；可三消、可作为收集目标。"),
    5: ("5 Flower / 花", "普通元素，同时和花地块机制有关；可作为收集目标。"),
    6: ("6 Banana / 香蕉", "旁消类目标；通常不能靠普通三消直接消除，需要相邻消除或炸弹命中。"),
    7: ("7 IceCream / 冰淇淋", "运输收集物；随重力移动，到出口格后完成收集。"),
    8: ("8 Coconut / 椰子", "普通元素/生成物；可交换、可三消、可作为收集目标。"),
    9: ("9 BrokenConch / 破碎贝壳", "旁消障碍；相邻消除或炸弹命中后扣除生命。"),
    10: ("10 Fish / 爆炸鱼", "特殊可触发元素；被消除或命中后触发范围爆炸。"),
    11: ("11 Conch / 完整贝壳", "路径型目标；通常由女孩/角色路径机制踩掉。"),
    12: ("12 BottleCaps / 水杯", "旁消计数器；相邻消除后扣层，可影响步数或目标。"),
    13: ("13 Ground / 移动土地", "可移动地块元素；可能携带宝石，旁消后完成对应目标。"),
    100: ("100 Bomb1 / 范围炸弹", "可合成特殊元素；中心范围爆炸。菌子化建议：孢子爆弹。"),
    101: ("101 Bomb2 / 横向炸弹", "可合成特殊元素；清除整行。菌子化建议：横向菌丝。"),
    102: ("102 Bomb3 / 竖向炸弹", "可合成特殊元素；清除整列。菌子化建议：纵向菌丝。"),
    103: ("103 Bomb4 / 追踪炸弹", "可合成特殊元素；飞向目标并消除落点。菌子化建议：追踪孢子。"),
    104: ("104 Bomb5 / 彩虹炸弹", "可合成特殊元素；消除同色，组合时批量转化。菌子化建议：彩孢核心。"),
    105: ("105 Bomb6 / 螃蟹炸弹", "枚举存在，前200关内若出现需结合具体关卡实测。"),
    106: ("106 Bomb7 / 十字蛋", "枚举存在，常规合成主流程里不作为核心产物。"),
    200: ("200 Girl / 女孩", "路径型特殊对象；沿路径移动并处理贝壳等目标。"),
}


CELL_IMAGE_HINTS = {
    0: ["assets/res/texture/match3/objects/cells/obj0.png"],
    1: ["assets/res/texture/match3/objects/cells/obj1.png"],
    2: ["assets/res/texture/match3/objects/cells/obj2.png"],
    3: ["assets/res/texture/match3/objects/cells/obj3.png"],
    4: ["assets/res/texture/match3/objects/cells/obj4.png"],
    5: ["assets/res/texture/match3/objects/cells/obj5.png", "assets/res/texture/match3/objects/cells/pearl.png"],
    6: ["assets/res/texture/match3/objects/cells/obj6.png", "assets/res/texture/match3/objects/cells/img_banana.png"],
    7: ["assets/res/texture/match3/objects/cells/obj7.png"],
    8: ["assets/res/texture/match3/objects/cells/obj8.png"],
    9: ["assets/res/texture/match3/objects/cells/obj9.png"],
    10: ["assets/res/texture/match3/objects/cells/obj10.png", "assets/res/texture/match3/objects/fishBomb/baozhayu.png"],
    11: ["assets/res/texture/match3/objects/cells/obj11.png", "assets/res/texture/match3/objects/conch/beikebaobei.png"],
    12: ["assets/res/texture/match3/objects/cells/obj12.png"],
    13: ["assets/res/texture/match3/objects/cells/obj13.png"],
    100: ["assets/res/texture/match3/objects/cells/obj100.png", "assets/res/texture/match3/objects/bomb/beike_xiuxian.png"],
    101: ["assets/res/texture/match3/objects/cells/obj101.png", "assets/res/texture/match3/objects/hengshu/hengsudan_xiuxian.png"],
    102: ["assets/res/texture/match3/objects/cells/obj101.png", "assets/res/texture/match3/objects/hengshu/hengsudan_xiuxian.png"],
    103: ["assets/res/texture/match3/objects/cells/obj103.png", "assets/res/texture/match3/objects/octopus/zhangyu.png"],
    104: ["assets/res/texture/match3/objects/cells/obj104.png", "assets/res/texture/match3/objects/caihong/anim_haima.png"],
    200: ["assets/res/texture/match3/objects/gril/meirenyu_01.png"],
}


OBSTACLE_ROWS = [
    ("木箱 Lv1", "box_level=1；覆盖障碍，旁边消除或炸弹命中扣层。", "assets/res/texture/match3/objects/cells/box/box0_1.png", "box_level / box_type"),
    ("木箱 Lv2", "box_level=2；覆盖障碍，多层扣除。", "assets/res/texture/match3/objects/cells/box/box0_2.png", "box_level"),
    ("木箱 Lv3", "box_level=3；覆盖障碍，多层扣除。", "assets/res/texture/match3/objects/cells/box/box0_3.png", "box_level"),
    ("彩色木箱", "box_type 指定颜色后，需要对应颜色旁消。", "assets/res/texture/match3/objects/cells/box/fullbox1.png", "box_type / colorbox"),
    ("锁链 Lv1", "locks=1；锁住基础元素，消除覆盖元素或炸弹命中扣层。", "assets/res/texture/match3/objects/cells/chain1.png", "locks"),
    ("锁链 Lv2", "locks=2；更高层锁链。", "assets/res/texture/match3/objects/cells/chain2.png", "locks"),
    ("冰块 Lv1", "ice=1；覆盖基础元素，跟随绑定元素移动。", "assets/res/texture/match3/objects/cells/ice_lvl_1.png", "ice"),
    ("冰块 Lv2", "ice=2；更高层冰块。", "assets/res/texture/match3/objects/cells/ice_lvl_2.png", "ice"),
    ("石头 Lv1", "stone=1；阻挡型障碍，命中后扣层。", "assets/res/texture/match3/objects/cells/stone1.png", "stone"),
    ("石头 Lv2", "stone=2；阻挡型障碍，命中后扣层。", "assets/res/texture/match3/objects/cells/stone2.png", "stone"),
    ("石头 Lv3", "stone=3；阻挡型障碍，命中后扣层。", "assets/res/texture/match3/objects/cells/stone3.png", "stone"),
    ("叶子 Lv1", "leaves=1；底层地块，可扣层。", "assets/res/texture/match3/objects/cells/leaves1.png", "leaves"),
    ("叶子 Lv2", "leaves=2；底层地块，可扣层。", "assets/res/texture/match3/objects/cells/leaves2.png", "leaves"),
    ("叶子 Lv3", "leaves=3；底层地块，可扣层。", "assets/res/texture/match3/objects/cells/leaves3.png", "leaves"),
    ("花 Lv1", "flowers=1；底层花机制。", "assets/res/texture/match3/objects/cells/flowers1.png", "flowers"),
    ("花 Lv2", "flowers=2；底层花机制。", "assets/res/texture/match3/objects/cells/flowers2.png", "flowers"),
    ("花 Lv3", "flowers=3；底层花机制。", "assets/res/texture/match3/objects/cells/flowers3.png", "flowers"),
    ("蘑菇 Lv1", "mushroom=1；固定阻挡地块，旁消/炸弹扣层。", "assets/res/texture/match3/objects/cells/mushroom0.png", "mushroom"),
    ("蘑菇 Lv2", "mushroom=2；固定阻挡地块，旁消/炸弹扣层。", "assets/res/texture/match3/objects/cells/mushroom1.png", "mushroom"),
    ("宝石", "gem；通常和可移动土地配合，清除后收集。", "assets/res/texture/match3/objects/cells/gem.png", "gem"),
    ("水草/藤蔓", "ivy；固定阻挡或多格目标组成部分。", "assets/res/texture/match3/objects/cells/haicao.png", "ivy"),
    ("传送入口", "portal_idx 为负数时常作为入口。", "assets/res/texture/match3/objects/cells/portalUp.png", "portal_idx"),
    ("传送出口", "portal_idx 为正数时常作为出口。", "assets/res/texture/match3/objects/cells/portalDown.png", "portal_idx"),
    ("出口", "exit；运输收集物到达后完成收集。", "assets/res/texture/match3/objects/cells/overtw.png", "exit"),
    ("隐藏目标", "gnome；多格/隐藏目标，前200关若配置会统计。", "assets/res/texture/match3/objects/cells/objgnome.png", "gnome"),
    ("螃蟹目标", "crab；多格目标。", "assets/res/texture/match3/objects/cells/objcrab.png", "crab"),
    ("乌龟目标", "turtles；多格目标。", "assets/res/texture/match3/objects/cells/turtles.png", "turtles"),
    ("树目标", "tree / monkeyTree；生成或多格机制。", "assets/res/texture/match3/objects/cells/tree.png", "tree / monkeyTree"),
]


def collect_level_usage():
    cell_counts = Counter()
    field_counts = Counter()
    collect_counts = Counter()
    level_sets = defaultdict(set)
    backgrounds = Counter()
    files = first_200_level_files()

    for path in files:
        level_no = int(path.stem)
        data = load_json(path)
        if not isinstance(data, dict):
            continue
        bg = data.get("background") or data.get("bg") or data.get("levelInfo", {}).get("background")
        if bg is not None:
            backgrounds[str(bg)] += 1

        for item in data.get("collect", []) or []:
            if isinstance(item, dict):
                t = item.get("type")
                collect_counts[str(t)] += int(item.get("count") or item.get("num") or 1)
                level_sets[f"collect:{t}"].add(level_no)

        for item in data.get("chipset", []) or []:
            if isinstance(item, dict) and "type" in item:
                level_sets[f"chipset:{item['type']}"].add(level_no)

        for cell in walk_level_cells(data):
            if "type" in cell and isinstance(cell.get("type"), int):
                t = cell["type"]
                cell_counts[t] += 1
                level_sets[f"cell:{t}"].add(level_no)
            for key in [
                "box_level", "box_type", "ice", "locks", "stone", "leaves", "flowers",
                "firefly", "water", "ground", "gem", "mushroom", "exit", "born",
                "portal_idx", "ivy", "gnome", "crab", "turtles", "tree", "monkeyTree",
                "lawnmower", "conveyerList", "girl",
            ]:
                if key in cell and cell.get(key) not in [None, False, 0, ""]:
                    field_counts[key] += 1
                    level_sets[f"field:{key}"].add(level_no)

    return files, cell_counts, field_counts, collect_counts, level_sets, backgrounds


def dim_text(path: Path | None) -> str:
    if not path or not path.exists():
        return ""
    size = image_size(path)
    if not size:
        return ""
    return f"{size[0]} x {size[1]} px"


def make_image_row(name, usage, image_path, purpose="", level_note=""):
    p = ROOT / image_path if isinstance(image_path, str) else image_path
    if not p.exists():
        return None
    return {
        "元素类型": name,
        "元素作用": usage,
        "图片缩略图（可点开看标准图）": p,
        "尺寸": dim_text(p),
        "所在路径": rel(p),
        "用途": purpose,
        "前200关使用": level_note,
    }


def path_from_resources(config_path: str):
    if not config_path:
        return None
    normalized = norm(str(config_path)).strip()
    normalized = re.sub(r"\.(png|jpg|jpeg|prefab|json)$", "", normalized, flags=re.I)
    for ext in [".png", ".jpg", ".jpeg", ".prefab"]:
        p = ROOT / "assets" / "resources" / f"{normalized}{ext}"
        if p.exists():
            return p
    return None


def make_skin_row(theme, config_key, usage, config_path, purpose):
    p = path_from_resources(config_path)
    return {
        "主题": theme,
        "配置字段": config_key,
        "资源作用": usage,
        "图片缩略图（可点开看标准图）": p if p and p.suffix.lower() in IMAGE_EXTS else "",
        "尺寸": dim_text(p),
        "配置路径": config_path or "",
        "实际文件路径": rel(p) if p else "",
        "用途": purpose,
    }


def build_skin_rows():
    config_path = ROOT / "assets/resources/config/match3_skin/default.json"
    config = load_json(config_path) or {}
    rows = []
    theme_names = {
        "water": "水主题",
        "grass": "草地主题",
        "sand": "沙滩主题",
    }
    complex_keys = [
        "0001", "0010", "0011", "0100", "0101", "0110", "0111",
        "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111",
    ]

    prefabs_cfg = config.get("prefabs") or {}
    prefab_usages = {
        "gridBoard": ("主玩法棋盘根节点 prefab。", "主棋盘prefab"),
        "groundBase": ("格子底板/底图节点 prefab。", "棋盘底板prefab"),
        "groundItem": ("地块主 item prefab。", "棋盘地块prefab"),
        "cellItem": ("普通元素 prefab。", "基础元素prefab"),
        "upGroundItem": ("上层覆盖物 prefab。", "上层障碍prefab"),
        "gnome": ("蘑菇/收集角色 prefab。", "收集物prefab"),
        "turtles": ("乌龟收集物 prefab。", "收集物prefab"),
        "crab": ("螃蟹收集物 prefab。", "收集物prefab"),
        "monkeyTree": ("猴子树 prefab。", "收集物prefab"),
        "gem": ("宝石收集 prefab。", "收集物prefab"),
        "firefly": ("萤火虫收集 prefab。", "收集物prefab"),
        "wall": ("墙体 prefab。", "障碍prefab"),
        "tuituji": ("推土机/除草机 prefab。", "障碍prefab"),
        "ivy": ("藤蔓/水草 prefab。", "障碍prefab"),
        "exit": ("出口 prefab。", "障碍prefab"),
        "shanhuAni": ("珊瑚/蘑菇消除动画 prefab。", "消除动画prefab"),
        "portal": ("传送门 prefab。", "障碍prefab"),
    }
    for key, (usage, purpose) in prefab_usages.items():
        value = prefabs_cfg.get(key, "")
        if key == "novice":
            continue
        rows.append(make_skin_row("prefabs", f"prefabs.{key}", usage, value, purpose))

    novice_list = prefabs_cfg.get("novice") or []
    if isinstance(novice_list, str):
        novice_list = [novice_list]
    if not novice_list:
        rows.append(make_skin_row("prefabs", "prefabs.novice", "新手引导节点数组；通常保留两项。", "", "引导prefab"))
    for idx, value in enumerate(novice_list):
        rows.append(make_skin_row("prefabs", f"prefabs.novice[{idx}]", "新手引导节点数组。", value, "引导prefab"))

    for theme, theme_cfg in (config.get("themes") or {}).items():
        theme_label = f"{theme} / {theme_names.get(theme, theme)}"
        cell_base = theme_cfg.get("cellBase") or []
        if isinstance(cell_base, str):
            cell_base = [cell_base]
        if not cell_base:
            rows.append(make_skin_row(theme_label, "cellBase", "格子底图；为空时使用 prefab 默认底图。", "", "棋盘格子底图"))
        for idx, path in enumerate(cell_base):
            rows.append(make_skin_row(theme_label, f"cellBase[{idx}]", "格子底图；多张时按格子坐标交替显示。", path, "棋盘格子底图"))

        for key in ["0001", "0011", "0101", "0110", "0111"]:
            rows.append(make_skin_row(
                theme_label,
                f"upBorders.{key}",
                f"棋盘外圈上层边框，形状 key={key}。",
                (theme_cfg.get("upBorders") or {}).get(key, ""),
                "棋盘边框图",
            ))

        for key in ["0100", "1000", "1100"]:
            rows.append(make_skin_row(
                theme_label,
                f"middleBorders.{key}",
                f"棋盘内侧衔接边框，形状 key={key}。",
                (theme_cfg.get("middleBorders") or {}).get(key, ""),
                "棋盘内侧边框图",
            ))

        complex_ground = theme_cfg.get("complexGround") or {}
        if not complex_ground:
            rows.append(make_skin_row(theme_label, "complexGround", "复杂拼接地块；当前主题未配置则继续使用默认资源或无拼接图。", "", "复杂地块拼接图"))
        for key in complex_keys:
            if key in complex_ground:
                rows.append(make_skin_row(
                    theme_label,
                    f"complexGround.{key}",
                    f"复杂拼接地块，四格拼接状态 key={key}。",
                    complex_ground.get(key, ""),
                    "复杂地块拼接图",
                ))

    ground_cfg = config.get("ground") or {}
    ground_usages = {
        "lotusleaf": ("荷叶图；传送带/流水格上的装饰图。", "地块挂饰图"),
        "girlRoad": ("女孩路径底图。", "路径地块图"),
    }
    for key, (usage, purpose) in ground_usages.items():
        rows.append(make_skin_row("通用地块", f"ground.{key}", usage, ground_cfg.get(key, ""), purpose))

    return rows


def build_rows():
    files, cell_counts, field_counts, collect_counts, level_sets, backgrounds = collect_level_usage()

    element_rows = []
    for t in sorted(CELL_INFO):
        name, usage = CELL_INFO[t]
        p = find_first(CELL_IMAGE_HINTS.get(t, []))
        if not p:
            continue
        level_note = ""
        levels = level_sets.get(f"cell:{t}", set())
        if levels:
            level_note = f"格子出现 {cell_counts[t]} 次，涉及 {len(levels)} 关"
        collect_key = str(t)
        if collect_key in collect_counts:
            extra = f"目标需求合计 {collect_counts[collect_key]}"
            level_note = f"{level_note}；{extra}" if level_note else extra
        element_rows.append(make_image_row(name, usage, p, "基础元素/特殊元素", level_note))

    obstacle_rows = []
    for name, usage, path, field_key in OBSTACLE_ROWS:
        p = ROOT / path
        note_parts = []
        for key in field_key.replace("/", " ").split():
            key = key.strip()
            if key in field_counts:
                note_parts.append(f"{key} 出现 {field_counts[key]} 次，涉及 {len(level_sets.get('field:' + key, set()))} 关")
        obstacle_rows.append(make_image_row(name, usage, p, field_key, "；".join(note_parts)))

    startup_candidates = [
        ("启动/Loading 背景", "LoadingScene 使用的主背景。", "assets/res/texture/common/bg_laoding.png", "启动背景"),
        ("Loading 插图 1", "Loading/过场界面插图。", "assets/res/texture/match3/ui/img/gameOver/loading_img_1.png", "Loading界面"),
        ("Loading 插图 2", "Loading/过场界面插图。", "assets/res/texture/match3/ui/img/gameOver/loading_img_2.png", "Loading界面"),
        ("Loading 进度条底", "Loading 进度条背景。", "assets/res/texture/match3/ui/img/gameOver/loading_bar_1.png", "Loading界面"),
        ("Loading 进度条填充", "Loading 进度条填充。", "assets/res/texture/match3/ui/img/gameOver/loading_bar_1-1.png", "Loading界面"),
        ("结果/Loading 通用大背景", "结算或 Loading 全屏背景。", "assets/res/texture/match3/ui/img/gameOver/full_bg.jpg", "全屏背景"),
    ]
    startup_rows = [make_image_row(*row) for row in startup_candidates]

    scene_bg_rows = []
    bg_base = ROOT / "assets/resources/texture/match3/bg"
    bg_names = {"1": "海洋/水面背景", "2": "森林/草地背景", "3": "沙滩背景"}
    for bg_dir in sorted([p for p in bg_base.iterdir() if p.is_dir()], key=lambda p: p.name):
        main = bg_dir / "bg.png"
        if main.exists():
            count = backgrounds.get(bg_dir.name, 0)
            note = f"前200关配置 background={bg_dir.name} 的关卡数：{count}" if count else ""
            scene_bg_rows.append(make_image_row(bg_names.get(bg_dir.name, f"背景 {bg_dir.name}"), "Match3 场景主背景。", main, "场景背景", note))
        for atlas_png in sorted(bg_dir.glob("*/*.png")):
            label = f"{bg_names.get(bg_dir.name, bg_dir.name)} / {atlas_png.parent.name}"
            scene_bg_rows.append(make_image_row(label, "Spine/Prefab 背景图集；用于该背景的动态层或装饰层。", atlas_png, "场景背景图集", ""))

    decor_rows = []
    for img in list_images(bg_base):
        if img.name == "bg.png" or img.parent.name in {"sea", "ship", "senlin", "shatan"}:
            continue
        purpose = "场景挂饰图/分层背景"
        usage = "背景中的独立图层或装饰件，可能由 prefab 或 ext.json 控制位置。"
        decor_rows.append(make_image_row(rel(img.parent), usage, img, purpose, ""))

    ui_rows = []
    ui_bases = [
        ROOT / "assets/res/texture/match3/ui/hall",
        ROOT / "assets/res/texture/match3/ui/img",
        ROOT / "assets/res/texture/common",
        ROOT / "assets/res/texture/common/prop",
    ]
    for base in ui_bases:
        for img in list_images(base):
            # Keep the workbook focused and avoid embedding huge one-off screenshots.
            if img.stat().st_size > 800_000:
                continue
            lowered = img.as_posix().lower()
            if any(token in lowered for token in ["gameover/loading", "gameover/full_bg"]):
                continue
            if "talkicons" in lowered:
                continue
            name = img.stem
            usage = "局内 UI、弹窗、按钮、道具或字体图。"
            if "prop" in lowered:
                usage = "玩家道具图标或道具状态图。"
            elif "hall" in lowered:
                usage = "Match3 主玩法顶部栏、目标栏、步数、分数或暂停菜单 UI。"
            ui_rows.append(make_image_row(name, usage, img, "局内UI/通用UI", ""))

    stat_rows = []
    for t, count in sorted(cell_counts.items(), key=lambda x: (str(x[0]))):
        name = CELL_INFO.get(t, (f"{t}", ""))[0]
        stat_rows.append({
            "类型": f"CellType {name}",
            "出现次数": count,
            "涉及关卡数": len(level_sets.get(f"cell:{t}", set())),
            "说明": "基础元素/特殊元素在前200关地图中的配置次数。",
        })
    for key, count in sorted(field_counts.items()):
        stat_rows.append({
            "类型": f"字段 {key}",
            "出现次数": count,
            "涉及关卡数": len(level_sets.get(f"field:{key}", set())),
            "说明": "障碍/地块字段在前200关配置中的出现次数。",
        })
    for t, count in sorted(collect_counts.items(), key=lambda x: str(x[0])):
        stat_rows.append({
            "类型": f"目标 collect {t}",
            "出现次数": count,
            "涉及关卡数": len(level_sets.get(f"collect:{t}", set())),
            "说明": "前200关目标需求数量合计。",
        })
    for bg, count in sorted(backgrounds.items()):
        stat_rows.append({
            "类型": f"background {bg}",
            "出现次数": count,
            "涉及关卡数": count,
            "说明": "前200关使用的场景背景编号。",
        })
    stat_rows.insert(0, {
        "类型": "统计范围",
        "出现次数": len(files),
        "涉及关卡数": len(files),
        "说明": "扫描路径 assets/resources/config/level/new/，关卡 0001.json 到 0200.json。",
    })

    return [
        ("元素", ["元素类型", "元素作用", "图片缩略图（可点开看标准图）", "尺寸", "所在路径", "用途", "前200关使用"], element_rows),
        ("棋盘皮肤配置", ["主题", "配置字段", "资源作用", "图片缩略图（可点开看标准图）", "尺寸", "配置路径", "实际文件路径", "用途"], build_skin_rows()),
        ("障碍与地块", ["元素类型", "元素作用", "图片缩略图（可点开看标准图）", "尺寸", "所在路径", "用途", "前200关使用"], obstacle_rows),
        ("启动与Loading", ["元素类型", "元素作用", "图片缩略图（可点开看标准图）", "尺寸", "所在路径", "用途"], startup_rows),
        ("场景背景", ["元素类型", "元素作用", "图片缩略图（可点开看标准图）", "尺寸", "所在路径", "用途", "前200关使用"], scene_bg_rows),
        ("场景挂饰图", ["元素类型", "元素作用", "图片缩略图（可点开看标准图）", "尺寸", "所在路径", "用途"], decor_rows),
        ("局内UI", ["元素类型", "元素作用", "图片缩略图（可点开看标准图）", "尺寸", "所在路径", "用途"], ui_rows),
        ("前200关使用统计", ["类型", "出现次数", "涉及关卡数", "说明"], stat_rows),
    ]


def cell_xml(ref, value, style=0):
    style_attr = f' s="{style}"' if style else ""
    if value is None or value == "":
        return f'<c r="{ref}"{style_attr}/>'
    return f'<c r="{ref}" t="inlineStr"{style_attr}><is><t>{xml_text(value)}</t></is></c>'


def make_sheet_xml(headers, rows, sheet_index, image_column_name):
    image_col_idx = headers.index(image_column_name) + 1 if image_column_name in headers else None
    row_height = 66
    parts = [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">',
        '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>',
        '<cols>',
    ]
    for i, header in enumerate(headers, 1):
        width = 18
        if "作用" in header or "说明" in header:
            width = 42
        elif "图片" in header:
            width = 16
        elif "路径" in header:
            width = 58
        elif "用途" in header:
            width = 22
        elif "类型" in header:
            width = 24
        parts.append(f'<col min="{i}" max="{i}" width="{width}" customWidth="1"/>')
    parts.append('</cols><sheetData>')
    parts.append('<row r="1" ht="24" customHeight="1">')
    for i, header in enumerate(headers, 1):
        parts.append(cell_xml(f"{col_name(i)}1", header, 1))
    parts.append('</row>')

    hyperlinks = []
    image_entries = []
    rel_id = 2 if image_col_idx else 1
    for r_idx, row in enumerate(rows, 2):
        height = row_height if image_col_idx else 20
        parts.append(f'<row r="{r_idx}" ht="{height}" customHeight="1">')
        for c_idx, header in enumerate(headers, 1):
            value = row.get(header, "")
            if isinstance(value, Path):
                value = ""
            style = 2 if "路径" in header and row.get(header) else 0
            parts.append(cell_xml(f"{col_name(c_idx)}{r_idx}", value, style))
            if "路径" in header and row.get(header):
                target = "file:///" + str((ROOT / row[header]).resolve()).replace("\\", "/")
                hyperlinks.append((f"{col_name(c_idx)}{r_idx}", f"rId{rel_id}", target))
                rel_id += 1
        parts.append('</row>')

        if image_col_idx:
            img = row.get(image_column_name)
            if isinstance(img, Path) and img.exists():
                image_entries.append((r_idx, image_col_idx, img))

    parts.append('</sheetData>')
    if hyperlinks:
        parts.append('<hyperlinks>')
        for ref, rid, _target in hyperlinks:
            parts.append(f'<hyperlink ref="{ref}" r:id="{rid}"/>')
        parts.append('</hyperlinks>')
    if image_entries:
        parts.append(f'<drawing r:id="rId1"/>')
    parts.append('<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>')
    parts.append('</worksheet>')

    rels = []
    if image_entries:
        rels.append(('rId1', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing', f'../drawings/drawing{sheet_index}.xml', None))
    for _ref, rid, target in hyperlinks:
        rels.append((rid, 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink', target, 'External'))
    return "".join(parts), rels, image_entries


def make_drawing_xml(image_entries, media_rel_pairs):
    anchors = [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" '
        'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">',
    ]
    for idx, ((row, col, img), (image_rid, hyperlink_rid)) in enumerate(zip(image_entries, media_rel_pairs), 1):
        size = image_size(img) or (64, 64)
        max_px = 58
        scale = min(max_px / size[0], max_px / size[1], 1)
        w = max(1, int(size[0] * scale))
        h = max(1, int(size[1] * scale))
        cx = w * 9525
        cy = h * 9525
        col_zero = col - 1
        row_zero = row - 1
        x_off = 8 * 9525
        y_off = 4 * 9525
        anchors.append(
            f'<xdr:oneCellAnchor>'
            f'<xdr:from><xdr:col>{col_zero}</xdr:col><xdr:colOff>{x_off}</xdr:colOff>'
            f'<xdr:row>{row_zero}</xdr:row><xdr:rowOff>{y_off}</xdr:rowOff></xdr:from>'
            f'<xdr:ext cx="{cx}" cy="{cy}"/>'
            f'<xdr:pic>'
            f'<xdr:nvPicPr><xdr:cNvPr id="{idx}" name="Picture {idx}" descr="{xml_text(rel(img))}">'
            f'<a:hlinkClick r:id="{hyperlink_rid}" tooltip="{xml_text(rel(img))}"/></xdr:cNvPr>'
            f'<xdr:cNvPicPr><a:picLocks noChangeAspect="1"/></xdr:cNvPicPr></xdr:nvPicPr>'
            f'<xdr:blipFill><a:blip r:embed="{image_rid}"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill>'
            f'<xdr:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
            f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr>'
            f'</xdr:pic><xdr:clientData/></xdr:oneCellAnchor>'
        )
    anchors.append('</xdr:wsDr>')
    return "".join(anchors)


def rels_xml(rels):
    parts = [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
    ]
    for rid, typ, target, mode in rels:
        mode_attr = f' TargetMode="{mode}"' if mode else ""
        parts.append(f'<Relationship Id="{rid}" Type="{typ}" Target="{xml_text(target)}"{mode_attr}/>')
    parts.append('</Relationships>')
    return "".join(parts)


def write_workbook(sheets):
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    media_files = []
    sheet_payloads = []
    for idx, (name, headers, rows) in enumerate(sheets, 1):
        rows = [r for r in rows if r]
        sheet_xml, sheet_rels, image_entries = make_sheet_xml(headers, rows, idx, "图片缩略图（可点开看标准图）")
        drawing_xml = None
        drawing_rels = []
        if image_entries:
            media_rel_pairs = []
            for image_entry in image_entries:
                img = image_entry[2]
                media_files.append(img)
                media_idx = len(media_files)
                media_name = f"image{media_idx}{img.suffix.lower()}"
                image_rid = f"rId{len(drawing_rels) + 1}"
                drawing_rels.append((image_rid, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", f"../media/{media_name}", None))
                hyperlink_rid = f"rId{len(drawing_rels) + 1}"
                target = "file:///" + str(img.resolve()).replace("\\", "/")
                drawing_rels.append((hyperlink_rid, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", target, "External"))
                media_rel_pairs.append((image_rid, hyperlink_rid))
            drawing_xml = make_drawing_xml(image_entries, media_rel_pairs)
        sheet_payloads.append((idx, safe_sheet_name(name), sheet_xml, sheet_rels, drawing_xml, drawing_rels))

    overrides = [
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
    ]
    for idx, _name, *_ in sheet_payloads:
        overrides.append(f'<Override PartName="/xl/worksheets/sheet{idx}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>')
    for idx, _name, _sheet_xml, _sheet_rels, drawing_xml, _drawing_rels in sheet_payloads:
        if drawing_xml:
            overrides.append(f'<Override PartName="/xl/drawings/drawing{idx}.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>')

    content_types = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Default Extension="png" ContentType="image/png"/>'
        '<Default Extension="jpg" ContentType="image/jpeg"/>'
        '<Default Extension="jpeg" ContentType="image/jpeg"/>'
        + "".join(overrides) +
        '</Types>'
    )

    workbook_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<sheets>'
        + "".join(
            f'<sheet name="{xml_text(name)}" sheetId="{idx}" r:id="rId{idx}"/>'
            for idx, name, *_ in sheet_payloads
        )
        + '</sheets></workbook>'
    )
    workbook_rels = [
        (f"rId{idx}", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", f"worksheets/sheet{idx}.xml", None)
        for idx, _name, *_ in sheet_payloads
    ]
    workbook_rels.append((f"rId{len(sheet_payloads) + 1}", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", "styles.xml", None))

    styles = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<fonts count="3"><font><sz val="11"/><name val="Calibri"/></font>'
        '<font><b/><sz val="11"/><name val="Calibri"/></font>'
        '<font><u/><color rgb="FF0563C1"/><sz val="11"/><name val="Calibri"/></font></fonts>'
        '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>'
        '<fill><patternFill patternType="solid"><fgColor rgb="FFD9EAF7"/><bgColor indexed="64"/></patternFill></fill></fills>'
        '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        '<cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFill="1" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf></cellXfs>'
        '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
        '</styleSheet>'
    )

    root_rels = rels_xml([
        ("rId1", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "xl/workbook.xml", None)
    ])

    with zipfile.ZipFile(OUT_FILE, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types)
        z.writestr("_rels/.rels", root_rels)
        z.writestr("xl/workbook.xml", workbook_xml)
        z.writestr("xl/_rels/workbook.xml.rels", rels_xml(workbook_rels))
        z.writestr("xl/styles.xml", styles)
        media_idx = 0
        for idx, _name, sheet_xml, sheet_rels, drawing_xml, drawing_rels in sheet_payloads:
            z.writestr(f"xl/worksheets/sheet{idx}.xml", sheet_xml)
            if sheet_rels:
                z.writestr(f"xl/worksheets/_rels/sheet{idx}.xml.rels", rels_xml(sheet_rels))
            if drawing_xml:
                z.writestr(f"xl/drawings/drawing{idx}.xml", drawing_xml)
                z.writestr(f"xl/drawings/_rels/drawing{idx}.xml.rels", rels_xml(drawing_rels))
                for _rid, typ, target, _mode in drawing_rels:
                    if not typ.endswith("/image"):
                        continue
                    media_idx += 1
                    src = media_files[media_idx - 1]
                    media_name = Path(target).name
                    z.write(src, f"xl/media/{media_name}")


def main():
    sheets = build_rows()
    write_workbook(sheets)
    with zipfile.ZipFile(OUT_FILE, "r") as z:
        bad = z.testzip()
        image_count = len([name for name in z.namelist() if name.startswith("xl/media/")])
        sheet_count = len([name for name in z.namelist() if name.startswith("xl/worksheets/sheet") and name.endswith(".xml")])
    if bad:
        raise RuntimeError(f"XLSX zip contains a bad file: {bad}")
    print(f"created: {OUT_FILE}")
    print(f"sheets: {sheet_count}")
    print(f"embedded images: {image_count}")
    print(f"size: {OUT_FILE.stat().st_size} bytes")


if __name__ == "__main__":
    main()
