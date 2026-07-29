import { blobToDataUrl, readFileAsDataUrl, readResponseError, stripDataUrlPrefix } from '../shared/file.js';

export function initWatermarkEditor({ status }) {
  const watermarkUploadIcon = document.getElementById('watermarkUploadIcon');
  const watermarkImage = document.getElementById('watermarkImage');
  const uploadPanel = document.querySelector('.upload-panel');
  const watermarkImageView = document.getElementById('watermarkImageView');
  const watermarkImageSize = document.getElementById('watermarkImageSize');
  const watermarkPreviewViewport = document.getElementById('watermarkPreviewViewport');
  const watermarkPreviewWrap = document.getElementById('watermarkPreviewWrap');
  const watermarkPreview = document.getElementById('watermarkPreview');
  const watermarkMaskCanvas = document.getElementById('watermarkMaskCanvas');
  const watermarkBrushCursor = document.getElementById('watermarkBrushCursor');
  const watermarkBrushSize = document.getElementById('watermarkBrushSize');
  const watermarkBrushSizeLabel = document.getElementById('watermarkBrushSizeLabel');
  const watermarkReset = document.getElementById('watermarkReset');
  const watermarkDownload = document.getElementById('watermarkDownload');

  if (!watermarkImage || !uploadPanel) {
    return;
  }

  let watermarkObjectUrl = '';
  let watermarkImageBase64 = '';
  let watermarkSourceName = '图片.png';
  let previewBaseScale = 1;
  let previewZoom = 1;
  let previewOffsetX = 0;
  let previewOffsetY = 0;
  let brushSize = 72;
  let isErasing = false;
  let isWatermarkProcessing = false;
  let currentStrokeChanged = false;
  let activePointerId = null;
  let lastErasePoint = null;

  function setWatermarkProcessingState(processing) {
    isWatermarkProcessing = processing;
    if (watermarkImageView) {
      watermarkImageView.classList.toggle('processing', processing);
    }
    if (processing && watermarkPreviewWrap) {
      watermarkPreviewWrap.classList.remove('show-brush');
    }
  }

  function updateBrushSize() {
    if (!watermarkBrushSize || !watermarkBrushSizeLabel || !watermarkBrushCursor) {
      return;
    }
    brushSize = Number(watermarkBrushSize.value);
    watermarkBrushSizeLabel.textContent = `${brushSize}px`;
    watermarkBrushCursor.style.setProperty('--brush-size', `${brushSize}px`);
  }

  function updatePreviewTransform() {
    if (!watermarkPreviewWrap) {
      return;
    }
    const scale = previewBaseScale * previewZoom;
    watermarkPreviewWrap.style.setProperty('--preview-scale', String(scale));
    watermarkPreviewWrap.style.setProperty('--preview-x', `${previewOffsetX}px`);
    watermarkPreviewWrap.style.setProperty('--preview-y', `${previewOffsetY}px`);
  }

  function centerPreviewInViewport() {
    if (!watermarkPreview || !watermarkPreviewViewport) {
      return;
    }
    const scale = previewBaseScale * previewZoom;
    previewOffsetX = (watermarkPreviewViewport.clientWidth - watermarkPreview.naturalWidth * scale) / 2;
    previewOffsetY = (watermarkPreviewViewport.clientHeight - watermarkPreview.naturalHeight * scale) / 2;
  }

  function clearMaskCanvas() {
    if (!watermarkMaskCanvas) {
      return;
    }
    const ctx = watermarkMaskCanvas.getContext('2d');
    ctx.clearRect(0, 0, watermarkMaskCanvas.width, watermarkMaskCanvas.height);
  }

  function buildWatermarkMaskBase64() {
    if (!watermarkMaskCanvas) {
      return '';
    }
    const sourceCtx = watermarkMaskCanvas.getContext('2d');
    const sourceData = sourceCtx.getImageData(0, 0, watermarkMaskCanvas.width, watermarkMaskCanvas.height);
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = watermarkMaskCanvas.width;
    outputCanvas.height = watermarkMaskCanvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    const outputData = outputCtx.createImageData(outputCanvas.width, outputCanvas.height);

    // IOPaint 使用 255 表示需要修复的区域，透明处统一转成黑色背景。
    for (let index = 0; index < sourceData.data.length; index += 4) {
      const masked = sourceData.data[index + 3] > 0;
      const color = masked ? 255 : 0;
      outputData.data[index] = color;
      outputData.data[index + 1] = color;
      outputData.data[index + 2] = color;
      outputData.data[index + 3] = 255;
    }

    outputCtx.putImageData(outputData, 0, 0);
    return stripDataUrlPrefix(outputCanvas.toDataURL('image/png'));
  }

  function resetWatermarkView() {
    previewZoom = 1;
    centerPreviewInViewport();
    updatePreviewTransform();
  }

  function fitPreviewToViewport() {
    if (!watermarkPreview || !watermarkPreviewViewport || !watermarkPreviewWrap) {
      return;
    }
    const viewportWidth = watermarkPreviewViewport.clientWidth;
    const viewportHeight = watermarkPreviewViewport.clientHeight;
    previewBaseScale = Math.min(
      viewportWidth / watermarkPreview.naturalWidth,
      viewportHeight / watermarkPreview.naturalHeight,
      1,
    );
    watermarkPreviewWrap.style.width = `${watermarkPreview.naturalWidth}px`;
    watermarkPreviewWrap.style.height = `${watermarkPreview.naturalHeight}px`;
    resetWatermarkView();
  }

  async function showWatermarkPreview(file) {
    if (
      !file ||
      !file.type.startsWith('image/') ||
      !watermarkPreview ||
      !watermarkImageView ||
      !watermarkImageSize ||
      !watermarkMaskCanvas
    ) {
      return;
    }

    let dataUrl = '';
    try {
      dataUrl = await readFileAsDataUrl(file, '图片读取失败');
    } catch (error) {
      status.set(error.message);
      return;
    }

    watermarkImageBase64 = stripDataUrlPrefix(dataUrl);
    watermarkSourceName = file.name || '图片.png';
    watermarkObjectUrl = dataUrl;
    watermarkPreview.onload = () => {
      watermarkImageSize.textContent = `${watermarkPreview.naturalWidth}x${watermarkPreview.naturalHeight}`;
      watermarkMaskCanvas.width = watermarkPreview.naturalWidth;
      watermarkMaskCanvas.height = watermarkPreview.naturalHeight;
      watermarkMaskCanvas.style.width = `${watermarkPreview.naturalWidth}px`;
      watermarkMaskCanvas.style.height = `${watermarkPreview.naturalHeight}px`;
      watermarkImageView.hidden = false;
      uploadPanel.hidden = true;
      uploadPanel.classList.remove('drag-over');
      clearMaskCanvas();
      fitPreviewToViewport();
      status.set('拖动鼠标标记要擦除的区域，释放鼠标后开始处理');
    };
    watermarkPreview.src = dataUrl;
  }

  function getImagePoint(event) {
    const rect = watermarkPreviewWrap.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / (previewBaseScale * previewZoom),
      y: (event.clientY - rect.top) / (previewBaseScale * previewZoom),
    };
  }

  function moveBrushCursor(event) {
    if (!watermarkBrushCursor || !watermarkPreviewWrap) {
      return;
    }
    const point = getImagePoint(event);
    watermarkBrushCursor.style.left = `${point.x}px`;
    watermarkBrushCursor.style.top = `${point.y}px`;
  }

  function paintErasePoint(point) {
    if (!watermarkMaskCanvas) {
      return;
    }
    const ctx = watermarkMaskCanvas.getContext('2d');
    ctx.fillStyle = 'rgba(250, 204, 21, 0.58)';
    ctx.beginPath();
    ctx.arc(point.x, point.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function paintEraseStroke(fromPoint, toPoint) {
    if (!watermarkMaskCanvas) {
      return;
    }
    const ctx = watermarkMaskCanvas.getContext('2d');
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.58)';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(fromPoint.x, fromPoint.y);
    ctx.lineTo(toPoint.x, toPoint.y);
    ctx.stroke();
  }

  function drawErase(event) {
    const point = getImagePoint(event);
    if (lastErasePoint) {
      paintEraseStroke(lastErasePoint, point);
    } else {
      paintErasePoint(point);
    }
    currentStrokeChanged = true;
    lastErasePoint = point;
  }

  function applyProcessedWatermarkImage(dataUrl, imageBase64) {
    if (!watermarkPreview || !watermarkMaskCanvas || !watermarkImageSize) {
      return;
    }
    const previousWidth = watermarkPreview.naturalWidth;
    const previousHeight = watermarkPreview.naturalHeight;
    const previousZoom = previewZoom;
    const previousOffsetX = previewOffsetX;
    const previousOffsetY = previewOffsetY;

    watermarkPreview.onload = () => {
      watermarkImageBase64 = imageBase64;
      watermarkImageSize.textContent = `${watermarkPreview.naturalWidth}x${watermarkPreview.naturalHeight}`;
      watermarkMaskCanvas.width = watermarkPreview.naturalWidth;
      watermarkMaskCanvas.height = watermarkPreview.naturalHeight;
      watermarkMaskCanvas.style.width = `${watermarkPreview.naturalWidth}px`;
      watermarkMaskCanvas.style.height = `${watermarkPreview.naturalHeight}px`;
      clearMaskCanvas();

      if (
        previousWidth === watermarkPreview.naturalWidth &&
        previousHeight === watermarkPreview.naturalHeight
      ) {
        previewZoom = previousZoom;
        previewOffsetX = previousOffsetX;
        previewOffsetY = previousOffsetY;
        updatePreviewTransform();
      } else {
        fitPreviewToViewport();
      }
      status.set('处理完成，可继续拖动标记下一处区域');
    };

    watermarkObjectUrl = dataUrl;
    watermarkPreview.src = dataUrl;
  }

  async function processWatermarkMask() {
    if (isWatermarkProcessing || !watermarkImageBase64) {
      return;
    }

    setWatermarkProcessingState(true);
    status.set('已释放鼠标，正在提交后端处理...');

    try {
      const response = await fetch('/api/remove-watermark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: watermarkImageBase64,
          mask: buildWatermarkMaskBase64(),
        }),
      });

      if (!response.ok) {
        throw new Error(await readResponseError(response, '图片处理失败'));
      }

      const resultBlob = await response.blob();
      if (!resultBlob.type.startsWith('image/')) {
        throw new Error('后端未返回图片结果');
      }

      status.set('后端处理完成，正在更新图片...');
      const resultDataUrl = await blobToDataUrl(resultBlob, '处理结果读取失败');
      applyProcessedWatermarkImage(resultDataUrl, stripDataUrlPrefix(resultDataUrl));
    } catch (error) {
      status.set(error.message || '图片处理失败');
    } finally {
      setWatermarkProcessingState(false);
    }
  }

  function finishEraseStroke(event, shouldSubmit = true) {
    if (activePointerId === null) {
      return;
    }
    if (event && typeof event.pointerId === 'number' && event.pointerId !== activePointerId) {
      return;
    }

    const pointerId = activePointerId;
    const shouldProcess = shouldSubmit && currentStrokeChanged;
    activePointerId = null;
    isErasing = false;
    currentStrokeChanged = false;
    lastErasePoint = null;

    if (watermarkMaskCanvas && watermarkMaskCanvas.hasPointerCapture(pointerId)) {
      watermarkMaskCanvas.releasePointerCapture(pointerId);
    }
    if (shouldProcess) {
      processWatermarkMask();
    }
  }

  function zoomAtPointer(event) {
    if (!watermarkPreviewViewport || !watermarkPreviewWrap) {
      return;
    }
    event.preventDefault();
    const oldScale = previewBaseScale * previewZoom;
    const nextZoom = Math.min(12, Math.max(0.25, previewZoom * (event.deltaY < 0 ? 1.12 : 0.88)));
    const nextScale = previewBaseScale * nextZoom;
    const viewportRect = watermarkPreviewViewport.getBoundingClientRect();
    const mouseX = event.clientX - viewportRect.left;
    const mouseY = event.clientY - viewportRect.top;
    const imageX = (mouseX - previewOffsetX) / oldScale;
    const imageY = (mouseY - previewOffsetY) / oldScale;
    previewZoom = nextZoom;
    previewOffsetX = mouseX - imageX * nextScale;
    previewOffsetY = mouseY - imageY * nextScale;
    updatePreviewTransform();
    moveBrushCursor(event);
  }

  if (watermarkUploadIcon) {
    watermarkUploadIcon.addEventListener('click', () => {
      watermarkImage.click();
    });
  }

  watermarkImage.addEventListener('change', () => {
    showWatermarkPreview(watermarkImage.files[0]);
  });

  uploadPanel.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadPanel.classList.add('drag-over');
  });

  uploadPanel.addEventListener('dragleave', () => {
    uploadPanel.classList.remove('drag-over');
  });

  uploadPanel.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadPanel.classList.remove('drag-over');
    showWatermarkPreview(event.dataTransfer.files[0]);
  });

  if (watermarkBrushSize) {
    updateBrushSize();
    watermarkBrushSize.addEventListener('input', updateBrushSize);
  }

  if (watermarkMaskCanvas && watermarkPreviewWrap) {
    watermarkMaskCanvas.addEventListener('pointerenter', (event) => {
      if (isWatermarkProcessing) {
        return;
      }
      watermarkPreviewWrap.classList.add('show-brush');
      moveBrushCursor(event);
    });

    watermarkMaskCanvas.addEventListener('pointermove', (event) => {
      if (isWatermarkProcessing) {
        watermarkPreviewWrap.classList.remove('show-brush');
        return;
      }
      moveBrushCursor(event);
      if (isErasing && event.pointerId === activePointerId) {
        drawErase(event);
      }
    });

    watermarkMaskCanvas.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || isWatermarkProcessing) {
        return;
      }
      event.preventDefault();
      isErasing = true;
      activePointerId = event.pointerId;
      currentStrokeChanged = false;
      lastErasePoint = null;
      watermarkMaskCanvas.setPointerCapture(event.pointerId);
      moveBrushCursor(event);
      drawErase(event);
    });

    watermarkMaskCanvas.addEventListener('pointerup', (event) => {
      finishEraseStroke(event);
    });

    watermarkMaskCanvas.addEventListener('pointercancel', (event) => {
      finishEraseStroke(event, false);
    });

    watermarkMaskCanvas.addEventListener('pointerleave', () => {
      watermarkPreviewWrap.classList.remove('show-brush');
    });

    watermarkMaskCanvas.addEventListener('lostpointercapture', (event) => {
      finishEraseStroke(event);
    });
  }

  document.addEventListener('pointerup', (event) => {
    finishEraseStroke(event);
  });

  document.addEventListener('mouseup', () => {
    finishEraseStroke();
  });

  if (watermarkPreviewViewport) {
    watermarkPreviewViewport.addEventListener('wheel', zoomAtPointer, { passive: false });
  }

  if (watermarkReset) {
    watermarkReset.addEventListener('click', resetWatermarkView);
  }

  if (watermarkDownload) {
    watermarkDownload.addEventListener('click', () => {
      if (!watermarkObjectUrl) {
        return;
      }
      const link = document.createElement('a');
      link.href = watermarkObjectUrl;
      link.download = watermarkSourceName;
      link.click();
    });
  }

  window.addEventListener('resize', () => {
    if (!watermarkImageView || watermarkImageView.hidden) {
      return;
    }
    fitPreviewToViewport();
  });
}