# 四档连消人声配音

2026-10-26。上一版四档称赞仅播放 `combo_praise` 木铃，未提供人声。本轮生成四条独立英语配音，使用同一轻快女声 Pip；实际连消和开发预览均按词播放。

| 提示 | 资源 | 音频 ID | 时长 |
| --- | --- | ---: | ---: |
| Great! | `assets/resources/sound/combo_great.mp3` | 120 | 1.120 秒 |
| Awesome! | `assets/resources/sound/combo_awesome.mp3` | 121 | 1.920 秒 |
| Fantastic! | `assets/resources/sound/combo_fantastic.mp3` | 122 | 1.744 秒 |
| Blossom! | `assets/resources/sound/combo_blossom.mp3` | 123 | 1.164 秒 |

## 接入行为

- `ComboFeedback.voiceFor()` 是词与声音的统一映射，局内和“连消预览”共用。
- 四条人声受设置中的“音效”开关控制；“音乐”开关只控制 BGM。
- `AudioCtrl` 使用独立的人声请求序号和播放句柄，新词停止上一句，旧加载回调不再插播；音效关闭、切换场景或服务注销时会停止称赞人声。
- 普通消除音效可以与称赞并行。旧 `ComboPraise = 119` 保留兼容，四档称赞入口不再调用它。
- 本轮不修改美术、关卡规则、阈值或背景音乐。

## 生成与音频处理

[generation-record.json](generation-record.json) 保存逐条文本、声线、速度和生成任务 ID；`originals/` 保留生成原文件。

运行 `python tools/prepare-combo-voices.py` 可从原文件重复产出运行时 MP3。脚本复用现有音频解码、空白裁剪、微淡化和测量函数，以 -16 LUFS 为目标、-2 dBTP 为峰值上限，输出 48 kHz 立体声 192 kbps MP3。四条输出约 -16.3 LUFS，均通过解码和无满幅采样检查；具体参数和 SHA-256 见 [processing-report.json](processing-report.json)。

数值检查和代码测试不代表人工听审。声线偏好、发音听感与手机扬声器可听性仍需实际试听。游戏预览入口：主页右上角菜单 → 连消预览；先在设置中开启“音效”。
