export function initImageSimilarityRename({ status }) {
  const sourceDirInput = document.getElementById('imageRenameSourceDir');
  const referenceDirInput = document.getElementById('imageRenameReferenceDir');
  const pickSourceButton = document.getElementById('imageRenamePickSource');
  const pickReferenceButton = document.getElementById('imageRenamePickReference');
  const recursiveInput = document.getElementById('imageRenameRecursive');
  const keepExtensionInput = document.getElementById('imageRenameKeepExtension');
  const thresholdInput = document.getElementById('imageRenameThreshold');
  const thresholdValue = document.getElementById('imageRenameThresholdValue');
  const previewButton = document.getElementById('imageRenamePreview');
  const applyButton = document.getElementById('imageRenameApply');
  const rows = document.getElementById('imageRenameRows');
  const summary = document.getElementById('imageRenameSummary');
  const log = document.getElementById('imageRenameLog');
  const matchedCount = document.getElementById('imageRenameMatchedCount');

  if (!sourceDirInput || !referenceDirInput || !previewButton || !applyButton || !rows) {
    return;
  }

  let currentMatches = [];
  let isBusy = false;

  function setBusy(busy) {
    isBusy = busy;
    previewButton.disabled = busy;
    if (pickSourceButton) {
      pickSourceButton.disabled = busy;
    }
    if (pickReferenceButton) {
      pickReferenceButton.disabled = busy;
    }
    rows.querySelectorAll('.image-rename-row-action').forEach((button) => {
      button.disabled = busy || button.dataset.done === 'true';
    });
    applyButton.disabled = busy || getSelectedOperations().length === 0;
    document.body.classList.toggle('image-rename-busy', busy);
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

  function updateThresholdLabel() {
    if (thresholdInput && thresholdValue) {
      thresholdValue.textContent = Number(thresholdInput.value).toFixed(2);
    }
  }

  function validateInputs() {
    const sourceDir = sourceDirInput.value.trim();
    const referenceDir = referenceDirInput.value.trim();
    if (!sourceDir || !referenceDir) {
      throw new Error('请选择源文件夹和参考文件夹');
    }
    return { sourceDir, referenceDir };
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

  async function previewMatches() {
    if (isBusy) {
      return;
    }

    let inputs;
    try {
      inputs = validateInputs();
    } catch (error) {
      status.set(error.message);
      return;
    }

    setBusy(true);
    setLog([]);
    renderEmptyRow('正在分析图片相似度...');
    status.set('正在分析源文件夹和参考文件夹...');

    try {
      const response = await fetch('/api/image-rename/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_dir: inputs.sourceDir,
          reference_dir: inputs.referenceDir,
          recursive: Boolean(recursiveInput && recursiveInput.checked),
          keep_extension: !keepExtensionInput || keepExtensionInput.checked,
          min_score: Number(thresholdInput ? thresholdInput.value : 0.45),
        }),
      });
      const data = await readJsonResponse(response);
      currentMatches = data.matches || [];
      renderMatches(currentMatches);
      if (matchedCount) {
        matchedCount.textContent = String(data.matched_count || 0);
      }
      setSummary(`源图片 ${data.source_count} 张，参考图片 ${data.reference_count} 张，生成 ${data.matched_count} 条建议，未匹配 ${data.unmatched_count} 张。`);
      setLog(data.warnings || []);
      status.set(currentMatches.length ? '匹配完成，可整批确认，也可单行确认命名' : '没有找到达到最低相似度的匹配');
    } catch (error) {
      currentMatches = [];
      renderEmptyRow(error.message || '分析失败');
      setSummary('分析失败，源文件夹没有被修改。');
      status.set(error.message || '分析失败');
    } finally {
      setBusy(false);
    }
  }

  async function applySelectedRename() {
    const operations = getSelectedOperations();
    if (!operations.length) {
      status.set('请先选择要重命名的匹配项');
      return;
    }
    await applyRenameOperations(operations, '批量');
  }

  async function applySingleRename(index) {
    const match = currentMatches[index];
    if (!match) {
      status.set('当前行匹配数据不存在');
      return;
    }
    await applyRenameOperations([buildOperation(match)], '单行', index);
  }

  async function applyRenameOperations(operations, mode, rowIndex = null) {
    if (isBusy) {
      return;
    }

    setBusy(true);
    setLog([]);
    status.set(mode === '单行' ? '正在确认当前行命名...' : '正在执行重命名...');

    try {
      const response = await fetch('/api/image-rename/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_dir: sourceDirInput.value.trim(),
          operations,
        }),
      });
      const data = await readJsonResponse(response);
      setSummary(`重命名完成：成功 ${data.applied_count} 项，失败 ${data.failed_count} 项。`);
      setLog([
        ...(data.applied || []).map((item) => `${item.source_name} -> ${item.target_name}：${item.message}`),
        ...(data.failed || []).map((item) => `${item.source_path} -> ${item.target_name}：${item.message}`),
      ]);
      markAppliedRows(data.applied || [], rowIndex);
      status.set(data.failed_count ? '部分图片重命名失败，请查看日志' : '已完成命名');
    } catch (error) {
      setSummary('重命名失败，未能完成本次操作。');
      status.set(error.message || '重命名失败');
    } finally {
      setBusy(false);
    }
  }

  async function openSystemDirectoryPicker(target) {
    if (isBusy) {
      return;
    }

    const input = target === 'source' ? sourceDirInput : referenceDirInput;
    const title = target === 'source' ? '选择源文件夹' : '选择参考文件夹';
    const params = new URLSearchParams({ title });
    if (input.value.trim()) {
      params.set('initial_dir', input.value.trim());
    }

    setBusy(true);
    status.set('请在系统窗口中选择文件夹...');

    try {
      const response = await fetch(`/api/filesystem/select-directory?${params.toString()}`);
      const data = await readJsonResponse(response);
      if (!data.path) {
        status.set('已取消选择文件夹');
        return;
      }
      input.value = data.path;
      clearPreviewAfterFolderChange();
      status.set('已选择文件夹');
    } catch (error) {
      status.set(error.message || '无法打开系统文件夹选择框');
    } finally {
      setBusy(false);
    }
  }
  function clearPreviewAfterFolderChange() {
    currentMatches = [];
    if (matchedCount) {
      matchedCount.textContent = '0';
    }
    renderEmptyRow('等待分析结果');
    setSummary('源文件夹中的图片不会立即改名；点击“分析匹配”后先检查表格结果。');
    setLog([]);
    refreshApplyState();
  }

  function renderMatches(matches) {
    if (!matches.length) {
      renderEmptyRow('没有匹配结果');
      applyButton.disabled = true;
      return;
    }

    rows.innerHTML = matches
      .map((match, index) => `
        <tr data-index="${index}">
          <td class="image-rename-select-col">
            <input class="image-rename-row-check" type="checkbox" data-index="${index}" checked />
          </td>
          <td>${renderImageCell(match.source_path, match.source_name, match.source_size)}</td>
          <td>${renderImageCell(match.reference_path, match.reference_name, match.reference_size)}</td>
          <td><code>${escapeHtml(match.target_name)}</code></td>
          <td>${Math.round(Number(match.score || 0) * 100)}%</td>
          <td><span class="image-rename-confidence ${confidenceClass(match.confidence)}">${escapeHtml(match.confidence)}</span></td>
          <td class="image-rename-action-col">
            <button class="image-rename-row-action" type="button" data-index="${index}">确认命名</button>
          </td>
        </tr>
      `)
      .join('');
    refreshApplyState();
  }

  function renderImageCell(path, name, size) {
    return `
      <div class="image-rename-image-cell">
        <img class="image-rename-thumb" src="${thumbnailUrl(path)}" alt="${escapeHtml(name)}" loading="lazy" />
        <div class="image-rename-image-meta">
          <strong>${escapeHtml(name)}</strong>
          <small>${escapeHtml(size || '')}</small>
        </div>
      </div>
    `;
  }

  function thumbnailUrl(path) {
    return `/api/filesystem/thumbnail?size=88&path=${encodeURIComponent(path || '')}`;
  }

  function renderEmptyRow(message) {
    rows.innerHTML = `<tr><td colspan="7" class="image-rename-empty">${escapeHtml(message)}</td></tr>`;
  }

  function getSelectedOperations() {
    return Array.from(rows.querySelectorAll('.image-rename-row-check:checked:not(:disabled)'))
      .map((checkbox) => currentMatches[Number(checkbox.dataset.index)])
      .filter(Boolean)
      .map(buildOperation);
  }

  function buildOperation(match) {
    return {
      source_path: match.source_path,
      reference_path: match.reference_path,
      target_name: match.target_name,
      score: match.score,
    };
  }

  function markAppliedRows(appliedItems, rowIndex) {
    const appliedSourcePaths = new Set(appliedItems.map((item) => item.source_path));
    rows.querySelectorAll('tr[data-index]').forEach((row) => {
      const index = Number(row.dataset.index);
      const match = currentMatches[index];
      const applied = rowIndex === index || (match && appliedSourcePaths.has(match.source_path));
      if (!applied) {
        return;
      }
      row.classList.add('is-renamed');
      row.querySelector('.image-rename-row-check')?.setAttribute('disabled', 'disabled');
      const button = row.querySelector('.image-rename-row-action');
      if (button) {
        button.dataset.done = 'true';
        button.disabled = true;
        button.textContent = '已确认';
      }
    });
    refreshApplyState();
  }

  function refreshApplyState() {
    applyButton.disabled = isBusy || getSelectedOperations().length === 0;
  }

  function confidenceClass(value) {
    if (value === '高') {
      return 'is-high';
    }
    if (value === '中') {
      return 'is-medium';
    }
    return 'is-low';
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  updateThresholdLabel();
  thresholdInput?.addEventListener('input', updateThresholdLabel);
  previewButton.addEventListener('click', previewMatches);
  applyButton.addEventListener('click', applySelectedRename);
  pickSourceButton?.addEventListener('click', () => openSystemDirectoryPicker('source'));
  pickReferenceButton?.addEventListener('click', () => openSystemDirectoryPicker('reference'));
  rows.addEventListener('change', (event) => {
    if (event.target.classList.contains('image-rename-row-check')) {
      refreshApplyState();
    }
  });
  rows.addEventListener('click', (event) => {
    const button = event.target.closest('.image-rename-row-action');
    if (button && !button.disabled) {
      applySingleRename(Number(button.dataset.index));
    }
  });
}

