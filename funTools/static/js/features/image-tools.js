import { boundedInteger } from './tool-logic.js';

export function initImageTools({ key, show, inform, bind }) {
  const fileInput = document.getElementById('imageToolFile');
  const source = document.getElementById('imageSource');
  const process = document.getElementById('imageProcess');
  const result = document.getElementById('imageResult');
  let original = null;
  let sourceUrl = '';
  let resultUrl = '';
  let loadSequence = 0;
  let processing = false;
  const megabyte = 1024 * 1024;
  const sizeLabel = value => value >= megabyte ? (value / megabyte).toFixed(2) + ' MB' : (value / 1024).toFixed(1) + ' KB';

  async function loadFile() {
    const sequence = ++loadSequence;
    process.disabled = true;
    original = null;
    source.hidden = true;
    result.hidden = true;
    inform('');
    const file = fileInput.files[0];
    if (!file) return;
    try {
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) throw new Error('请选择 PNG、JPG 或 WebP 图片');
      if (file.size > 20 * megabyte) throw new Error('图片不能超过 20 MB');
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
      sourceUrl = URL.createObjectURL(file);
      source.src = sourceUrl;
      await source.decode();
      if (sequence !== loadSequence) return;
      if (source.naturalWidth * source.naturalHeight > 40000000) throw new Error('图片不能超过 4000 万像素');
      original = file;
      source.hidden = false;
      process.disabled = false;
      document.getElementById('imageInfo').textContent = file.name + ' · ' + source.naturalWidth + ' × ' + source.naturalHeight + ' · ' + sizeLabel(file.size);
      if (key === 'image_crop') {
        document.getElementById('cropX').value = '0';
        document.getElementById('cropY').value = '0';
        document.getElementById('cropWidth').value = source.naturalWidth;
        document.getElementById('cropHeight').value = source.naturalHeight;
      }
    } catch (error) { inform(error.message || '图片读取失败', true); }
  }
  fileInput.addEventListener('change', loadFile);
  document.getElementById('imageQuality')?.addEventListener('input', event => {
    document.getElementById('qualityValue').textContent = event.target.value + '%';
  });

  async function processImage() {
    if (!original || processing) return;
    processing = true;
    fileInput.disabled = true;
    result.hidden = true;
    try {
      if (key === 'image_to_base64') {
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('图片读取失败'));
          reader.readAsDataURL(original);
        });
        show(dataUrl);
        inform('已生成原始图片的 Data URL，可复制或下载文本');
        return;
      }
      const sourceWidth = source.naturalWidth;
      const sourceHeight = source.naturalHeight;
      let cropX = 0;
      let cropY = 0;
      let cropWidth = sourceWidth;
      let cropHeight = sourceHeight;
      if (key === 'image_crop') {
        cropX = boundedInteger(document.getElementById('cropX').value, 0, sourceWidth - 1, '起点 X');
        cropY = boundedInteger(document.getElementById('cropY').value, 0, sourceHeight - 1, '起点 Y');
        cropWidth = boundedInteger(document.getElementById('cropWidth').value, 1, sourceWidth - cropX, '裁剪宽度');
        cropHeight = boundedInteger(document.getElementById('cropHeight').value, 1, sourceHeight - cropY, '裁剪高度');
      }
      let width = cropWidth;
      let height = cropHeight;
      if (key === 'image_compress') {
        const maximum = boundedInteger(document.getElementById('imageMaxSize').value, 0, 12000, '最长边');
        if (maximum && Math.max(width, height) > maximum) {
          const ratio = maximum / Math.max(width, height);
          width = Math.max(1, Math.round(width * ratio));
          height = Math.max(1, Math.round(height * ratio));
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('当前浏览器无法创建图片画布');
      const format = document.getElementById('imageFormat')?.value || 'image/png';
      if (format === 'image/jpeg') {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
      }
      context.imageSmoothingQuality = 'high';
      context.drawImage(source, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height);
      if (key === 'image_watermark') {
        const text = document.getElementById('watermarkText').value.trim();
        if (!text) throw new Error('请输入水印文字');
        const fontSize = boundedInteger(document.getElementById('watermarkFontSize').value, 8, 300, '字号');
        const position = document.getElementById('watermarkPosition').value;
        const padding = Math.min(24, width * 0.04, height * 0.04);
        context.font = fontSize + 'px "Microsoft YaHei", sans-serif';
        context.fillStyle = document.getElementById('watermarkColor').value;
        context.globalAlpha = Number(document.getElementById('watermarkOpacity').value) / 100;
        context.textAlign = position === 'center' ? 'center' : position === 'top-left' ? 'left' : 'right';
        context.textBaseline = position === 'center' ? 'middle' : position === 'top-left' ? 'top' : 'bottom';
        context.fillText(text, position === 'center' ? width / 2 : position === 'top-left' ? padding : width - padding,
          position === 'center' ? height / 2 : position === 'top-left' ? padding : height - padding, width - padding * 2);
      }
      const quality = Number(document.getElementById('imageQuality')?.value || 80) / 100;
      const blob = await new Promise(resolve => canvas.toBlob(resolve, format, quality));
      if (!blob || !blob.size) throw new Error('图片生成失败，请缩小尺寸后重试');
      if (blob.type !== format) throw new Error('当前浏览器不支持该输出格式，请选择 PNG 或 JPG');
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      resultUrl = URL.createObjectURL(blob);
      document.getElementById('imagePreview').src = resultUrl;
      const link = document.getElementById('imageDownload');
      link.href = resultUrl;
      link.download = original.name.replace(/\.[^.]+$/, '') + '-funtools.' + ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[format]);
      const difference = (1 - blob.size / original.size) * 100;
      document.getElementById('imageResultInfo').textContent = width + ' × ' + height + ' · ' + sizeLabel(blob.size) + ' · ' + (difference >= 0 ? '减小 ' : '增大 ') + Math.abs(difference).toFixed(1) + '%';
      result.hidden = false;
      inform(key === 'image_compress' && difference < 0 ? '输出比原图更大，可降低画质或改用 WebP 格式' : '处理完成，可以预览并下载图片');
    } finally { processing = false; fileInput.disabled = false; }
  }
  bind('imageProcess', processImage);
  window.addEventListener('pagehide', () => {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
  });
}
