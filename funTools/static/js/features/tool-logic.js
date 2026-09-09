export function boundedInteger(value, minimum, maximum, label) {
  const parsed = Number(value);
  if (String(value).trim() === '' || !Number.isInteger(parsed) || parsed < minimum || parsed > maximum) {
    throw new Error(label + '必须是 ' + minimum + '–' + maximum + ' 之间的整数');
  }
  return parsed;
}

export function randomIndex(maximum) {
  // 拒绝采样消除取余偏差，密码和 UUID 均使用密码学随机数。
  const limit = Math.floor(4294967296 / maximum) * maximum;
  const buffer = new Uint32Array(1);
  do { crypto.getRandomValues(buffer); } while (buffer[0] >= limit);
  return buffer[0] % maximum;
}

export function generatePassword(length, sets) {
  if (!sets.length) throw new Error('请至少选择一种字符类型');
  const alphabet = sets.join('');
  const result = sets.map(set => set[randomIndex(set.length)]);
  while (result.length < length) result.push(alphabet[randomIndex(alphabet.length)]);
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = randomIndex(index + 1);
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result.join('');
}

export function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = [...bytes].map(value => value.toString(16).padStart(2, '0')).join('');
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
}

export function diffLines(before, after) {
  if (before.length > 100000 || after.length > 100000) throw new Error('每段文本最多 100,000 个字符');
  const original = before.replace(/\r\n/g, '\n').split('\n');
  const modified = after.replace(/\r\n/g, '\n').split('\n');
  if (original.length > 500 || modified.length > 500) throw new Error('每段文本最多 500 行');
  const table = Array.from({ length: original.length + 1 }, () => new Uint16Array(modified.length + 1));
  for (let first = original.length - 1; first >= 0; first -= 1) {
    for (let second = modified.length - 1; second >= 0; second -= 1) {
      table[first][second] = original[first] === modified[second]
        ? table[first + 1][second + 1] + 1
        : Math.max(table[first + 1][second], table[first][second + 1]);
    }
  }
  const result = [];
  let first = 0;
  let second = 0;
  while (first < original.length || second < modified.length) {
    if (first < original.length && second < modified.length && original[first] === modified[second]) {
      result.push({ type: 'same', text: original[first] }); first += 1; second += 1;
    } else if (first < original.length && (second === modified.length || table[first + 1][second] >= table[first][second + 1])) {
      result.push({ type: 'removed', text: original[first] }); first += 1;
    } else {
      result.push({ type: 'added', text: modified[second] }); second += 1;
    }
  }
  return result;
}

export function parseColor(value) {
  const hex = value.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  let channels;
  if (hex) {
    const full = hex[1].length === 3 ? [...hex[1]].map(item => item + item).join('') : hex[1];
    channels = [0, 2, 4].map(offset => parseInt(full.slice(offset, offset + 2), 16));
  } else {
    const rgb = value.trim().match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i);
    const hsl = value.trim().match(/^hsl\(\s*(-?[\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i);
    if (rgb) {
      channels = rgb.slice(1).map(Number);
      if (channels.some(item => !Number.isFinite(item) || item > 255)) throw new Error('RGB 分量必须为 0–255');
      channels = channels.map(Math.round);
    } else if (hsl) {
      const [hue, saturation, lightness] = hsl.slice(1).map(Number);
      if (![hue, saturation, lightness].every(Number.isFinite) || saturation > 100 || lightness > 100) throw new Error('HSL 的饱和度与亮度必须为 0–100%');
      const normalizedHue = ((hue % 360) + 360) % 360 / 60;
      const chroma = (1 - Math.abs(2 * lightness / 100 - 1)) * saturation / 100;
      const intermediate = chroma * (1 - Math.abs(normalizedHue % 2 - 1));
      const offset = lightness / 100 - chroma / 2;
      const combinations = [[chroma, intermediate, 0], [intermediate, chroma, 0], [0, chroma, intermediate], [0, intermediate, chroma], [intermediate, 0, chroma], [chroma, 0, intermediate]];
      channels = combinations[Math.floor(normalizedHue)].map(item => Math.round((item + offset) * 255));
    } else throw new Error('请输入 #HEX、rgb(红,绿,蓝) 或 hsl(色相,饱和度%,亮度%)');
  }
  const [red, green, blue] = channels.map(item => item / 255);
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  const lightness = (maximum + minimum) / 2;
  let hue = 0;
  if (delta) {
    if (maximum === red) hue = ((green - blue) / delta) % 6;
    else if (maximum === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue = (hue * 60 + 360) % 360;
  }
  const saturation = delta ? delta / (1 - Math.abs(2 * lightness - 1)) : 0;
  return {
    hex: '#' + channels.map(item => item.toString(16).padStart(2, '0')).join(''),
    rgb: 'rgb(' + channels.join(', ') + ')',
    hsl: 'hsl(' + Math.round(hue) + ', ' + (saturation * 100).toFixed(1) + '%, ' + (lightness * 100).toFixed(1) + '%)',
  };
}

export function localDateInput(date) {
  const pad = value => String(value).padStart(2, '0');
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
}
