import hashlib
import sys
import urllib.request
from pathlib import Path


MODEL_URL = "https://github.com/Sanster/models/releases/download/add_big_lama/big-lama.pt"
MODEL_MD5 = "e3aa4aaa15225a33ec84f9f4bc47e500"
PROJECT_ROOT = Path(__file__).resolve().parents[1]
MODEL_PATH = PROJECT_ROOT / "models" / "remove_watermark" / "lama" / "big-lama.pt"


def file_md5(path: Path) -> str:
    md5 = hashlib.md5()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            md5.update(chunk)
    return md5.hexdigest()


def show_progress(downloaded: int, block_size: int, total_size: int) -> None:
    if total_size <= 0:
        return
    current = min(downloaded * block_size, total_size)
    percent = current * 100 / total_size
    print(f"\r下载进度：{percent:6.2f}%", end="", flush=True)


def main() -> int:
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)

    if MODEL_PATH.exists():
        current_md5 = file_md5(MODEL_PATH)
        if current_md5 == MODEL_MD5:
            print(f"模型已存在：{MODEL_PATH}")
            return 0
        print("模型文件校验失败，将重新下载。")
        MODEL_PATH.unlink()

    temp_path = MODEL_PATH.with_suffix(".pt.part")
    if temp_path.exists():
        temp_path.unlink()

    print(f"开始下载图片去水印模型：{MODEL_URL}")
    print(f"保存位置：{MODEL_PATH}")
    try:
        urllib.request.urlretrieve(MODEL_URL, temp_path, show_progress)
        print()
    except Exception as exc:
        if temp_path.exists():
            temp_path.unlink()
        print(f"模型下载失败：{exc}", file=sys.stderr)
        return 1

    current_md5 = file_md5(temp_path)
    if current_md5 != MODEL_MD5:
        temp_path.unlink()
        print(
            f"模型校验失败：当前 {current_md5}，期望 {MODEL_MD5}",
            file=sys.stderr,
        )
        return 1

    temp_path.replace(MODEL_PATH)
    print("模型下载完成。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
