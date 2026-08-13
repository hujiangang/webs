(function () {
    const viewer = document.querySelector("[data-admin-viewer]");
    if (!viewer) {
        return;
    }

    const image = viewer.querySelector("[data-admin-viewer-image]");
    const closeButton = viewer.querySelector("[data-admin-viewer-close]");
    const previewButtons = Array.from(document.querySelectorAll("[data-preview-src]"));

    function openViewer(src) {
        image.src = src;
        viewer.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closeViewer() {
        viewer.hidden = true;
        image.src = "";
        document.body.style.overflow = "";
    }

    previewButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            openViewer(button.dataset.previewSrc);
        });
    });

    closeButton.addEventListener("click", closeViewer);

    viewer.addEventListener("click", function (event) {
        if (event.target === viewer) {
            closeViewer();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!viewer.hidden && event.key === "Escape") {
            closeViewer();
        }
    });
})();

(function () {
    const autoUploadForms = Array.from(document.querySelectorAll("[data-auto-upload-form]"));

    function previewMainImage(input) {
        const panel = input.closest(".main-image-panel");
        const file = input.files[0];
        if (!panel || !file) {
            return;
        }

        const url = URL.createObjectURL(file);
        const previewButton = panel.querySelector(".image-preview-button");
        const emptyImage = panel.querySelector(".empty-image");
        if (previewButton) {
            previewButton.dataset.previewSrc = url;
            previewButton.querySelector("img").src = url;
        } else if (emptyImage) {
            emptyImage.outerHTML = '<button class="image-preview-button" type="button" data-preview-src="' + url + '" aria-label="查看主图大图"><img src="' + url + '" alt="主图预览"></button>';
        }
    }

    function previewExtraImage(input) {
        const grid = document.querySelector(".extra-grid");
        const file = input.files[0];
        if (!grid || !file) {
            return;
        }

        const url = URL.createObjectURL(file);
        const emptyExtra = grid.querySelector(".empty-extra");
        if (emptyExtra) {
            emptyExtra.remove();
        }
        const card = document.createElement("div");
        card.className = "extra-card-wrap uploading";
        card.innerHTML = '<button class="extra-card" type="button" data-preview-src="' + url + '" aria-label="查看新扩展图"><img src="' + url + '" alt="扩展图预览"><span>上传中</span></button>';
        grid.appendChild(card);
    }

    autoUploadForms.forEach(function (form) {
        const input = form.querySelector('input[type="file"]');
        if (!input) {
            return;
        }

        input.addEventListener("change", function () {
            if (!input.files.length) {
                return;
            }
            if (input.hasAttribute("data-main-upload")) {
                previewMainImage(input);
            }
            if (input.hasAttribute("data-extra-upload")) {
                previewExtraImage(input);
            }
            form.submit();
        });
    });
})();
