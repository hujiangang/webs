(function () {
    const viewer = document.querySelector("[data-admin-viewer]");
    const image = viewer.querySelector("[data-admin-viewer-image]");
    const closeButton = viewer.querySelector("[data-admin-viewer-close]");
    let opener;

    function closeViewer() {
        viewer.hidden = true;
        image.removeAttribute("src");
        document.body.style.overflow = "";
        if (opener) opener.focus();
    }
    document.querySelectorAll("[data-preview-src]").forEach(function (button) {
        button.addEventListener("click", function () {
            opener = button;
            image.src = button.dataset.previewSrc;
            viewer.hidden = false;
            document.body.style.overflow = "hidden";
            closeButton.focus();
        });
    });
    closeButton.addEventListener("click", closeViewer);
    viewer.addEventListener("click", function (event) {
        if (event.target === viewer) closeViewer();
    });
    document.addEventListener("keydown", function (event) {
        if (!viewer.hidden && event.key === "Escape") closeViewer();
    });
})();

(function () {
    const form = document.querySelector("[data-edit-form]");
    if (!form) return;
    const status = document.querySelector("[data-edit-status]");
    const uploadError = document.querySelector("[data-upload-error]");
    let dirty = form.dataset.unsaved === "true";
    let submitting = false;

    form.addEventListener("input", function () {
        dirty = true;
        status.textContent = "有未保存的修改，请先保存资料再管理图片。";
    });
    form.addEventListener("submit", function () {
        // 仅放行本次表单导航；服务端保存失败后会回显草稿及未保存状态。
        submitting = true;
        status.textContent = "正在保存资料…";
    });
    document.querySelectorAll("[data-image-form]").forEach(function (imageForm) {
        imageForm.addEventListener("submit", function (event) {
            if (dirty) {
                event.preventDefault();
                uploadError.textContent = "资料还有未保存的修改，请先点击“保存资料”，再上传或撤销图片。";
                uploadError.hidden = false;
                uploadError.scrollIntoView({behavior: "smooth", block: "center"});
                return;
            }
            submitting = true;
            const button = imageForm.querySelector('button[type="submit"]');
            if (button) { button.disabled = true; button.textContent = "处理中…"; }
        });
    });
    window.addEventListener("beforeunload", function (event) {
        if (dirty && !submitting) {
            event.preventDefault();
            event.returnValue = "";
        }
    });
    window.addEventListener("pageshow", function () { submitting = false; });
})();
