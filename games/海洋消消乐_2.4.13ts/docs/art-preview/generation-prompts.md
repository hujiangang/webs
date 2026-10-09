# 美术生成记录

使用内置 image_gen 工具（imagegen 技能），2026-10-06。
效果稿为设计参考；游戏中的基础菌子继续使用作者已有图片。
图集为原始 RGBA PNG，直接复制进资源目录。运行时以 4 × 4 矩形区域创建 SpriteFrame；未对图片做背景抠除或重绘。

## 立体图集的最终提示词

Use case: stylized-concept. Asset type: production transparent PNG sprite atlas for a glossy casual match-3 mobile puzzle game. Make a SQUARE image with EXACTLY 4 columns and 4 rows of equal-sized square cells. 16 individual isolated objects centered precisely in each cell. Genuine transparent alpha background throughout, NO checkerboard pattern, no labels, no text, no borders, no scene, no frame around objects. Every object occupies about 72 percent of its cell width and height with generous transparent gutters; no object crosses its cell. Consistent polished rounded chunky toy plastic 3D render, vivid saturated colors, upper-left broad white highlight, shaded lower edge, very short soft contact shadow. Strong simple silhouettes readable at 48px. Row 1 left to right: purple spherical bomb with a tiny gold fuse and three tiny light dots; BLUE HORIZONTAL double-ended chunky arrow capsule (left-right shape); ORANGE VERTICAL double-ended chunky arrow capsule (up-down shape); teal comet sphere with a short thick diagonal tail. Row 2 left to right: bright rainbow spherical ball made of broad red yellow green blue curved bands; SMALL orange bomb sphere with short fuse; toy wooden mallet with blue head band and gold wood handle diagonal; two bright chunky curved arrows blue and orange rotating around two tiny colored game pieces, representing shuffle. Row 3 left to right: blue chunky solid rounded cross power piece; gold coin with simple embossed star; glossy red heart; thick gold five pointed star. Row 4 left to right: small toy shop icon with red-white awning; thick open cream book with blue cover and small mushroom emblem; simple glossy golden closed padlock; cluster of three colorful rounded red yellow green mushroom caps with cream stems for a game navigation icon. Orthographic-ish front facing, minimal perspective consistent across all. NOT flat vector, not app icon tiles. Grid positions must be exact for runtime atlas slicing.

## 文件

- `assets/resources/texture/toy-ui/toy-atlas.png`：1254 × 1254，16 项图标及特殊元素，透明通道。
- `docs/art-preview/home-and-game-concept.png`：主页与局内的概念参考图，非运行截图。

## 按钮与面板图集的最终提示词

Use case: stylized-concept. Production game UI background sprite atlas, TRUE TRANSPARENT alpha PNG, square canvas, EXACTLY 4 columns x 2 rows, eight evenly spaced equal square objects. Each object is a front-facing rounded square blank toy UI plate occupying 86% of cell width, all same dimensions. Full canvas has aspect ratio 2:1 (four squares across and two down). Isolated on transparent background with generous equal gutters, no text no glyphs no objects no numbers no texture grid. Extremely polished vibrant casual mobile puzzle game plastic style, broad curved beveled perimeter, double raised rim, soft luminous top-left highlight, visibly thick dark underside, short close shadow. Center is smooth and simple, corners have generous 22% radius. Suitable for 9-slice stretching to rectangular game buttons. Row 1 left-to-right: bright lime green plastic button with pale yellow-green outer rim and deep green bottom bevel; saturated royal blue button with ice blue reflective outer rim and dark blue underside; locked slate blue-gray button with silver-blue rim and darker bottom; warm violet-purple button with lavender rim and deep purple underside. Row 2 left-to-right: cream ivory inset panel with thick saturated blue outer rim; sky cyan blue button with silver-blue bright rim; red-orange button with golden orange rim; saturated royal blue navigation tray blank plate with pale blue rim. Eight standalone blank plates, no lettering, no symbols, no decorations in center. Consistent orthographic frontal camera. Render with rich smooth volumetric shading, broad glossy light area on upper left near the edge, not flat vector. TRUE transparency, not a baked checkerboard.

文件：`assets/resources/texture/toy-ui/surfaces.png`，1774 × 887 RGBA 原图。运行时按 4 × 2 网格取区域，并采用九宫格拉伸；没有修改原始像素。

## 概念图用途

`home-and-game-concept.png` 是生成的双屏构图参考，展示蓝色关卡主页、紫蓝局内背景、立体按钮与玩具图标。它没有作为整张背景贴进游戏，也不是运行截图；实际界面由 Cocos 节点和本目录记录的两张图集组成。概念图里的菌子只用于说明布局，项目继续使用作者已有基础元素素材。
