import io
import re
import stat
import zipfile
from pathlib import Path, PurePosixPath
from uuid import uuid4
from urllib.parse import quote

from mushroom_app.content.repositories import game_exists, store_game, write_media


MEDIA_LIMIT = 80 * 1024 * 1024
GAME_LIMIT = 150 * 1024 * 1024
EXPANDED_LIMIT = 600 * 1024 * 1024
MEDIA_SUFFIXES = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm'}


def save_uploaded_media(filename: str, content: bytes) -> dict:
    suffix = Path(filename).suffix.lower()
    if suffix not in MEDIA_SUFFIXES or not content or len(content) > MEDIA_LIMIT:
        raise ValueError("请上传 80MB 以内的 JPG、PNG、WebP、GIF、MP4 或 WebM 文件")
    validate_media_signature(suffix, content)
    target = f'{uuid4().hex}{suffix}'
    write_media(target, content)
    return {'url': f'/uploads/{target}'}


def validate_media_signature(suffix: str, content: bytes) -> None:
    signatures = {
        '.jpg': content.startswith(b'\xff\xd8\xff'),
        '.jpeg': content.startswith(b'\xff\xd8\xff'),
        '.png': content.startswith(b'\x89PNG\r\n\x1a\n'),
        '.gif': content.startswith((b'GIF87a', b'GIF89a')),
        '.webp': content.startswith(b'RIFF') and content[8:12] == b'WEBP',
        '.mp4': content[4:8] == b'ftyp',
        '.webm': content.startswith(b'\x1aE\xdf\xa3'),
    }
    if not signatures[suffix]:
        raise ValueError('文件内容与扩展名不匹配，请上传有效的媒体文件')


def unpack_game(slug: str, content: bytes) -> dict:
    if game_exists(slug):
        raise ValueError("该游戏目录已存在，请使用新版本标识，避免覆盖正在运行的游戏")
    if not content or len(content) > GAME_LIMIT or not zipfile.is_zipfile(io.BytesIO(content)):
        raise ValueError("请上传 150MB 以内的 ZIP 游戏包")
    try:
        with zipfile.ZipFile(io.BytesIO(content)) as archive:
            files = validate_game_archive(archive)
            index_paths = [item.filename for item in files if PurePosixPath(item.filename).name == 'index.html']
            if not index_paths:
                raise ValueError("游戏包内需要包含 index.html 入口")
            entry = min(index_paths, key=lambda value: (value.count('/'), len(value)))
            entries = [(item.filename, archive.read(item)) for item in files]
    except (zipfile.BadZipFile, NotImplementedError, RuntimeError) as exception:
        raise ValueError('游戏压缩包损坏或使用了不支持的压缩方式') from exception
    store_game(slug, entries)
    return {'entry_url': f'/play/{slug}/{quote(entry, safe="/")}'}


def validate_game_archive(archive: zipfile.ZipFile) -> list:
    files = [item for item in archive.infolist() if not item.is_dir()]
    if len(files) > 10000 or sum(item.file_size for item in files) > EXPANDED_LIMIT:
        raise ValueError("解压内容过大：最多 10000 个文件、600MB")
    for item in files:
        path = PurePosixPath(item.filename)
        mode = item.external_attr >> 16
        if (path.is_absolute() or '..' in path.parts or '\\' in item.filename
                or any(character in item.filename for character in ':<>|"?*') or stat.S_ISLNK(mode)
                or any(part.endswith(('.', ' ')) for part in path.parts)
                or re.search(r'(^|/)(con|prn|aux|nul|com[0-9]|lpt[0-9])([./]|$)', item.filename, re.I)):
            raise ValueError("游戏包包含不安全的文件路径")
        if item.flag_bits & 1:
            raise ValueError("不支持加密的 ZIP 游戏包")
    return files
