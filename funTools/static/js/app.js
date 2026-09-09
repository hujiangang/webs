import { initImageBatchResize } from './features/image-resize.js';
import { initImageSimilarityRename } from './features/image-rename.js';
import { initWatermarkEditor } from './features/watermark.js';
import { initVideoFrameCapture } from './features/video-frame.js';
import { initSidebar } from './layout/sidebar.js';
import { createStatusController } from './shared/status.js';
import { initTools } from './features/tools.js';
import { recordUse } from './shared/usage.js';

const status = createStatusController();
initSidebar();
initWatermarkEditor({ status });
initVideoFrameCapture({ status });
initImageSimilarityRename({ status });
initImageBatchResize({ status });
initTools();

const tool = document.querySelector('.tool-page')?.dataset.tool;
recordUse(tool || document.querySelector('[data-current-tool]')?.dataset.currentTool);
const donation = document.getElementById('donationDialog');
document.querySelectorAll('[data-donation]').forEach(button => button.addEventListener('click', () => donation?.showModal()));
document.querySelector('[data-close-dialog]')?.addEventListener('click', () => donation?.close());
donation?.addEventListener('click', event => { if (event.target === donation) donation.close(); });
document.addEventListener('keydown', event => {
  if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
    event.preventDefault();
    const search = document.getElementById('toolSearch');
    if (search) { search.focus(); search.scrollIntoView({ block: 'center' }); }
    else window.location.href = '/#catalog';
  }
});
