(() => {
  const storageKey = 'funtools.theme';
  const themes = {
    default: '#0c1015',
    'vscode-dark': '#1f1f1f',
    'vscode-light': '#ffffff',
    'vscode-contrast': '#000000',
  };
  let current = 'default';

  function applyTheme(value) {
    current = Object.prototype.hasOwnProperty.call(themes, value) ? value : 'default';
    if (current === 'default') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.dataset.theme = current;
    document.querySelector('meta[name="theme-color"]').content = themes[current];
  }

  // 浏览器禁用本地存储时，仍允许在当前页面切换主题。
  try { current = localStorage.getItem(storageKey) || 'default'; } catch {}
  applyTheme(current);

  document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('themeSelect');
    select.value = current;
    select.addEventListener('change', () => {
      applyTheme(select.value);
      try { localStorage.setItem(storageKey, current); } catch {}
    });
  });
})();
