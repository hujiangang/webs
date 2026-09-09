import { readUsage, saveUsage } from './shared/usage.js';
import { notify } from './shared/ui.js';

const search = document.getElementById('toolSearch');
const cards = [...document.querySelectorAll('#toolGrid .tool-card')];
const favoriteGrid = document.getElementById('favoritesGrid');
const tabs = [...document.querySelectorAll('.category-tab')];
let category = new URLSearchParams(location.search).get('category') || '全部';
if (!tabs.some(tab => tab.dataset.category === category)) category = '全部';
let state = readUsage();

function filterTools() {
  const query = search.value.trim().toLocaleLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matches = (category === '全部' || card.dataset.category === category) && card.dataset.title.toLocaleLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  document.getElementById('emptyTools').hidden = visible !== 0;
  document.getElementById('resultCount').textContent = '共 ' + visible + ' 个工具';
  tabs.forEach(tab => {
    const active = tab.dataset.category === category;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-nav-category]').forEach(link => link.classList.toggle('active', link.dataset.navCategory === category));
}

function renderFavorites() {
  const ranked = cards.filter(card => state.favorites.includes(card.dataset.key) || Number(state.usage[card.dataset.key]) > 0);
  ranked.sort((first, second) => {
    const pinOrder = Number(state.favorites.includes(second.dataset.key)) - Number(state.favorites.includes(first.dataset.key));
    return pinOrder || (Number(state.usage[second.dataset.key]) || 0) - (Number(state.usage[first.dataset.key]) || 0);
  });
  favoriteGrid.replaceChildren(...ranked.slice(0, 8).map(card => { const copy = card.cloneNode(true); copy.hidden = false; return copy; }));
  document.getElementById('favoritesEmpty').hidden = ranked.length > 0;
  document.querySelectorAll('[data-favorite]').forEach(button => {
    const active = state.favorites.includes(button.dataset.favorite);
    button.classList.toggle('is-favorite', active);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? '★' : '☆';
    const title = button.closest('.tool-card').querySelector('h3').textContent;
    button.setAttribute('aria-label', (active ? '取消收藏' : '收藏') + title);
  });
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-favorite]');
  if (!button) return;
  const key = button.dataset.favorite;
  const active = state.favorites.includes(key);
  state.favorites = active ? state.favorites.filter(item => item !== key) : [...state.favorites, key];
  const stored = saveUsage(state);
  renderFavorites();
  notify(stored ? (active ? '已取消收藏，使用记录仍会保留' : '已添加到我的常用') : '当前浏览器禁止存储，收藏仅本次访问有效');
});
tabs.forEach(tab => tab.addEventListener('click', () => { category = tab.dataset.category; filterTools(); }));
document.querySelectorAll('[data-nav-category]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  category = link.dataset.navCategory;
  search.value = '';
  filterTools();
  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
}));
document.getElementById('resetSearch').addEventListener('click', () => { category = '全部'; search.value = ''; filterTools(); });
search.addEventListener('input', filterTools);
window.addEventListener('storage', () => { state = readUsage(); renderFavorites(); });
window.addEventListener('pageshow', () => { state = readUsage(); renderFavorites(); });
renderFavorites();
filterTools();
