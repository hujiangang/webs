# 进入关卡音效 entry-v1

2026-10-26，按“进游戏的音效也重新生成、替换”制作。以清晰、短促、上扬的木琴提示为设计方向，与现有林间配乐搭配。

## 已接入的资源

| 文件 | 使用位置 | 解码时长 | integrated LUFS | true peak |
| --- | --- | --- | --- | --- |
| `dlg_gamestart.mp3` | 正常主页进入关卡、关卡目标面板出现 | 2.000 秒 | −18.27 | −9.04 dBTP |
| `start_game.mp3` | 旧版选关目标面板的开始按钮 | 1.200 秒 | −18.29 | −4.82 dBTP |

当前正常入口：`HomeScene.startGame → MainCtrl.showTargetView → MainUiCtrl.showTargetDialog → DialogPanel.onOpen → AudioID.GameShowTarget (106)`，由 `AudioCtrl` 加载 `sound/dlg_gamestart`。主页点击本身不新增音效事件，避免同一次进关叠加两个提示。

旧入口 `DialogPanel.onStartGame` 仍使用 `AudioID.StartGame (115)`，因此一起更新 `sound/start_game`。本轮没有调整播放逻辑，仍受现有“音效”开关控制。

## 生成与处理

- 最终原文件在 `originals/`，生成参数和任务编号在 [generation-record-v2.json](generation-record-v2.json)。主提示要求三个上扬木琴音及自然尾音，短确认要求两个上扬木琴音；这些是设计提示词，不代表已逐音人工听审。
- 首批候选保留于 `rejected-first-pass/`，参数在 [generation-record.json](generation-record.json)。短确认音接近静音，主提示峰均差过大，均未写入运行时；第二批通过数值检查后才发布。
- 可重复处理：在项目根目录运行 `python tools/prepare-entry-audio.py`。依赖 FFmpeg 与 NumPy，复用 `prepare-woodland-audio.py` 的解码、边界处理和测量函数。
- 保留首尾短余量，添加 3 毫秒淡入和 10 毫秒淡出；48 kHz、双声道、192 kbps MP3。恒定增益目标为 −18 LUFS，真峰值不高于 −2 dBTP；检查近静音、过量放大、输出峰值与响度偏差。
- 两条都检查通过后发布；核验发布后哈希与元数据，捕获写入异常时恢复发布前字节。原始运行时 MP3 与 `.meta` 备份在 `temp/entry-audio-before-20261026/`。
- 保留 `dlg_gamestart` 的 UUID `89a04151-1508-4f57-9800-c39e5d8d5d04` 和 `start_game` 的 UUID `286bd1bf-f336-4742-9109-168a4c176e3f`，元数据仅更新时长。

详细响度、哈希和采样检查见 [processing-report.json](processing-report.json)。数值检查确认文件可解码、无满幅采样，不等于人工听感或手机真机可听性验收。构建与浏览器记录见 [项目验收记录](../../reorganization-validation.md)。
