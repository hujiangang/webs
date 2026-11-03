"""验证云南常用名、名称边界及不同图片来源的页面呈现。"""

import sys
import unittest
from pathlib import Path
from unittest.mock import patch

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from main import app
from mushroom_app import routers
from mushroom_app.models import MushroomItem, MushroomPage


class YunnanLabelTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        # 夹具只检查展示逻辑，不充当真实物种或图片证据。
        self.item = MushroomItem(
            id="90002", name="测试档案名称", latin_name="Testus example",
            toxicity="有毒", edible="不可食用", risk_class="danger",
            risk_label="有毒 / 风险", image_url="/image/test-example.jpg",
            gallery_images=["/image/test-example.jpg"],
            selection_name="测试常用名", selection_aliases=["测试别名"],
            selection_scope="俗名类群", selection_summary="一个名称可以包含多个物种。",
            selection_group="测试组", selection_note="测试收录依据",
            image_credits={"/image/test-example.jpg": {
                "url": "/image/test-example.jpg", "source_type": "user_confirmed",
                "author": "", "license": "", "license_url": "", "source_url": "",
                "source_title": "用户确认地方名称对应", "location_label": "地点未提供",
                "identification_status": "未进行精确学名鉴定", "reference_only": True,
            }},
        )
        self.page = MushroomPage(
            items=[self.item], page=1, total_pages=1, total_count=1,
            category="all", keyword="", collection="yunnan",
            collection_total_count=1, collection_photo_count=1,
        )
        for name, value in (("get_mushroom_total", 1), ("get_mushroom_page", self.page),
                            ("get_mushroom_detail", self.item)):
            patcher = patch.object(routers, name, return_value=value)
            patcher.start()
            self.addCleanup(patcher.stop)
        self.client = httpx.AsyncClient(
            transport=httpx.ASGITransport(app=app), base_url="http://testserver"
        )
        self.addAsyncCleanup(self.client.aclose)

    async def test_yunnan_card_uses_common_name_and_discloses_group(self):
        response = await self.client.get("/mushrooms?collection=yunnan")
        self.assertEqual(response.status_code, 200)
        for text in ("测试常用名", "测试别名", "俗名类群", "一个名称可以包含多个物种。",
                     "本地图 · 用户确认名称", "1 个已配图", "仅看已配图", "有毒 / 风险"):
            self.assertIn(text, response.text)
        self.assertNotIn('mushroom-name">测试档案名称', response.text)
        self.assertIn('src="/image/test-example.jpg"', response.text)

    async def test_user_photo_has_no_fake_author_license_or_empty_link(self):
        response = await self.client.get("/mushrooms/90002?collection=yunnan")
        self.assertEqual(response.status_code, 200)
        for text in ("测试常用名", "对应档案：测试档案名称", "测试别名", "俗名类群",
                     "原始拍摄者、拍摄地与许可未提供", "未进行精确学名鉴定"):
            self.assertIn(text, response.text)
        self.assertNotIn('href=""', response.text)
        self.assertNotIn('作者：</span>', response.text)

    async def test_reference_photo_keeps_source_without_claiming_open_license(self):
        credit = self.item.image_credits[self.item.image_url]
        credit.source_type = "source_reference"
        credit.author = "原页未署名"
        credit.license = "来源未声明开放许可"
        credit.source_url = "https://example.org/specimen"
        response = await self.client.get("/mushrooms/90002?collection=yunnan")
        self.assertEqual(response.status_code, 200)
        self.assertIn('href="https://example.org/specimen"', response.text)
        self.assertIn("来源未声明开放许可", response.text)
        self.assertNotIn('href=""', response.text)


if __name__ == "__main__":
    unittest.main()
