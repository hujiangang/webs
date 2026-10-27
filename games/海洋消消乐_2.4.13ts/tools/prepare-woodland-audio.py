#!/usr/bin/env python3
"""Prepare the retained woodland audio originals; requires FFmpeg and NumPy.

Candidate bar lengths use generation-prompt BPM hints, not measured tempo.
Selection and validation are numerical and do not replace listening review.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import shutil
import subprocess
import uuid
from datetime import datetime, timezone
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs/audio/woodland-v1"
ORIGINALS = DOCS / "originals"
OUTPUT = ROOT / "assets/resources/sound"
WORK = ROOT / "temp/woodland-audio-processing"
BACKUP = ROOT / "temp/palette-audio-before-20261026"
RATE = 48000
CHANNELS = 2
FADE_SECONDS = 0.350
MICRO_FADE_SECONDS = 0.002
TRUE_PEAK_LIMIT = -2.0
TRACKS = [
    ("home", "bgm1.mp3", 84, -20.0),
    ("game", "bgm2.mp3", 104, -20.0),
    ("combo", "combo_praise.mp3", None, -18.0),
    ("victory", "game_win.mp3", None, -18.0),
    ("failure", "game_fail.mp3", None, -18.0),
]


def run(command: list[str], data: bytes | None = None) -> subprocess.CompletedProcess:
    result = subprocess.run(command, input=data, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError(result.stderr.decode("utf-8", errors="replace")[-6000:])
    return result


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def relative(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def decode(ffmpeg: str, path: Path) -> np.ndarray:
    result = run([ffmpeg, "-v", "error", "-i", str(path), "-f", "f32le",
                  "-ac", str(CHANNELS), "-ar", str(RATE), "pipe:1"])
    samples = np.frombuffer(result.stdout, dtype="<f4").reshape(-1, CHANNELS).copy()
    if len(samples) == 0 or not np.isfinite(samples).all():
        raise ValueError(f"Invalid decoded samples: {path}")
    return samples


def db(value: float) -> float:
    return float(20 * math.log10(max(value, 1e-12)))


def metrics(samples: np.ndarray, loop: bool = False) -> dict:
    peak = float(np.max(np.abs(samples)))
    rms = float(np.sqrt(np.mean(samples.astype(np.float64) ** 2)))
    result = {"sampleRate": RATE, "channels": CHANNELS, "decodedSamplesPerChannel": len(samples),
              "decodedDurationSeconds": len(samples) / RATE, "samplePeakDbfs": db(peak),
              "rmsDbfs": db(rms), "clippedSampleCount": int(np.count_nonzero(np.abs(samples) >= 1)),
              "finiteSamples": bool(np.isfinite(samples).all())}
    if loop:
        jump = float(np.max(np.abs(samples[0] - samples[-1])))
        ordinary = np.max(np.abs(np.diff(samples, axis=0)), axis=1)
        percentile = float(np.percentile(ordinary, 99))
        count = min(int(RATE * .100), len(samples))
        before = float(np.sqrt(np.mean(samples[-count:].astype(np.float64) ** 2)))
        after = float(np.sqrt(np.mean(samples[:count].astype(np.float64) ** 2)))
        result["loopSeam"] = {"boundaryJumpAmplitude": jump, "boundaryJumpDbfs": db(jump),
                              "interiorDerivativeP99": percentile,
                              "jumpOverInteriorP99": jump / max(percentile, 1e-12),
                              "last100msRmsDbfs": db(before), "first100msRmsDbfs": db(after),
                              "energyDifferenceDb": abs(db(before) - db(after)),
                              "limits": {"jumpAmplitudeMax": .01, "energyDifferenceDbMax": 6},
                              "numericCheckPassed": jump <= .01 and abs(db(before) - db(after)) <= 6}
    return result


def feature_frames(samples: np.ndarray) -> tuple[np.ndarray, np.ndarray, float]:
    mono = samples.mean(axis=1).astype(np.float64)
    window, hop = 2048, 960
    frames = np.lib.stride_tricks.sliding_window_view(mono, window)[::hop]
    power = np.abs(np.fft.rfft(frames * np.hanning(window), axis=1)) ** 2
    frequencies = np.fft.rfftfreq(window, 1 / RATE)
    edges = np.geomspace(65, 10000, 21)
    bands = np.stack([power[:, (frequencies >= a) & (frequencies < b)].mean(axis=1)
                      for a, b in zip(edges[:-1], edges[1:])], axis=1)
    bands = np.log(bands + 1e-12)
    bands -= bands.mean(axis=1, keepdims=True)
    bands /= np.maximum(np.linalg.norm(bands, axis=1, keepdims=True), 1e-12)
    energy = np.sqrt(np.mean(frames ** 2, axis=1))
    return bands, energy, hop / RATE


def choose_loop(samples: np.ndarray, bpm_hint: int) -> tuple[np.ndarray, dict]:
    duration = len(samples) / RATE
    bands, energy, step = feature_frames(samples)
    feature_count = int(FADE_SECONDS / step)
    median_energy = float(np.median(energy))
    candidates = []
    # Restrict the search to long loops and near-hint whole-bar durations.
    # The hints do not establish the actual tempo, meter, or phrase boundary.
    for bpm in np.arange(bpm_hint * .94, bpm_hint * 1.06 + .01, .5):
        for bars in range(8, 17):
            period = bars * 4 * 60 / float(bpm)
            segment_duration = period + FADE_SECONDS
            if not duration * .78 <= period <= duration - FADE_SECONDS - .04:
                continue
            for start in np.arange(.02, min(4.0, duration - segment_duration) + .001, .04):
                end = start + segment_duration
                a = int(start / step)
                b = int((end - FADE_SECONDS) / step)
                if b + feature_count > len(bands):
                    continue
                ea, eb = energy[a:a + feature_count], energy[b:b + feature_count]
                if min(float(ea.mean()), float(eb.mean())) < median_energy * .25:
                    continue
                spectrum = float(np.mean(1 - np.sum(bands[a:a + feature_count] *
                                                    bands[b:b + feature_count], axis=1)))
                envelope = float(np.mean(np.abs(np.log(ea + 1e-9) - np.log(eb + 1e-9))))
                loss = (duration - period) / duration
                phrase_penalty = 0 if bars % 4 == 0 else .08
                score = spectrum + .15 * envelope + .25 * loss + .05 * abs(bpm / bpm_hint - 1) + phrase_penalty
                candidates.append({"score": score, "sourceStartSeconds": float(start),
                                   "sourceEndSeconds": float(end), "outputPeriodSeconds": period,
                                   "candidateBpm": float(bpm), "assumedBars": bars,
                                   "spectralDistance": spectrum, "envelopeDistance": envelope})
    if not candidates:
        raise ValueError("No sufficiently long non-silent near-hint loop candidate")
    candidates.sort(key=lambda item: item["score"])
    count = round(FADE_SECONDS * RATE)
    t = np.linspace(0, math.pi / 2, count, endpoint=True, dtype=np.float64)[:, None]
    micro = round(MICRO_FADE_SECONDS * RATE)
    ramp = np.linspace(0, 1, micro, endpoint=True, dtype=np.float32)[:, None]
    rejected = 0
    for selected in candidates:
        start = round(selected["sourceStartSeconds"] * RATE)
        end = min(len(samples), round(selected["sourceEndSeconds"] * RATE))
        segment = samples[start:end].copy()
        blend = segment[-count:] * np.cos(t) + segment[:count] * np.sin(t)
        # The final blend approaches source head[count-1]; wrap continues at head[count].
        prepared = np.concatenate([segment[count:-count], blend], axis=0).astype(np.float32)
        prepared[:micro] *= ramp
        prepared[-micro:] *= ramp[::-1]
        first = float(np.sqrt(np.mean(prepared[:4800].astype(np.float64) ** 2)))
        last = float(np.sqrt(np.mean(prepared[-4800:].astype(np.float64) ** 2)))
        if abs(db(first) - db(last)) <= 5.5:
            break
        rejected += 1
    else:
        raise ValueError("Every loop candidate exceeded the pre-encode seam energy limit")
    return prepared, {"method": "near-hint whole-bar candidates ranked by spectrum/envelope similarity",
                      "tempoIsMeasured": False, "generationBpmHint": bpm_hint,
                      "assumedBeatsPerBar": 4, "bpmSearchRangePercent": [94, 106],
                      "fourBarGroupPreferencePenalty": .08,
                      "candidateCount": len(candidates), "selected": selected,
                      "candidatesRejectedForSeamEnergy": rejected,
                      "alternativeCandidates": [c for c in candidates if c is not selected][:4], "crossfadeSeconds": FADE_SECONDS,
                      "crossfadeCurve": "equal power cosine/sine", "edgeMicroFadeSeconds": MICRO_FADE_SECONDS,
                      "phraseBoundaryAuditedByListening": False, "prepared": metrics(prepared, True)}


def prepare_effect(samples: np.ndarray) -> tuple[np.ndarray, dict]:
    amplitude = np.max(np.abs(samples), axis=1)
    threshold = max(float(amplitude.max()) * .003, 10 ** (-65 / 20))
    active = np.flatnonzero(amplitude > threshold)
    if not len(active):
        raise ValueError("Reward effect contains no usable signal")
    start = max(0, int(active[0]) - round(.030 * RATE))
    end = min(len(samples), int(active[-1]) + round(.080 * RATE) + 1)
    prepared = samples[start:end].copy()
    for count, head in [(round(.003 * RATE), True), (round(.010 * RATE), False)]:
        count = min(count, len(prepared))
        ramp = np.linspace(0, 1, count, dtype=np.float32)[:, None]
        if head:
            prepared[:count] *= ramp
        else:
            prepared[-count:] *= ramp[::-1]
    return prepared, {"method": "silence bounds with 30ms head / 80ms tail margin; 3ms / 10ms edge fades",
                      "sourceStartSeconds": start / RATE, "sourceEndSeconds": end / RATE}


def loudness(ffmpeg: str, path: Path) -> dict:
    result = run([ffmpeg, "-hide_banner", "-nostats", "-i", str(path), "-af",
                  "loudnorm=I=-20:TP=-2:LRA=11:print_format=json", "-f", "null", "-"])
    blocks = re.findall(r"\{\s*\"input_i\"[\s\S]*?\}", result.stderr.decode("utf-8", errors="replace"))
    if not blocks:
        raise ValueError(f"No loudness measurement for {path}")
    data = json.loads(blocks[-1])
    return {"integratedLufs": float(data["input_i"]), "truePeakDbtp": float(data["input_tp"]),
            "loudnessRangeLu": float(data["input_lra"])}


def write_wav(ffmpeg: str, samples: np.ndarray, path: Path) -> None:
    run([ffmpeg, "-v", "error", "-y", "-f", "f32le", "-ar", str(RATE), "-ac", str(CHANNELS),
         "-i", "pipe:0", "-c:a", "pcm_f32le", str(path)], samples.astype("<f4").tobytes())


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ffmpeg", default=shutil.which("ffmpeg"))
    parser.add_argument("--ffprobe", default=shutil.which("ffprobe"))
    args = parser.parse_args()
    if not args.ffmpeg or not args.ffprobe:
        raise SystemExit("FFmpeg and FFprobe must be available on PATH or supplied explicitly")
    for key, _, _, _ in TRACKS:
        if not (ORIGINALS / f"{key}.mp3").is_file():
            raise SystemExit(f"Missing original: {key}.mp3")
    existing = ["bgm1.mp3", "bgm2.mp3", "game_win.mp3", "game_fail.mp3"]
    meta_hashes = {name + ".meta": sha(OUTPUT / (name + ".meta")) for name in existing}
    BACKUP.mkdir(parents=True, exist_ok=True)
    for name in existing:
        backup_path = BACKUP / name
        if not backup_path.exists():
            shutil.copy2(OUTPUT / name, backup_path)
            if sha(backup_path) != sha(OUTPUT / name):
                raise ValueError(f"Backup verification failed: {name}")
    WORK.mkdir(parents=True, exist_ok=True)
    report = {"schemaVersion": 1, "generatedAt": datetime.now(timezone.utc).isoformat(),
              "ffmpegVersion": run([args.ffmpeg, "-version"]).stdout.decode().splitlines()[0],
              "script": relative(Path(__file__).resolve()), "listeningReviewPerformed": False,
              "engineLoopPlaybackVerified": False,
              "preReplacementBackups": [{"path": relative(BACKUP / name), "sha256": sha(BACKUP / name)}
                                        for name in existing], "tracks": []}
    for key, name, bpm_hint, target in TRACKS:
        original = ORIGINALS / f"{key}.mp3"
        output = OUTPUT / name
        samples = decode(args.ffmpeg, original)
        prepared, edits = choose_loop(samples, bpm_hint) if bpm_hint else prepare_effect(samples)
        work_wav = WORK / f"{key}-prepared.wav"
        write_wav(args.ffmpeg, prepared, work_wav)
        measured = loudness(args.ffmpeg, work_wav)
        if not math.isfinite(measured["integratedLufs"]):
            raise ValueError(f"Unmeasurable loudness: {key}")
        gain = min(target - measured["integratedLufs"], TRUE_PEAK_LIMIT - measured["truePeakDbtp"])
        for attempt in range(3):
            run([args.ffmpeg, "-v", "error", "-y", "-i", str(work_wav), "-af", f"volume={gain:.6f}dB",
                 "-ar", str(RATE), "-ac", str(CHANNELS), "-c:a", "libmp3lame", "-b:a", "192k",
                 "-write_xing", "1", "-id3v2_version", "3", "-map_metadata", "-1", str(output)])
            output_loudness = loudness(args.ffmpeg, output)
            if output_loudness["truePeakDbtp"] <= TRUE_PEAK_LIMIT + .10:
                correction = target - output_loudness["integratedLufs"]
                if abs(correction) > .10 and output_loudness["truePeakDbtp"] + correction <= TRUE_PEAK_LIMIT:
                    gain += correction
                    continue
                break
            gain -= output_loudness["truePeakDbtp"] - TRUE_PEAK_LIMIT + .10
        decoded = decode(args.ffmpeg, output)
        numeric = metrics(decoded, bpm_hint is not None)
        if numeric["clippedSampleCount"] or output_loudness["truePeakDbtp"] > TRUE_PEAK_LIMIT + .10:
            raise ValueError(f"Output clipping/headroom check failed: {name}")
        if bpm_hint and not numeric["loopSeam"]["numericCheckPassed"]:
            raise ValueError(f"Loop seam numeric check failed: {name}: {numeric['loopSeam']}")
        probe = json.loads(run([args.ffprobe, "-v", "error", "-show_entries",
                               "format=duration,size:stream=codec_name,sample_rate,channels", "-of", "json", str(output)]).stdout)
        if key == "combo":
            meta_path = output.with_suffix(output.suffix + ".meta")
            meta = json.loads(meta_path.read_text(encoding="utf-8-sig")) if meta_path.exists() else {
                "ver": "2.0.3", "uuid": str(uuid.uuid5(uuid.NAMESPACE_URL, "cocos:woodland-v1:combo_praise")),
                "importer": "audio-clip", "downloadMode": 0, "subMetas": {}}
            meta["duration"] = numeric["decodedDurationSeconds"]
            meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        report["tracks"].append({"key": key, "source": relative(original), "sourceSha256": sha(original),
                                 "sourceMetrics": metrics(samples), "output": relative(output),
                                 "outputSha256": sha(output), "outputBytes": output.stat().st_size,
                                 "edits": edits, "normalization": {"method": "constant gain, no dynamic limiter",
                                 "targetIntegratedLufs": target, "truePeakLimitDbtp": TRUE_PEAK_LIMIT,
                                 "appliedGainDb": gain, "preparedLoudness": measured},
                                 "loudnessTargetLimitedByPeak": output_loudness["integratedLufs"] < target - .5,
                                 "outputLoudness": output_loudness, "outputMetrics": numeric, "ffprobe": probe})
        print(f"{key}: {numeric['decodedDurationSeconds']:.6f}s; {output_loudness['integratedLufs']:.2f} LUFS; "
              f"{output_loudness['truePeakDbtp']:.2f} dBTP; {output.stat().st_size} bytes", flush=True)
    meta_after = {name: sha(OUTPUT / name) for name in meta_hashes}
    if meta_hashes != meta_after:
        raise ValueError("An existing BGM metadata file changed during processing")
    report["preservedAudioMetaSha256"] = meta_after
    (DOCS / "processing-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("All outputs decoded successfully; numeric peak and loop-seam checks passed. Listening remains unreviewed.")


if __name__ == "__main__":
    main()
