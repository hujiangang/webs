import { initImageBatchResize } from './features/image-resize.js';
import { initImageSimilarityRename } from './features/image-rename.js';
import { initWatermarkEditor } from './features/watermark.js';
import { initVideoFrameCapture } from './features/video-frame.js';
import { initSidebar } from './layout/sidebar.js';
import { createStatusController } from './shared/status.js';

const status = createStatusController();

initSidebar();
initWatermarkEditor({ status });
initVideoFrameCapture({ status });
initImageSimilarityRename({ status });
initImageBatchResize({ status });
