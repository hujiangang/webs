"""以临时凭据测试密码恢复、旧会话失效和网页改密，绝不改真实账号。"""

import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import httpx
from fastapi import FastAPI
from pydantic import ValidationError

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from mushroom_app.admin.access_routes import access_router
from mushroom_app.admin.auth import (
    AdminAccessMiddleware, issue_session, reset_admin_password, valid_session, verify_password,
)


class AdminPasswordTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.path = Path(self.directory.name) / 'credentials.json'
        self.patch = patch('mushroom_app.admin.auth_repository.AUTH_FILE', self.path)
        self.patch.start()
        self.addCleanup(self.patch.stop)
        self.addCleanup(self.directory.cleanup)
        reset_admin_password('old-test-password-123')
        self.app = FastAPI()
        self.app.add_middleware(AdminAccessMiddleware)
        self.app.include_router(access_router)

    def test_reset_invalidates_old_sessions_and_password(self):
        old_token = issue_session()
        reset_admin_password('new-test-password-456')
        self.assertFalse(valid_session(old_token))
        self.assertFalse(verify_password('old-test-password-123'))
        self.assertTrue(verify_password('new-test-password-456'))
        self.assertTrue(valid_session(issue_session()))

    def test_short_password_preserves_credentials(self):
        original = self.path.read_bytes()
        with self.assertRaises(ValidationError):
            reset_admin_password('short')
        self.assertEqual(self.path.read_bytes(), original)

    async def test_password_page_requires_login_and_forgot_help_is_public(self):
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=self.app), base_url='http://localhost') as client:
            response = await client.get('/admin/password')
            self.assertEqual(response.status_code, 303)
            self.assertEqual(response.headers['location'], '/login')
            response = await client.get('/login')
            self.assertIn('python manage.py --reset-password', response.text)

    async def test_change_password_checks_old_password_and_rotates_cookie(self):
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=self.app), base_url='http://localhost') as client:
            await client.post('/login', data={'password': 'old-test-password-123'})
            old_token = client.cookies.get('mushroom_admin')
            original = self.path.read_bytes()
            response = await client.post('/admin/password', data={
                'current_password': 'wrong-secret', 'new_password': 'new-test-password-456',
                'confirm_password': 'new-test-password-456'})
            self.assertEqual(response.status_code, 400)
            self.assertEqual(self.path.read_bytes(), original)
            self.assertNotIn('wrong-secret', response.text)
            response = await client.post('/admin/password', data={
                'current_password': 'old-test-password-123', 'new_password': 'new-test-password-456',
                'confirm_password': 'mismatch-test-password'})
            self.assertEqual(response.status_code, 400)
            self.assertEqual(self.path.read_bytes(), original)
            self.assertNotIn('new-test-password-456', response.text)
            response = await client.post('/admin/password', data={
                'current_password': 'old-test-password-123', 'new_password': 'new-test-password-456',
                'confirm_password': 'new-test-password-456'})
            self.assertEqual(response.status_code, 303)
            self.assertFalse(valid_session(old_token))
            self.assertTrue(valid_session(client.cookies.get('mushroom_admin')))
            self.assertTrue(verify_password('new-test-password-456'))


if __name__ == '__main__':
    unittest.main()
