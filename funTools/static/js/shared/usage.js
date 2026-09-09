const STORAGE_KEY = 'funtools.workspace.v1';

export function readUsage() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      favorites: Array.isArray(value.favorites) ? value.favorites.filter(item => typeof item === 'string') : [],
      usage: value.usage && typeof value.usage === 'object' ? value.usage : {},
    };
  } catch {
    return { favorites: [], usage: {} };
  }
}

export function saveUsage(value) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); return true; }
  catch { return false; }
}

export function recordUse(key) {
  if (!key) return;
  const value = readUsage();
  value.usage[key] = (Number(value.usage[key]) || 0) + 1;
  saveUsage(value);
}
