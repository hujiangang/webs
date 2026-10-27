"""Prepare the four retained spoken combo words; requires NumPy and FFmpeg."""
import importlib.util
import json
import math
import shutil
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs/audio/combo-voice-v1'
WORK = ROOT / 'temp/combo-voice-processing'
OUTPUT = ROOT / 'assets/resources/sound'
spec = importlib.util.spec_from_file_location('woodland_audio', ROOT / 'tools/prepare-woodland-audio.py')
audio = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audio)


def main():
    ffmpeg = shutil.which('ffmpeg')
    if not ffmpeg:
        raise SystemExit('FFmpeg must be available on PATH')
    WORK.mkdir(parents=True, exist_ok=True)
    report = {'voice': 'Pip', 'spokenLanguage': 'en', 'manualListeningReview': False,
              'script': 'tools/prepare-combo-voices.py', 'clips': []}
    for word in ('great', 'awesome', 'fantastic', 'blossom'):
        source = DOCS / 'originals' / (word + '.mp3')
        output = OUTPUT / ('combo_' + word + '.mp3')
        samples = audio.decode(ffmpeg, source)
        prepared, edits = audio.prepare_effect(samples)
        wav = WORK / (word + '.wav')
        audio.write_wav(ffmpeg, prepared, wav)
        measured = audio.loudness(ffmpeg, wav)
        if not math.isfinite(measured['integratedLufs']):
            raise ValueError('Unmeasurable voice: ' + word)
        gain = min(-16 - measured['integratedLufs'], -2 - measured['truePeakDbtp'])
        for attempt in range(3):
            audio.run([ffmpeg, '-v', 'error', '-y', '-i', str(wav), '-af', f'volume={gain:.6f}dB',
                       '-ar', '48000', '-ac', '2', '-c:a', 'libmp3lame', '-b:a', '192k',
                       '-write_xing', '1', '-map_metadata', '-1', str(output)])
            loudness = audio.loudness(ffmpeg, output)
            if loudness['truePeakDbtp'] <= -1.9:
                break
            gain -= loudness['truePeakDbtp'] + 2.1
        metrics = audio.metrics(audio.decode(ffmpeg, output))
        if metrics['clippedSampleCount'] or loudness['truePeakDbtp'] > -1.9:
            raise ValueError('Voice output peak check failed: ' + word)
        meta_path = output.with_suffix('.mp3.meta')
        meta = json.loads(meta_path.read_text(encoding='utf-8-sig')) if meta_path.exists() else {
            'ver': '2.0.3', 'uuid': str(uuid.uuid5(uuid.NAMESPACE_URL, 'cocos:combo-voice-v1:' + word)),
            'importer': 'audio-clip', 'downloadMode': 0, 'subMetas': {}}
        meta['duration'] = metrics['decodedDurationSeconds']
        meta_path.write_text(json.dumps(meta, indent=2) + '\n', encoding='utf-8')
        report['clips'].append({'word': word, 'spokenText': word.capitalize() + '!',
                                'source': audio.relative(source), 'sourceSha256': audio.sha(source),
                                'output': audio.relative(output), 'outputSha256': audio.sha(output),
                                'edits': edits, 'gainDb': gain, 'outputLoudness': loudness,
                                'outputMetrics': metrics})
        print(f'{word}: {metrics["decodedDurationSeconds"]:.3f}s, {loudness["integratedLufs"]:.2f} LUFS', flush=True)
    (DOCS / 'processing-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
