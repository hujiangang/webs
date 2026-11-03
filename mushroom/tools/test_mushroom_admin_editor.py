"""用隔离服务夹具验证后台路由、草稿回显与维护上下文，不写真实资料。"""

import io
import sys
import unittest
from pathlib import Path
from unittest.mock import patch
from urllib.parse import parse_qs, urlsplit

import httpx
from fastapi import FastAPI

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from mushroom_app.admin import routers
from mushroom_app.admin.maintenance_repository import AdminRevisionConflict
from mushroom_app.admin.models import AdminMushroomItem, AdminMushroomList
from mushroom_app.web_assets import value_error_handler


class AdminEditorTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.item = AdminMushroomItem(
            id="99001", name="测试档案名称", revision="original-revision",
            image_revision="image-revision", main_image_url="/image/reference-test.png",
            has_admin_main=True, extra_images=[{"index": 1, "url": "/image/admin-test.png"}],
            fields=[
                {"key": "名称", "label": "名称", "value": "测试档案名称", "readonly": True},
                {"key": "拉丁名", "label": "拉丁名", "value": "Testus example", "readonly": True},
                {"key": "生长环境", "label": "生长环境", "value": "原来的说明", "multiline": True},
            ],
            selection={"display_name": "测试常用名", "aliases": ["测试别名"], "summary": "测试说明", "order": 2},
        )
        self.listing = AdminMushroomList(
            items=[{"id": "99001", "name": "测试档案名称", "latin_name": "Testus example", "display_name": "测试常用名"}],
            collection="yunnan", keyword="测试别名", page=2, total_pages=3, total_count=120,
        )
        self.mocks = {}
        for name, value in (("get_admin_mushroom", self.item), ("get_admin_mushroom_list", self.listing),
                            ("update_admin_mushroom", None), ("upload_admin_main_image", None),
                            ("upload_admin_extra_image", None), ("clear_admin_main_image", None),
                            ("delete_admin_extra_image", None)):
            patcher = patch.object(routers, name, return_value=value)
            self.mocks[name] = patcher.start()
            self.addCleanup(patcher.stop)
        app = FastAPI()
        app.add_exception_handler(ValueError, value_error_handler)
        app.include_router(routers.admin_router)
        self.client = httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://testserver")
        self.addAsyncCleanup(self.client.aclose)
        self.form = {"revision": "original-revision", "keyword": "测试别名", "collection": "yunnan", "page": "2",
                     "名称": "测试档案名称", "拉丁名": "Testus example", "生长环境": "修改后的说明",
                     "selection_display_name": "地方常用名", "selection_aliases": "叫法甲\n叫法乙",
                     "selection_summary": "手工整理的说明", "selection_order": "3"}

    async def test_default_scope_and_display_controls(self):
        response = await self.client.get("/admin/mushrooms")
        self.assertEqual(response.status_code, 200)
        self.mocks["get_admin_mushroom_list"].assert_called_once_with(keyword="", collection="yunnan", page=1)
        for text in ("云南精选", "全部档案", "测试常用名", "前台主图", "管理员附图", "上传并设为主图",
                     'name="revision" value="original-revision"', 'name="image_revision" value="image-revision"',
                     '/admin/password', '/logout', '/mushrooms/99001?collection=yunnan', 'name="名称" value="测试档案名称" readonly'):
            self.assertIn(text, response.text)
        self.assertNotIn("data-auto-upload-form", response.text)

    async def test_save_passes_selection_and_preserves_context(self):
        response = await self.client.post("/admin/mushrooms/99001", data=self.form)
        self.assertEqual(response.status_code, 303)
        location = parse_qs(urlsplit(response.headers["location"]).query)
        self.assertEqual(location["keyword"], ["测试别名"])
        self.assertEqual(location["page"], ["2"])
        mid, form = self.mocks["update_admin_mushroom"].call_args.args
        self.assertEqual(mid, "99001")
        self.assertEqual(form.selection.aliases, ["叫法甲", "叫法乙"])
        self.assertEqual(form.selection.order, 3)
        self.assertEqual(form.revision, "original-revision")
        self.assertEqual(set(form.fields), {"名称", "拉丁名", "生长环境"})

    async def test_list_displays_password_update_message(self):
        response = await self.client.get("/admin/mushrooms", params={"message": "管理密码已更新"})
        self.assertEqual(response.status_code, 200)
        self.assertIn('<p class="admin-message" role="status">管理密码已更新</p>', response.text)

    async def test_invalid_save_keeps_submitted_values_and_revision(self):
        self.mocks["update_admin_mushroom"].side_effect = ValueError("保存校验未通过")
        self.form["名称"] = "企图改变身份"
        response = await self.client.post("/admin/mushrooms/99001", data=self.form)
        self.assertEqual(response.status_code, 400)
        for text in ("保存校验未通过", "修改后的说明", "地方常用名", "叫法甲\n叫法乙", "手工整理的说明",
                     'value="original-revision"', 'data-unsaved="true"'):
            self.assertIn(text, response.text)
        self.assertIn('name="名称" value="测试档案名称" readonly', response.text)
        self.assertNotIn("企图改变身份", response.text)

    async def test_conflict_returns_409_and_keeps_old_revision(self):
        self.mocks["update_admin_mushroom"].side_effect = AdminRevisionConflict("资料已有其他修改，请重新加载")
        self.item.revision = "new-revision"
        response = await self.client.post("/admin/mushrooms/99001", data=self.form)
        self.assertEqual(response.status_code, 409)
        self.assertIn('name="revision" value="original-revision"', response.text)
        self.assertIn("修改后的说明", response.text)

    async def test_invalid_selection_keeps_raw_order_without_saving(self):
        self.form["selection_order"] = "not-a-number"
        response = await self.client.post("/admin/mushrooms/99001", data=self.form)
        self.assertEqual(response.status_code, 400)
        self.assertIn('value="not-a-number"', response.text)
        self.assertIn("修改后的说明", response.text)
        self.mocks["update_admin_mushroom"].assert_not_called()

    async def test_main_upload_preserves_image_revision_and_filter(self):
        response = await self.client.post("/admin/mushrooms/99001/main-image",
                                         data={"image_revision": "image-revision", "keyword": "测试别名", "collection": "all", "page": "2"},
                                         files={"image": ("test.png", io.BytesIO(b"fixture-only"), "image/png")})
        self.assertEqual(response.status_code, 303)
        args = self.mocks["upload_admin_main_image"].call_args.args
        self.assertEqual((args[0], args[2]), ("99001", "image-revision"))
        self.assertEqual(parse_qs(urlsplit(response.headers["location"]).query)["collection"], ["all"])

    async def test_main_revert_uses_dedicated_non_destructive_action(self):
        response = await self.client.post("/admin/mushrooms/99001/main-image/delete", data={"image_revision": "image-revision"})
        self.assertEqual(response.status_code, 303)
        self.mocks["clear_admin_main_image"].assert_called_once_with("99001", "image-revision")

    async def test_upload_conflict_is_409(self):
        self.mocks["delete_admin_extra_image"].side_effect = AdminRevisionConflict("图片已更新")
        response = await self.client.post("/admin/mushrooms/99001/extra-images/1/delete", data={"image_revision": "stale"})
        self.assertEqual(response.status_code, 409)
        self.assertIn("图片已更新", response.text)

    async def test_unknown_mushroom_returns_404(self):
        self.mocks["get_admin_mushroom"].return_value = None
        response = await self.client.get("/admin/mushrooms/missing")
        self.assertEqual(response.status_code, 404)

    async def test_bad_scope_rejected_before_reading_data(self):
        response = await self.client.get("/admin/mushrooms?collection=invalid")
        self.assertEqual(response.status_code, 422)
        self.mocks["get_admin_mushroom_list"].assert_not_called()


if __name__ == "__main__":
    unittest.main()
