from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
BANNER_DIR = DATA_DIR / "banner"
IMAGE_DIR = DATA_DIR / "image"
IMAGE_EX_DIR = DATA_DIR / "image_ex"
STATIC_DIR = BASE_DIR / "static"
TEMPLATES_DIR = BASE_DIR / "templates"
PAGE_SIZE = 12
UPLOAD_DIR = DATA_DIR / "uploads"
GAMES_DIR = BASE_DIR / "games"
