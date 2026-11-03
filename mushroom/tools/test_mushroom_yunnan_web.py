"""验证云南精选的网页筛选上下文、详情来源与查询参数校验。"""

import sys
import unittest
from html.parser import HTMLParser
from pathlib import Path
from unittest.mock import patch

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from main import app
from mushroom_app import routers
from mushroom_app.models import MushroomItem, MushroomPage


class PageElements(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.elements = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


class YunnanWebTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        # 使用虚构条目检查页面行为，避免把夹具当成物种资料。
        self.item = MushroomItem(
            id="90001", name="测试菌", latin_name="Testus yunnanensis",
            toxicity="有毒", edible="不可食用", risk_class="danger",
            risk_label="有毒风险", image_url="/static/images/image-fallback.svg",
            selection_group="重点风险菌", selection_note="测试用收录依据。",
            selection_sources=[{"title": "测试研究来源", "url": "https://example.org/study"}],
        )
        self.page = MushroomPage(
            items=[self.item], page=2, total_pages=3, total_count=30,
            category="toxic", keyword="测试", with_photo=True, collection="yunnan",
            collection_title="云南常见菌", collection_description="测试精选说明。",
            collection_total_count=50, collection_photo_count=30,
        )
        for name, value in (
            ("get_mushroom_total", 100),
            ("get_mushroom_page", self.page),
            ("get_mushroom_detail", self.item),
        ):
            patcher = patch.object(routers, name, return_value=value)
            patcher.start()
            self.addCleanup(patcher.stop)
        self.client = httpx.AsyncClient(
            transport=httpx.ASGITransport(app=app), base_url="http://testserver"
        )
        self.addAsyncCleanup(self.client.aclose)

    async def test_search_filters_pages_and_cards_keep_collection(self):
        response = await self.client.get("/mushrooms?collection=yunnan")
        self.assertEqual(response.status_code, 200)
        elements = PageElements(response.text).elements
        self.assertTrue(any(tag == "input" and attrs.get("name") == "collection"
                            and attrs.get("value") == "yunnan" for tag, attrs in elements))
        relevant = [attrs["href"] for tag, attrs in elements if tag == "a"
                    and set(attrs.get("class", "").split()) & {"filter-btn", "page-btn"}]
        self.assertEqual(len(relevant), 6)
        self.assertTrue(all("collection=yunnan" in link and "with_photo=true" in link
                            and "keyword=" in link for link in relevant))
        self.assertIn('/mushrooms/90001?collection=yunnan', response.text)

    async def test_detail_exposes_basis_and_returns_to_yunnan_without_changing_risk(self):
        response = await self.client.get("/mushrooms/90001?collection=yunnan")
        self.assertEqual(response.status_code, 200)
        for text in ("返回云南常见菌", "云南收录依据", "测试用收录依据。",
                     "https://example.org/study", "有毒风险"):
            self.assertIn(text, response.text)
        links = [attrs.get("href") for tag, attrs in PageElements(response.text).elements
                 if tag == "a" and attrs.get("class") == "back-link"]
        self.assertEqual(links, ["/mushrooms?collection=yunnan"])

    async def test_unknown_collection_is_rejected_by_both_routes(self):
        for path in ("/mushrooms", "/mushrooms/90001"):
            response = await self.client.get(path, params={"collection": "unknown"})
            self.assertEqual(response.status_code, 422)


if __name__ == "__main__":
    unittest.main()
