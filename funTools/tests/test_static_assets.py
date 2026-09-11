import re
import unittest
from urllib.parse import parse_qs, urljoin, urlparse

import httpx

from app.features import ASSET_VERSION, FEATURES, feature_enabled
from app.services.settings import get_settings
from main import app


class StaticAssetTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.client = httpx.AsyncClient(
            transport=httpx.ASGITransport(app=app), base_url="http://test"
        )

    async def asyncTearDown(self):
        await self.client.aclose()

    async def test_imported_styles_have_current_version(self):
        # 入口版本变化时，子样式也必须更换地址，避免命中旧版布局缓存。
        page = await self.client.get("/")
        self.assertEqual(page.status_code, 200)
        entry = re.search(r'href="(/static/css/app.css[^\"]*)"', page.text).group(1)
        response = await self.client.get(entry)
        imports = re.findall(r'@import url\("([^\"]+)"\)', response.text)
        self.assertGreaterEqual(len(imports), 8)
        for asset in imports:
            with self.subTest(asset=asset):
                self.assertEqual(parse_qs(urlparse(asset).query).get("v"), [ASSET_VERSION])
                stylesheet = await self.client.get(urljoin(entry, asset))
                self.assertEqual(stylesheet.status_code, 200)
                self.assertIn("text/css", stylesheet.headers["content-type"])

    async def test_static_cache_revalidates_even_on_not_modified(self):
        # 校验响应和 304 都要保留缓存策略，避免后续修改继续被旧缓存遮蔽。
        for path in ("/static/css/base.css", "/static/js/layout/sidebar.js"):
            with self.subTest(path=path):
                response = await self.client.get(path)
                self.assertEqual(response.headers.get("cache-control"), "no-cache")
                cached = await self.client.get(path, headers={"If-None-Match": response.headers["etag"]})
                self.assertEqual(cached.status_code, 304)
                self.assertEqual(cached.headers.get("cache-control"), "no-cache")

    async def test_theme_available_on_home_and_enabled_tools(self):
        # 首页和工具页共用主题入口，脚本应在样式之前加载且符合现有 CSP。
        settings = get_settings()
        paths = ["/"] + [feature["path"] for key, feature in FEATURES.items() if feature_enabled(key, settings)]
        for path in paths:
            with self.subTest(path=path):
                page = await self.client.get(path)
                self.assertEqual(page.status_code, 200)
                self.assertIn('id="themeSelect"', page.text)
                for theme in ("default", "vscode-dark", "vscode-light", "vscode-contrast"):
                    self.assertIn(f'<option value="{theme}">', page.text)
                self.assertLess(page.text.index("/static/js/layout/theme.js"), page.text.index("/static/css/app.css"))
                self.assertIn("script-src 'self'", page.headers["content-security-policy"])
        script = await self.client.get(f"/static/js/layout/theme.js?v={ASSET_VERSION}")
        self.assertEqual(script.status_code, 200)
        self.assertIn("javascript", script.headers["content-type"])

    async def test_theme_palette_text_contrast(self):
        # 校验主题基础色对，防止浅色背景或深色输入框上出现不可读文字。
        response = await self.client.get("/static/css/themes.css")
        palettes = re.findall(r':root\[data-theme="([^"]+)"\] \{([^}]+)\}', response.text)
        self.assertEqual(len(palettes), 3)

        def luminance(color):
            channels = [int(color[index:index + 2], 16) / 255 for index in (1, 3, 5)]
            channels = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in channels]
            return sum(value * weight for value, weight in zip(channels, (0.2126, 0.7152, 0.0722)))

        for name, block in palettes:
            colors = dict(re.findall(r'--([\w-]+): (#[\da-f]{6});', block))
            pairs = [(text, background) for text in ("text", "subtle") for background in ("bg", "panel", "panel-soft", "input", "sidebar")]
            pairs += [("accent", "accent-soft"), ("button-text", "button"), ("error", "error-bg"), ("success-text", "success-bg")]
            for foreground, background in pairs:
                with self.subTest(theme=name, foreground=foreground, background=background):
                    values = sorted((luminance(colors[foreground]), luminance(colors[background])))
                    self.assertGreaterEqual((values[1] + 0.05) / (values[0] + 0.05), 4.5)


if __name__ == "__main__":
    unittest.main()
