from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.features import ASSET_VERSION, CATEGORIES, FEATURES, feature_enabled
from app.services.settings import PROJECT_ROOT


router = APIRouter()
templates = Jinja2Templates(directory=str(PROJECT_ROOT / "templates"))


def render_feature(request: Request, feature_key=None):
    settings = request.state.settings
    if feature_key is not None and not feature_enabled(feature_key, settings):
        return templates.TemplateResponse("404.html", {"request": request}, status_code=404)
    features = [feature for key, feature in FEATURES.items() if feature_enabled(key, settings)]
    return templates.TemplateResponse("index.html", {
        "request": request, "features": features,
        "active_feature": FEATURES.get(feature_key), "feature_key": feature_key,
        "asset_version": ASSET_VERSION,
        "categories": [category for category in CATEGORIES if category == "全部" or any(feature["category"] == category for feature in features)],
        "settings": settings, "is_home": feature_key is None,
    })


@router.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return render_feature(request)


@router.get("/tools/{feature_key}", response_class=HTMLResponse)
async def generic_tool(request: Request, feature_key: str):
    return render_feature(request, feature_key)


@router.get("/{slug}", response_class=HTMLResponse)
async def existing_tool(request: Request, slug: str):
    key = next((key for key, feature in FEATURES.items() if feature["path"] == "/" + slug), "")
    return render_feature(request, key)
