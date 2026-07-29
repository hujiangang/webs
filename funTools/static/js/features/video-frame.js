export function initVideoFrameCapture({ status }) {
  const videoFrameInput = document.getElementById('videoFrameInput');
  const videoFrameDrop = document.getElementById('videoFrameDrop');
  const videoFrameReplace = document.getElementById('videoFrameReplace');
  const videoFramePlayerPanel = document.getElementById('videoFramePlayerPanel');
  const videoFramePlayer = document.getElementById('videoFramePlayer');
  const videoFrameInfo = document.getElementById('videoFrameInfo');
  const videoFrameCapture = document.getElementById('videoFrameCapture');
  const videoFrameDownload = document.getElementById('videoFrameDownload');
  const videoFrameCanvas = document.getElementById('videoFrameCanvas');
  const videoFramePreviewBox = document.getElementById('videoFramePreviewBox');
  const videoFrameEmpty = document.getElementById('videoFrameEmpty');

  if (!videoFrameInput || !videoFrameDrop) {
    return;
  }

  let videoFrameObjectUrl = '';
  let videoFrameCapturedUrl = '';
  let videoFrameSourceName = 'video';

  function revokeVideoFrameObjectUrl() {
    if (videoFrameObjectUrl) {
      URL.revokeObjectURL(videoFrameObjectUrl);
      videoFrameObjectUrl = '';
    }
  }

  function revokeVideoFrameCapturedUrl() {
    if (videoFrameCapturedUrl) {
      URL.revokeObjectURL(videoFrameCapturedUrl);
      videoFrameCapturedUrl = '';
    }
  }

  function formatVideoFrameTime(seconds) {
    if (!Number.isFinite(seconds)) {
      return '00-00-00';
    }
    const wholeSeconds = Math.max(0, Math.floor(seconds));
    const hours = String(Math.floor(wholeSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((wholeSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(wholeSeconds % 60).padStart(2, '0');
    return `${hours}-${minutes}-${secs}`;
  }

  function getFileNameWithoutExtension(name) {
    return String(name || 'video').replace(/\.[^.]+$/, '') || 'video';
  }

  function resetVideoFrameCapture() {
    revokeVideoFrameCapturedUrl();
    if (videoFrameCanvas) {
      const ctx = videoFrameCanvas.getContext('2d');
      ctx.clearRect(0, 0, videoFrameCanvas.width, videoFrameCanvas.height);
      videoFrameCanvas.width = 0;
      videoFrameCanvas.height = 0;
    }
    if (videoFramePreviewBox) {
      videoFramePreviewBox.classList.remove('has-frame');
    }
    if (videoFrameDownload) {
      videoFrameDownload.disabled = true;
    }
    if (videoFrameEmpty) {
      videoFrameEmpty.textContent = '截图会显示在这里';
    }
  }

  function updateVideoFrameInfo() {
    if (!videoFramePlayer || !videoFrameInfo) {
      return;
    }
    const width = videoFramePlayer.videoWidth || 0;
    const height = videoFramePlayer.videoHeight || 0;
    const current = formatVideoFrameTime(videoFramePlayer.currentTime).replaceAll('-', ':');
    const duration = formatVideoFrameTime(videoFramePlayer.duration).replaceAll('-', ':');
    if (!width || !height) {
      videoFrameInfo.textContent = '等待视频载入';
      return;
    }
    videoFrameInfo.textContent = `${width}x${height} · ${current} / ${duration}`;
  }

  function setVideoFrameReady(ready) {
    if (videoFrameCapture) {
      videoFrameCapture.disabled = !ready;
    }
  }

  function showVideoFrameFile(file) {
    if (!file || !videoFramePlayer || !videoFramePlayerPanel) {
      return;
    }
    if (!file.type.startsWith('video/')) {
      status.set('请选择视频文件');
      return;
    }

    revokeVideoFrameObjectUrl();
    resetVideoFrameCapture();
    videoFrameSourceName = getFileNameWithoutExtension(file.name);
    videoFrameObjectUrl = URL.createObjectURL(file);
    videoFramePlayer.src = videoFrameObjectUrl;
    videoFramePlayer.load();
    videoFrameDrop.hidden = true;
    videoFramePlayerPanel.hidden = false;
    setVideoFrameReady(false);
    status.set('视频正在载入...');
  }

  function captureVideoFrame() {
    if (!videoFramePlayer || !videoFrameCanvas || !videoFramePreviewBox) {
      return;
    }
    if (!videoFramePlayer.videoWidth || !videoFramePlayer.videoHeight) {
      status.set('视频还没有载入完成，暂时不能截取');
      return;
    }

    videoFrameCanvas.width = videoFramePlayer.videoWidth;
    videoFrameCanvas.height = videoFramePlayer.videoHeight;
    const ctx = videoFrameCanvas.getContext('2d');
    ctx.drawImage(videoFramePlayer, 0, 0, videoFrameCanvas.width, videoFrameCanvas.height);
    videoFramePreviewBox.classList.add('has-frame');
    if (videoFrameEmpty) {
      videoFrameEmpty.textContent = '';
    }

    videoFrameCanvas.toBlob((blob) => {
      if (!blob) {
        status.set('当前浏览器未能生成截图');
        return;
      }
      revokeVideoFrameCapturedUrl();
      videoFrameCapturedUrl = URL.createObjectURL(blob);
      if (videoFrameDownload) {
        videoFrameDownload.disabled = false;
      }
      status.set('已截取当前帧，可下载截图');
    }, 'image/png');
  }

  function downloadVideoFrame() {
    if (!videoFrameCapturedUrl || !videoFramePlayer) {
      return;
    }
    const link = document.createElement('a');
    link.href = videoFrameCapturedUrl;
    link.download = `${videoFrameSourceName}_${formatVideoFrameTime(videoFramePlayer.currentTime)}.png`;
    link.click();
  }

  videoFrameInput.addEventListener('change', () => {
    showVideoFrameFile(videoFrameInput.files[0]);
  });

  videoFrameDrop.addEventListener('dragover', (event) => {
    event.preventDefault();
    videoFrameDrop.classList.add('drag-over');
  });

  videoFrameDrop.addEventListener('dragleave', () => {
    videoFrameDrop.classList.remove('drag-over');
  });

  videoFrameDrop.addEventListener('drop', (event) => {
    event.preventDefault();
    videoFrameDrop.classList.remove('drag-over');
    showVideoFrameFile(event.dataTransfer.files[0]);
  });

  if (videoFrameReplace) {
    videoFrameReplace.addEventListener('click', () => {
      videoFrameInput.click();
    });
  }

  if (videoFramePlayer) {
    videoFramePlayer.addEventListener('loadedmetadata', () => {
      setVideoFrameReady(true);
      updateVideoFrameInfo();
      status.set('视频已载入，播放或拖动进度条后可截取当前帧');
    });
    videoFramePlayer.addEventListener('timeupdate', updateVideoFrameInfo);
    videoFramePlayer.addEventListener('seeked', updateVideoFrameInfo);
    videoFramePlayer.addEventListener('error', () => {
      setVideoFrameReady(false);
      status.set('当前视频格式浏览器无法播放，请换一个视频文件');
    });
  }

  if (videoFrameCapture) {
    videoFrameCapture.addEventListener('click', captureVideoFrame);
  }

  if (videoFrameDownload) {
    videoFrameDownload.addEventListener('click', downloadVideoFrame);
  }
}