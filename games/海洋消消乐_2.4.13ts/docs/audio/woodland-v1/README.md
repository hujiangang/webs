# 山林音乐与反馈音 · woodland-v1

**后续更新：** 四档 Great／Awesome／Fantastic／Blossom 已改用独立人声，原 `combo_praise` 木铃保留为旧资源。当前称赞配音见 [combo-voice-v1](../combo-voice-v1/README.md)。本页其余配乐、通关和重试反馈继续使用。

2026-10-26。本包保留五个生成原始 MP3，提供本地处理脚本、游戏音频及数值报告。**尚未人工试听，也未在浏览器／微信运行时验证循环听感。** 下列通过结论仅指解码、响度、峰值和接缝数值检查。

## 文件与结果

输出均为 **48 kHz、立体声、192 kbps MP3**。时长为 FFmpeg 解码得到的有效采样长度；流时长与采样数也记录在 JSON 中。

| 原始文件 | 游戏输出（位于 `assets/resources/sound/`） | 有效时长 | LUFS | 真峰值 dBTP | RMS dBFS |
| --- | --- | ---: | ---: | ---: | ---: |
| [originals/home.mp3](originals/home.mp3) | `bgm1.mp3` | 24.316104 秒 | -20.00 | -7.86 | -22.18 |
| [originals/game.mp3](originals/game.mp3) | `bgm2.mp3` | 26.726063 秒 | -20.01 | -7.49 | -21.96 |
| [originals/combo.mp3](originals/combo.mp3) | `combo_praise.mp3` | 1.197688 秒 | -22.18 | -2.23 | -25.61 |
| [originals/victory.mp3](originals/victory.mp3) | `game_win.mp3` | 3.000000 秒 | -17.99 | -6.68 | -24.02 |
| [originals/failure.mp3](originals/failure.mp3) | `game_fail.mp3` | 2.000000 秒 | -18.03 | -4.75 | -22.99 |

五个输出均完整解码、采样值有限，超过或达到满幅的采样数为 0。原曲、输出与旧音频备份的 SHA-256、大小、原始采样峰值及 FFprobe 信息见 [processing-report.json](processing-report.json)。生成提示词与任务信息分别保留在 [generation-record.json](generation-record.json) 和 [feedback-generation-record.json](feedback-generation-record.json)，处理脚本不改写这两份记录。

## 音乐循环参数

原始两曲的有效解码时长均约 30.772250 秒。脚本在生成提示的 BPM 附近 ±6% 构造整小节候选，按频谱与音量包络相似度排序，并优先四小节分组。**84／104 是生成提示，78.96／107.76 也是候选计算参数，都不是测得的实际速度；4 拍一小节与乐句边界也未经听审确认。**

| 音乐 | 原曲截取区间 | 候选假设 | 首尾接点差值 | 首尾各 100ms 的 RMS 差 |
| --- | --- | --- | ---: | ---: |
| 主页 | 3.860000～28.526109 秒 | 78.96 BPM、8 小节 | -74.10 dBFS | 2.61 dB |
| 局内 | 1.980000～29.056058 秒 | 107.76 BPM、12 小节 | -56.50 dBFS | 4.29 dB |

- 首尾各取 350ms 做正弦／余弦等功率交叉淡化，合并后周期比截取区间短 350ms；另加首尾各 2ms 的微淡化减小采样突变。
- 编码前拒绝首尾各 100ms 能量差超过 5.5dB 的候选；编码后重新解码，要求边界样本差不超过 0.01、首尾能量差不超过 6dB。两曲均满足本次阈值。
- 这些阈值用于排查突变，不能证明旋律、和声、拍点或节奏衔接自然。MP3 的编码延迟信息已保留，实际播放器是否无间隙循环仍需运行时试听。

## 响度与反馈音处理

音乐目标为 -20 LUFS，三个反馈音目标为 -18 LUFS，真峰值上限为 -2 dBTP。先分析响度，再施加恒定增益；不使用动态限幅器，并对编码后的 MP3 复测。

`combo_praise` 的瞬态峰值较高，达到 -18 LUFS 会超过真峰值上限，因此按峰值限制增益，最终为 **-22.18 LUFS／-2.23 dBTP**。胜利与失败音接近 -18 LUFS。游戏内的相对音量与实际听感尚未验收。

反馈音只按信号阈值移除尾部空白，保留前 30ms／后 80ms 余量，增加 3ms 起始与 10ms 结束微淡化。连消提示从 1.48 秒缩为约 1.20 秒；胜利与失败保留 3 秒和 2 秒有效时长。

## 重复生成

需要 Python 3、NumPy、FFmpeg 与 FFprobe。在项目根目录运行：

```powershell
python tools/prepare-woodland-audio.py
```

工具未加入 PATH 时可传 `--ffmpeg` 和 `--ffprobe` 的绝对路径。脚本会检查五个原始文件是否齐全，重新计算候选、生成音频和报告；临时 WAV 位于 `temp/woodland-audio-processing/`。原始音频不被覆盖。

- 已有 `bgm1.mp3`、`bgm2.mp3`、`game_win.mp3`、`game_fail.mp3` 的替换前文件保存在 `temp/palette-audio-before-20261026/`；已有备份不被重写。
- 四份原 `.meta` 在处理前后逐字节核对，脚本未修改 UUID 或其他内容。Cocos 导入时可重新读取音频时长，实际输出时长以解码报告为准。
- 新 `combo_praise.mp3.meta` 使用独立 UUID，重复处理时沿用已有 UUID。
- 本包只处理音频及记录，没有修改 TypeScript、全量构建或浏览器状态。
