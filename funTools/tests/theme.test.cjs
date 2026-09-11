const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const source = readFileSync(join(__dirname, '../static/js/layout/theme.js'), 'utf8');

// 用独立页面上下文模拟导航，检查主题在脚本初始化时恢复。
function openPage(storage) {
  const root = { dataset: {}, removeAttribute() { delete this.dataset.theme; } };
  const meta = { content: '#0c1015' };
  const handlers = {};
  const select = { value: '', addEventListener(name, handler) { handlers[name] = handler; } };
  let ready;
  vm.runInNewContext(source, {
    localStorage: storage,
    document: {
      documentElement: root,
      querySelector() { return meta; },
      getElementById() { return select; },
      addEventListener(name, handler) { ready = handler; },
    },
  });
  const beforeReady = root.dataset.theme;
  ready();
  return { root, meta, select, beforeReady, change(value) { select.value = value; handlers.change(); } };
}

function memoryStorage(value = null) {
  return {
    getItem(key) { assert.equal(key, 'funtools.theme'); return value; },
    setItem(key, next) { assert.equal(key, 'funtools.theme'); value = next; },
  };
}

test('首次访问保留原主题', () => {
  const page = openPage(memoryStorage());
  assert.equal(page.root.dataset.theme, undefined);
  assert.equal(page.select.value, 'default');
  assert.equal(page.meta.content, '#0c1015');
});

test('三种主题可切换，导航和刷新在首次绘制前恢复选择', () => {
  const storage = memoryStorage();
  for (const [name, background] of Object.entries({
    'vscode-dark': '#1f1f1f', 'vscode-light': '#ffffff', 'vscode-contrast': '#000000',
  })) {
    const page = openPage(storage);
    page.change(name);
    assert.equal(page.root.dataset.theme, name);
    assert.equal(page.meta.content, background);
    const nextPage = openPage(storage);
    assert.equal(nextPage.beforeReady, name);
    assert.equal(nextPage.select.value, name);
    assert.equal(nextPage.meta.content, background);
  }
});

test('恢复默认主题后再次访问仍保持默认', () => {
  const storage = memoryStorage('vscode-light');
  const page = openPage(storage);
  page.change('default');
  assert.equal(page.root.dataset.theme, undefined);
  assert.equal(openPage(storage).select.value, 'default');
});

test('无效或旧版存储值回退默认主题', () => {
  for (const value of ['unknown', '__proto__', 'constructor', '', null]) {
    const page = openPage(memoryStorage(value));
    assert.equal(page.select.value, 'default');
    assert.equal(page.root.dataset.theme, undefined);
  }
});

test('存储被浏览器禁用时仍可切换当前页面', () => {
  const page = openPage({
    getItem() { throw new Error('存储不可用'); },
    setItem() { throw new Error('存储不可用'); },
  });
  page.change('vscode-light');
  assert.equal(page.root.dataset.theme, 'vscode-light');
});
