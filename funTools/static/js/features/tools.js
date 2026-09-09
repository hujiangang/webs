import { copyText, downloadText, request } from '../shared/ui.js';
import { boundedInteger, diffLines, generatePassword, localDateInput, parseColor, uuid } from './tool-logic.js';
import { initImageTools } from './image-tools.js';

export function initTools() {
  const page = document.querySelector('.tool-page');
  if (!page) return;
  const key = page.dataset.tool;
  const input = document.getElementById('toolInput');
  const output = document.getElementById('toolOutput');
  const message = document.getElementById('toolMessage');
  let currentOutput = '';
  let qrUrl = '';

  function inform(text, error = false) {
    message.textContent = text;
    message.classList.toggle('is-error', error);
  }
  function show(value) {
    currentOutput = String(value);
    if (output) output.textContent = currentOutput || '没有输出内容。';
    document.getElementById('copyOutput')?.toggleAttribute('disabled', !currentOutput);
    document.getElementById('downloadOutput')?.toggleAttribute('disabled', !currentOutput);
  }
  function bind(id, action) {
    const button = document.getElementById(id);
    button?.addEventListener('click', async () => {
      button.disabled = true;
      inform('');
      try { await action(); }
      catch (error) { inform(error.message || '处理失败，请重试', true); }
      finally { button.disabled = false; }
    });
  }
  bind('copyOutput', () => copyText(currentOutput));
  bind('downloadOutput', () => downloadText(currentOutput, key + '-result.txt'));
  bind('toolClear', () => {
    if (input) input.value = '';
    show('');
    document.getElementById('qrResult')?.setAttribute('hidden', '');
    if (qrUrl) { URL.revokeObjectURL(qrUrl); qrUrl = ''; }
  });

  const actions = {
    json_formatter() { show(JSON.stringify(JSON.parse(input.value), null, 2)); inform('JSON 校验通过'); },
    url_encoder() { show(encodeURIComponent(input.value)); },
    async hash_generator() {
      const response = await request('/api/hash', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: input.value }) });
      const result = await response.json();
      show(Object.entries(result).map(([name, value]) => name + '\n' + value).join('\n\n'));
    },
    async qr_generator() {
      const response = await request('/api/qr', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: input.value }) });
      if (qrUrl) URL.revokeObjectURL(qrUrl);
      qrUrl = URL.createObjectURL(await response.blob());
      document.getElementById('qrPreview').src = qrUrl;
      document.getElementById('qrDownload').href = qrUrl;
      document.getElementById('qrResult').hidden = false;
      inform('二维码已生成，可下载 PNG 图片');
    },
    uuid_generator() {
      const count = boundedInteger(document.getElementById('uuidCount').value, 1, 100, '生成数量');
      show(Array.from({ length: count }, uuid).join('\n'));
    },
    password_generator() {
      const length = boundedInteger(document.getElementById('passwordLength').value, 8, 128, '密码长度');
      const options = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', digits: '0123456789', symbols: '!@#$%^&*()-_=+[]{}:?' };
      const selected = [...document.querySelectorAll('[name=passwordSet]:checked')].map(element => options[element.value]);
      show(generatePassword(length, selected));
      inform('使用安全随机数生成，并包含每种选中的字符类型');
    },
    color_picker() {
      const color = parseColor(input.value);
      document.getElementById('colorSwatch').style.backgroundColor = color.hex;
      document.getElementById('colorNative').value = color.hex;
      show('HEX  ' + color.hex.toUpperCase() + '\nRGB  ' + color.rgb + '\nHSL  ' + color.hsl);
    },
    text_diff() {
      const result = diffLines(input.value, document.getElementById('diffInput').value);
      const signs = { same: '  ', removed: '− ', added: '+ ' };
      const rows = result.map(line => {
        const row = document.createElement('div');
        row.className = 'diff-line ' + line.type;
        row.textContent = signs[line.type] + line.text;
        return row;
      });
      document.getElementById('diffResult').replaceChildren(...rows);
      show(result.map(line => signs[line.type] + line.text).join('\n'));
      inform('新增 ' + result.filter(line => line.type === 'added').length + ' 行，删除 ' + result.filter(line => line.type === 'removed').length + ' 行');
    },
  };
  if (actions[key]) bind('toolRun', actions[key]);
  bind('jsonMinify', () => { show(JSON.stringify(JSON.parse(input.value))); inform('JSON 已压缩'); });
  bind('toolEncode', actions.url_encoder);
  bind('toolDecode', () => show(decodeURIComponent(input.value)));
  document.getElementById('colorNative')?.addEventListener('input', event => {
    input.value = event.target.value;
    actions.color_picker();
  });
  if (key === 'color_picker') actions.color_picker();
  if (key.startsWith('image_')) initImageTools({ key, show, inform, bind });

  if (key === 'timestamp_converter') {
    const timestamp = document.getElementById('timestampInput');
    const dateField = document.getElementById('dateInput');
    const unit = document.getElementById('timestampUnit');
    document.getElementById('timezoneHint').textContent = '本地时区：' + Intl.DateTimeFormat().resolvedOptions().timeZone;
    bind('timestampToDate', () => {
      if (!/^-?\d+$/.test(timestamp.value.trim())) throw new Error('请输入整数时间戳');
      const numeric = Number(timestamp.value);
      const date = new Date(numeric * Number(unit.value));
      if (!Number.isSafeInteger(numeric) || Number.isNaN(date.getTime())) throw new Error('时间戳超出支持范围');
      dateField.value = localDateInput(date);
      show('本地时间：' + date.toLocaleString('zh-CN', { hour12: false }) + '\nUTC：' + date.toISOString());
    });
    bind('dateToTimestamp', () => {
      if (!dateField.value) throw new Error('请选择日期时间');
      const date = new Date(dateField.value);
      if (Number.isNaN(date.getTime())) throw new Error('日期时间无效');
      timestamp.value = String(Math.floor(date.getTime() / Number(unit.value)));
      show('秒：' + Math.floor(date.getTime() / 1000) + '\n毫秒：' + date.getTime() + '\nUTC：' + date.toISOString());
    });
    bind('useNow', () => {
      const now = new Date();
      dateField.value = localDateInput(now);
      timestamp.value = String(Math.floor(now.getTime() / Number(unit.value)));
      show('本地时间：' + now.toLocaleString('zh-CN', { hour12: false }) + '\nUTC：' + now.toISOString());
    });
  }

  if (key === 'public_ip') {
    let address = '';
    let detecting = false;
    const refresh = document.getElementById('refreshIp');
    const copy = document.getElementById('copyIp');
    const display = document.getElementById('publicIpValue');
    async function detect() {
      if (detecting) return;
      detecting = true;
      refresh.disabled = true;
      copy.disabled = true;
      display.textContent = '正在检测…';
      inform('');
      try {
        const result = await (await request('/api/public-ip')).json();
        if (result.ip) {
          address = result.ip;
          document.getElementById('ipSource').textContent = result.source + ' · IPv' + result.version;
        } else {
          let external;
          for (const endpoint of ['https://api64.ipify.org?format=json', 'https://api.ipify.org?format=json']) {
            try {
              const response = await fetch(endpoint, { signal: AbortSignal.timeout(5000), referrerPolicy: 'no-referrer' });
              if (!response.ok) continue;
              external = await response.json();
              if (typeof external.ip === 'string' && /^[\da-f:.]+$/i.test(external.ip)) break;
              external = null;
            } catch { external = null; }
          }
          if (!external) throw new Error('网络查询暂不可用，请检查连接后重新检测');
          address = external.ip;
          document.getElementById('ipSource').textContent = '由当前浏览器查询 ipify · 网络出口地址';
        }
        display.textContent = address;
        copy.disabled = false;
      } catch (error) {
        address = '';
        display.textContent = '暂时无法获取';
        inform(error.message, true);
      } finally { detecting = false; refresh.disabled = false; }
    }
    refresh.addEventListener('click', detect);
    bind('copyIp', () => copyText(address));
    detect();
  }
  window.addEventListener('pagehide', () => { if (qrUrl) URL.revokeObjectURL(qrUrl); });
}
