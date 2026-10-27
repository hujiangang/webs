"""Prepare the retained level-entry effects; requires FFmpeg and NumPy."""
import importlib.util
import json
import math
import shutil
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs/audio/entry-v1'
WORK = ROOT / 'temp/entry-audio-processing'
OUTPUT = ROOT / 'assets/resources/sound'
BACKUP = ROOT / 'temp/entry-audio-before-20261026'
TRACKS = ('dlg_gamestart', 'start_game')
spec = importlib.util.spec_from_file_location('woodland_audio', ROOT / 'tools/prepare-woodland-audio.py')
audio = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audio)


def main():
    ffmpeg = shutil.which('ffmpeg')
    if not ffmpeg:
        raise SystemExit('FFmpeg must be available on PATH')
    for folder in (WORK, BACKUP):
        folder.mkdir(parents=True, exist_ok=True)
    report = {'generatedAt': datetime.now(timezone.utc).isoformat(),
              'script': audio.relative(Path(__file__).resolve()),
              'manualListeningReview': False, 'backups': [], 'clips': []}
    metadata = {}
    for key in TRACKS:
        metadata[key] = json.loads((OUTPUT / (key + '.mp3.meta')).read_text(encoding='utf-8-sig'))
        for suffix in ('.mp3', '.mp3.meta'):
            current, backup = OUTPUT / (key + suffix), BACKUP / (key + suffix)
            if not backup.exists():
                shutil.copy2(current, backup)
                if audio.sha(current) != audio.sha(backup):
                    raise ValueError('Backup verification failed: ' + current.name)
            report['backups'].append({'path': audio.relative(backup), 'sha256': audio.sha(backup)})
    for key in TRACKS:
        source = DOCS / 'originals' / (key + '.mp3')
        staged = WORK / (key + '.mp3')
        samples = audio.decode(ffmpeg, source)
        if audio.metrics(samples)['rmsDbfs'] < -60:
            raise ValueError('Near-silent source: ' + key)
        prepared, edits = audio.prepare_effect(samples)
        wav = WORK / (key + '.wav')
        audio.write_wav(ffmpeg, prepared, wav)
        measured = audio.loudness(ffmpeg, wav)
        if not math.isfinite(measured['integratedLufs']):
            raise ValueError('Unmeasurable audio: ' + key)
        gain = min(-18 - measured['integratedLufs'], -2.1 - measured['truePeakDbtp'])
        if gain > 24:
            raise ValueError('Source requires excessive amplification: ' + key)
        for attempt in range(4):
            audio.run([ffmpeg, '-v', 'error', '-y', '-i', str(wav), '-af', f'volume={gain:.6f}dB',
                       '-ar', '48000', '-ac', '2', '-c:a', 'libmp3lame', '-b:a', '192k',
                       '-write_xing', '1', '-map_metadata', '-1', str(staged)])
            loudness = audio.loudness(ffmpeg, staged)
            if loudness['truePeakDbtp'] <= -2:
                break
            gain -= loudness['truePeakDbtp'] + 2.1
        metrics = audio.metrics(audio.decode(ffmpeg, staged))
        if metrics['clippedSampleCount'] or loudness['truePeakDbtp'] > -2:
            raise ValueError('Output peak check failed: ' + key)
        if abs(loudness['integratedLufs'] + 18) > 3:
            raise ValueError('Output loudness differs too much from target: ' + key)
        report['clips'].append({'key': key, 'source': audio.relative(source),
                                'sourceSha256': audio.sha(source),
                                'output': audio.relative(OUTPUT / staged.name),
                                'outputSha256': audio.sha(staged), 'outputBytes': staged.stat().st_size,
                                'preservedUuid': metadata[key]['uuid'], 'edits': edits,
                                'targetIntegratedLufs': -18, 'gainDb': gain,
                                'loudnessTargetLimitedByPeak': loudness['integratedLufs'] < -18.5,
                                'outputLoudness': loudness, 'outputMetrics': metrics})
        print(f'{key}: {metrics["decodedDurationSeconds"]:.3f}s, '
              f'{loudness["integratedLufs"]:.2f} LUFS, {loudness["truePeakDbtp"]:.2f} dBTP', flush=True)
    # Publish only after both clips have passed decoding and peak checks.
    before_publish = {OUTPUT / (key + suffix): (OUTPUT / (key + suffix)).read_bytes()
                      for key in TRACKS for suffix in ('.mp3', '.mp3.meta')}
    try:
        for clip in report['clips']:
            key = clip['key']
            output_path = OUTPUT / (key + '.mp3')
            shutil.copy2(WORK / output_path.name, output_path)
            meta = metadata[key].copy()
            meta['duration'] = clip['outputMetrics']['decodedDurationSeconds']
            meta_path = OUTPUT / (key + '.mp3.meta')
            meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
            if json.loads(meta_path.read_text(encoding='utf-8')) != meta or audio.sha(output_path) != clip['outputSha256']:
                raise ValueError('Published resource verification failed: ' + key)
    except Exception:
        for path, content in before_publish.items():
            path.write_bytes(content)
        raise
    (DOCS / 'processing-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
