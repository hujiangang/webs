const csrf = document.querySelector('meta[name="csrf-token"]')?.content;
const message = document.getElementById('adminMessage');

function report(text, error = false) {
  if (!message) return;
  message.textContent = text;
  message.classList.toggle('is-error', error);
}

async function api(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { 'X-CSRF-Token': csrf || '', ...options.headers }, signal: AbortSignal.timeout(20000) });
  if (response.status === 401 && url !== '/api/login') { location.href = '/login'; throw new Error('登录已过期'); }
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(typeof data.detail === 'string' ? data.detail : '配置格式不正确，请检查输入');
  }
  return response;
}

document.getElementById('loginForm')?.addEventListener('submit', async event => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.disabled = true;
  try {
    await api('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: document.getElementById('adminPassword').value }) });
    location.href = '/';
  } catch (error) { report(error.message, true); }
  finally { button.disabled = false; }
});

document.getElementById('adminLogout')?.addEventListener('click', async () => {
  try { await api('/api/logout', { method: 'POST' }); location.href = '/login'; }
  catch (error) { report(error.message, true); }
});

const form = document.getElementById('settingsForm');
let dirty = false;
let uploading = 0;
function markDirty() { dirty = true; document.getElementById('saveState').textContent = '有尚未保存的修改'; }
form?.addEventListener('input', markDirty);
document.getElementById('adminSearch')?.addEventListener('input', event => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll('.admin-tool-row').forEach(row => { row.hidden = !row.dataset.title.toLowerCase().includes(query); });
});
for (const kind of ['donation', 'ads']) {
  document.getElementById(kind + 'File')?.addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { report('图片不能超过 5 MB', true); return; }
    uploading += 1;
    document.getElementById('saveSettings').disabled = true;
    report('图片正在上传…');
    try {
      const response = await api('/api/upload', { method: 'POST', headers: { 'Content-Type': file.type }, body: file });
      const data = await response.json();
      document.getElementById(kind + 'Image').value = data.image;
      document.getElementById(kind + 'Preview').src = data.image;
      markDirty();
      report('图片已上传，保存配置后将在前台生效。');
    } catch (error) { report(error.message, true); }
    finally { uploading -= 1; document.getElementById('saveSettings').disabled = uploading > 0; }
  });
}

form?.addEventListener('submit', async event => {
  event.preventDefault();
  if (uploading) return;
  const button = document.getElementById('saveSettings');
  const payload = {
    revision: Number(form.dataset.revision),
    disabled_features: [...document.querySelectorAll('[name=feature_enabled]:not(:checked)')].map(input => input.value),
    donation: { enabled: document.getElementById('donationEnabled').checked, title: document.getElementById('donationTitle').value.trim(), image: document.getElementById('donationImage').value },
    ads: { enabled: document.getElementById('adsEnabled').checked, label: document.getElementById('adsLabel').value.trim(), image: document.getElementById('adsImage').value, link: document.getElementById('adsLink').value.trim() },
  };
  button.disabled = true;
  try {
    const response = await api('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json();
    form.dataset.revision = data.revision;
    dirty = false;
    document.getElementById('saveState').textContent = '配置已保存';
    document.getElementById('disabledCount').textContent = data.disabled_features.length + ' 项';
    document.querySelectorAll('.admin-tool-row').forEach(row => {
      const badge = row.querySelector('.availability');
      if (!badge.classList.contains('unavailable')) badge.textContent = row.querySelector('input').checked ? '可使用' : '已下架';
    });
    report('已应用到前台。新页面与接口请求立即使用最新配置。');
  } catch (error) { report(error.message, true); }
  finally { button.disabled = false; }
});
window.addEventListener('beforeunload', event => {
  if (dirty) { event.preventDefault(); event.returnValue = ''; }
});
