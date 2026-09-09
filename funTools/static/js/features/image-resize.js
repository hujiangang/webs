export function initImageBatchResize({ status }) {
  const sourceDirInput = document.getElementById('imageResizeSourceDir');
  const outputDirInput = document.getElementById('imageResizeOutputDir');
  const pickSourceButton = document.getElementById('imageResizePickSource');
  const pickOutputButton = document.getElementById('imageResizePickOutput');
  const modeInput = document.getElementById('imageResizeMode');
  const widthInput = document.getElementById('imageResizeWidth');
  const heightInput = document.getElementById('imageResizeHeight');
  const formatInput = document.getElementById('imageResizeFormat');
  const qualityInput = document.getElementById('imageResizeQuality');
  const qualityValue = document.getElementById('imageResizeQualityValue');
  const recursiveInput = document.getElementById('imageResizeRecursive');
  const preserveSubfoldersInput = document.getElementById('imageResizePreserveSubfolders');
  const overwriteInput = document.getElementById('imageResizeOverwrite');
  const runButton = document.getElementById('imageResizeRun');
  const summary = document.getElementById('imageResizeSummary');
  const rows = document.getElementById('imageResizeRows');
  const log = document.getElementById('imageResizeLog');
  const processedCount = document.getElementById('imageResizeProcessedCount');

  if (!sourceDirInput || !outputDirInput || !modeInput || !widthInput || !heightInput || !runButton || !rows) {
    return;
  }

  let isBusy = false;

  function setBusy(busy) {
    isBusy = busy;
    runButton.disabled = busy;
    if (pickSourceButton) {
      pickSourceButton.disabled = busy;
    }
    if (pickOutputButton) {
      pickOutputButton.disabled = busy;
    }
    document.body.classList.toggle('image-resize-busy', busy);
  }

  function setSummary(message) {
    if (summary) {
      summary.textContent = message;
    }
  }

  function setLog(messages) {
    if (!log) {
      return;
    }
    const items = Array.isArray(messages) ? messages.filter(Boolean) : [messages].filter(Boolean);
    log.hidden = items.length === 0;
    log.innerHTML = items.map((item) => `<div>${escapeHtml(item)}</div>`).join('');
  }

  async function readJsonResponse(response) {
    let data = null;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error('后端未返回有效 JSON');
    }
    if (!response.ok) {
      throw new Error(data.detail || '请求失败');
    }
    return data;
  }

  async function openSystemDirectoryPicker(target) {
    if (isBusy) {
      return;
    }

    const input = target === 'source' ? sourceDirInput : outputDirInput;
    const title = target === 'source' ? '选择源文件夹' : '选择输出文件夹';
    const params = new URLSearchParams({ title });
    if (input.value.trim()) {
      params.set('initial_dir', input.value.trim());
    }

    setBusy(true);
    status.set('请在系统窗口中选择文件夹...');

    try {
      const response = await fetch(`/api/filesystem/select-directory?${params.toString()}`, { headers: localHeaders });
      const data = await readJsonResponse(response);
      if (!data.path) {
        status.set('已取消选择文件夹');
        return;
      }
      input.value = data.path;
      clearResults();
      status.set('已选择文件夹');
    } catch (error) {
      status.set(error.message || '无法打开系统文件夹选择框');
    } finally {
      setBusy(false);
    }
  }

  function updateQualityLabel() {
    if (qualityInput && qualityValue) {
      qualityValue.textContent = qualityInput.value;
    }
  }

  function updateModeFields() {
    const mode = modeInput.value;
    const needsWidth = mode === 'fit_width' || mode === 'fit_box' || mode === 'exact';
    const needsHeight = mode === 'fit_height' || mode === 'fit_box' || mode === 'exact';
    widthInput.disabled = !needsWidth;
    heightInput.disabled = !needsHeight;
    widthInput.placeholder = needsWidth ? '输入宽度' : '按原图比例计算';
    heightInput.placeholder = needsHeight ? '输入高度' : '按原图比例计算';
  }

  function validatePayload() {
    const sourceDir = sourceDirInput.value.trim();
    const outputDir = outputDirInput.value.trim();
    if (!sourceDir || !outputDir) {
      throw new Error('请选择源文件夹和输出文件夹');
    }
    if (sourceDir === outputDir) {
      throw new Error('输出文件夹不能和源文件夹相同');
    }

    const mode = modeInput.value;
    const width = widthInput.value ? Number(widthInput.value) : null;
    const height = heightInput.value ? Number(heightInput.value) : null;
    if ((mode === 'fit_width' || mode === 'fit_box' || mode === 'exact') && !width) {
      throw new Error('当前尺寸模式需要输入宽度');
    }
    if ((mode === 'fit_height' || mode === 'fit_box' || mode === 'exact') && !height) {
      throw new Error('当前尺寸模式需要输入高度');
    }

    return {
      source_dir: sourceDir,
      output_dir: outputDir,
      mode,
      width,
      height,
      output_format: formatInput ? formatInput.value : 'original',
      quality: Number(qualityInput ? qualityInput.value : 92),
      recursive: Boolean(recursiveInput && recursiveInput.checked),
      preserve_subfolders: Boolean(preserveSubfoldersInput && preserveSubfoldersInput.checked),
      overwrite: Boolean(overwriteInput && overwriteInput.checked),
    };
  }

  async function runResize() {
    if (isBusy) {
      return;
    }

    let payload;
    try {
      payload = validatePayload();
    } catch (error) {
      status.set(error.message);
      return;
    }

    setBusy(true);
    setLog([]);
    renderEmptyRow('正在处理图片...');
    setSummary('正在批量调整图片尺寸，请等待后端处理完成。');
    status.set('正在批量处理图片...');

    try {
      const response = await fetch('/api/image-resize/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...localHeaders },
        body: JSON.stringify(payload),
      });
      const data = await readJsonResponse(response);
      renderRows(data.processed || []);
      if (processedCount) {
        processedCount.textContent = String(data.processed_count || 0);
      }
      setSummary(`源图片 ${data.source_count} 张，成功处理 ${data.processed_count} 张，失败 ${data.failed_count} 张。输出目录：${data.output_dir}`);
      setLog((data.failed || []).map((item) => `${item.source_name || item.source_path}：${item.message}`));
      status.set(data.failed_count ? '部分图片处理失败，请查看日志' : '批量修改尺寸完成');
    } catch (error) {
      renderEmptyRow(error.message || '处理失败');
      setSummary('处理失败，源文件没有被修改。');
      status.set(error.message || '处理失败');
    } finally {
      setBusy(false);
    }
  }

  function clearResults() {
    if (processedCount) {
      processedCount.textContent = '0';
    }
    renderEmptyRow('等待处理结果');
    setSummary('输出文件会保存到选定的输出文件夹；源文件夹中的图片不会被修改。');
    setLog([]);
  }

  function renderRows(items) {
    if (!items.length) {
      renderEmptyRow('没有生成图片');
      return;
    }

    rows.innerHTML = items
      .slice(0, 500)
      .map((item) => `
        <tr>
          <td title="${escapeHtml(item.source_path)}">${escapeHtml(item.source_name)}</td>
          <td>${escapeHtml(item.original_size)}</td>
          <td>${escapeHtml(item.target_size)}</td>
          <td title="${escapeHtml(item.output_path)}"><code>${escapeHtml(item.output_name)}</code></td>
          <td>${escapeHtml(item.format)}</td>
        </tr>
      `)
      .join('');

    if (items.length > 500) {
      rows.insertAdjacentHTML('beforeend', `<tr><td colspan="5" class="image-resize-empty">仅显示前 500 条，共 ${items.length} 条</td></tr>`);
    }
  }

  function renderEmptyRow(message) {
    rows.innerHTML = `<tr><td colspan="5" class="image-resize-empty">${escapeHtml(message)}</td></tr>`;
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  updateModeFields();
  updateQualityLabel();
  modeInput.addEventListener('change', updateModeFields);
  qualityInput?.addEventListener('input', updateQualityLabel);
  sourceDirInput.addEventListener('input', clearResults);
  outputDirInput.addEventListener('input', clearResults);
  pickSourceButton?.addEventListener('click', () => openSystemDirectoryPicker('source'));
  pickOutputButton?.addEventListener('click', () => openSystemDirectoryPicker('output'));
  runButton.addEventListener('click', runResize);
}
const localHeaders = { 'X-Funtools-Local': '1' };
