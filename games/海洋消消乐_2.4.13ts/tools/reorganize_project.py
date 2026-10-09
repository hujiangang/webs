"""One-time, guarded source migration. Back up before moving Cocos script UUIDs."""
from pathlib import Path
import hashlib
import json
import os
import re
import shutil
import uuid
import zipfile

ROOT = Path(__file__).resolve().parents[1]


def destination(old):
    p = old.as_posix()
    base = 'assets/Script/Base/'
    if p.startswith('assets/Script/Logic/Loading/'):
        return p.replace('assets/Script/Logic/Loading/', 'assets/Script/Application/Loading/', 1)
    if p.startswith('assets/Script/Logic/'):
        return p.replace('assets/Script/Logic/', 'assets/Script/Game/', 1)
    if p.startswith('assets/Script/Views/'):
        return p.replace('assets/Script/Views/', 'assets/Script/Game/Views/', 1)
    if p.startswith('assets/Script/Libs/'):
        return p.replace('assets/Script/Libs/', 'assets/Script/ThirdParty/', 1)
    if p.startswith('assets/GodGuide/') and old.suffix == '.ts':
        return p.replace('assets/GodGuide/', 'assets/Script/Game/Guide/', 1)
    if p == 'assets/Script/test.ts':
        return 'assets/Script/Debug/test.ts'
    if not p.startswith(base):
        return p
    rest = p[len(base):]
    special = {
        'Apps.ts': 'Application/Apps.ts',
        'BaseConst.ts': 'Game/Data/Const/BaseConst.ts',
        'Manager/M.ts': 'Application/M.ts',
        'Utils/Paths.ts': 'Game/Config/Paths.ts',
        'Utils/DLogId.ts': 'Game/Data/Const/DLogId.ts',
        'Manager/GameTableMgr.ts': 'Game/Config/GameTableMgr.ts',
        'Manager/StorageMgr.ts': 'Game/Data/StorageMgr.ts',
        'Manager/UIMgr.ts': 'Game/Common/UI/UIMgr.ts',
        'UI/UIBase.ts': 'Game/Common/UI/UIBase.ts',
        'CustomComponent/Button.ts': 'Game/Common/Components/Button.ts',
        'Manager/CacheMgr.ts': 'Framework/Resources/CacheMgr.ts',
        'Manager/NodePoolMgr.ts': 'Framework/Pool/NodePoolMgr.ts',
        'Manager/EventMgr.ts': 'Framework/Events/EventMgr.ts',
        'DataPool.ts': 'Framework/Pool/DataPool.ts',
        'Manager/DeviceMgr.ts': 'Game/Platform/DeviceMgr.ts',
        'Manager/PlatformMgr.ts': 'Game/Platform/PlatformMgr.ts',
    }
    if rest in special:
        return 'assets/Script/' + special[rest]
    for src, dst in [('Tabls/', 'Game/Config/Tables/'),
                     ('Manager/Table/', 'Game/Config/Loader/'),
                     ('Manager/Plaform/', 'Game/Platform/Adapters/'),
                     ('Manager/View/', 'Game/Common/Views/'),
                     ('Manager/', 'Game/Services/'),
                     ('CustomComponent/', 'Framework/Components/')]:
        if rest.startswith(src):
            return 'assets/Script/' + dst + rest[len(src):]
    return 'assets/Script/Framework/' + rest


def main():
    if not (ROOT / 'assets/Script/Base').is_dir():
        raise SystemExit('Already migrated: assets/Script/Base is absent.')
    sources = sorted(p for p in (ROOT / 'assets').rglob('*')
                     if p.is_file() and p.suffix in ('.ts', '.js'))
    mapping = {p.relative_to(ROOT).as_posix(): destination(p.relative_to(ROOT)) for p in sources}
    lookup = {k.lower(): k for k in mapping}
    backup = ROOT / 'temp/reorganization-before.zip'
    if backup.exists():
        raise SystemExit('Backup exists; refusing to overwrite.')
    with zipfile.ZipFile(backup, 'w', zipfile.ZIP_DEFLATED) as z:
        for prefix in ('assets/Script', 'assets/GodGuide', 'docs'):
            for p in (ROOT / prefix).rglob('*'):
                if p.is_file():
                    z.write(p, p.relative_to(ROOT))
    # Verify every archived byte before making any source change.
    with zipfile.ZipFile(backup) as z:
        for name in z.namelist():
            assert hashlib.sha256(z.read(name)).digest() == hashlib.sha256((ROOT / name).read_bytes()).digest()
    manifest = []
    for old, new in mapping.items():
        p, target = ROOT / old, ROOT / new
        source = p.read_text(encoding='utf-8-sig')
        # Relative module specifiers only; leave resources and dynamic Cocos module names intact.
        def rewrite(match):
            value = match.group(2)
            resolved = os.path.normpath(os.path.join(os.path.dirname(old), value)).replace('\\', '/')
            key = next((lookup.get((resolved + ext).lower()) for ext in ('', '.ts', '.js', '.d.ts', '/index.ts')
                        if (resolved + ext).lower() in lookup), None)
            if not key:
                return match.group(0)
            dest = mapping[key]
            if not value.endswith(('.ts', '.js')):
                dest = re.sub(r'\.(ts|js)$', '', dest)
            relative = os.path.relpath(dest, os.path.dirname(new)).replace('\\', '/')
            if not relative.startswith('.'):
                relative = './' + relative
            return match.group(1) + relative + match.group(3)
        updated = re.sub(r'''((?:\bfrom\s*|\brequire\s*\(\s*|\bimport\s*)["'])(\.[^"']+)(["'])''', rewrite, source)
        if old != new:
            assert not target.exists(), new
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(p), str(target))
            meta = Path(str(p) + '.meta')
            if meta.exists():
                shutil.move(str(meta), str(target) + '.meta')
        if updated != source:
            target.write_text(updated, encoding='utf-8')
        meta = Path(str(target) + '.meta')
        manifest.append({'before': old, 'after': new,
                         'uuid': json.loads(meta.read_text(encoding='utf-8'))['uuid'] if meta.exists() else None})
    # Remove only now-empty source folders, deepest first, inside this project's assets.
    for p in sorted((ROOT / 'assets/Script').rglob('*'), key=lambda p: len(p.parts), reverse=True):
        if p.is_dir() and not any(p.iterdir()):
            assert p.resolve().is_relative_to((ROOT / 'assets/Script').resolve())
            p.rmdir()
            Path(str(p) + '.meta').unlink(missing_ok=True)
    for p in (ROOT / 'assets/Script').rglob('*'):
        if p.is_dir() and not Path(str(p) + '.meta').exists():
            Path(str(p) + '.meta').write_text(json.dumps({
                'ver': '1.1.3', 'uuid': str(uuid.uuid4()), 'importer': 'folder',
                'isBundle': False, 'bundleName': '', 'priority': 1,
                'compressionType': {}, 'optimizeHotUpdate': {}, 'inlineSpriteFrames': {},
                'isRemoteBundle': {}, 'subMetas': {}
            }, indent=2) + '\n', encoding='utf-8')
    (ROOT / 'docs/source-migration.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    # Refresh existing documentation links, including abbreviated paths.
    for p in (ROOT / 'docs').glob('*.md'):
        text = p.read_text(encoding='utf-8')
        for old, new in sorted(mapping.items(), key=lambda pair: -len(pair[0])):
            text = text.replace(old, new)
        for old, new in [('assets/Script/Logic', 'assets/Script/Game'),
                         ('assets/Script/Base/Tabls', 'assets/Script/Game/Config/Tables')]:
            text = text.replace(old, new)
        p.write_text(text, encoding='utf-8')
    print(f'Migrated {sum(a != b for a,b in mapping.items())} source files. Verified backup: {backup}')


if __name__ == '__main__':
    main()
