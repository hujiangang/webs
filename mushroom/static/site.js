(function () {
    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) {
        return;
    }

    const slides = Array.from(document.querySelectorAll("[data-carousel-slide]"));
    const previousButton = document.querySelector("[data-carousel-prev]");
    const nextButton = document.querySelector("[data-carousel-next]");
    let activeIndex = 0;

    function showSlide(nextIndex) {
        if (slides.length === 0 || nextIndex < 0 || nextIndex >= slides.length) {
            return;
        }

        slides[activeIndex].classList.remove("active");
        pauseVideo(slides[activeIndex]);
        slides[nextIndex].classList.add("active");
        activeIndex = nextIndex;
        updateButtons();
    }

    function updateButtons() {
        if (previousButton) {
            previousButton.classList.toggle("is-hidden", activeIndex === 0);
        }
        if (nextButton) {
            nextButton.classList.toggle("is-hidden", activeIndex === slides.length - 1);
        }
    }

    function pauseVideo(slide) {
        const video = slide.querySelector("video");
        if (video) {
            video.pause();
        }
    }

    if (previousButton) {
        previousButton.addEventListener("click", function () {
            showSlide(activeIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            showSlide(activeIndex + 1);
        });
    }

    updateButtons();
})();

// 原图预览弹层：详情页图片列表点击后在当前页全屏展示原图
(function () {
    const viewer = document.querySelector("[data-viewer]");
    if (!viewer) {
        return;
    }

    const frontImage = viewer.querySelector("[data-viewer-image]");
    const backImage = viewer.querySelector("[data-viewer-back]");
    const previousButton = viewer.querySelector("[data-viewer-prev]");
    const nextButton = viewer.querySelector("[data-viewer-next]");
    const closeButton = viewer.querySelector("[data-viewer-close]");
    const galleryImages = Array.from(document.querySelectorAll("[data-viewer-open] img"));
    // 滑动切换与轻滑提示的动画类名
    const enterClasses = ["viewer-enter-from-right", "viewer-enter-from-left"];
    const exitClasses = ["viewer-exit-to-left", "viewer-exit-to-right"];
    const bumpClasses = ["viewer-bump-left", "viewer-bump-right"];
    let activeIndex = 0;
    let sliding = false;

    function setImage(image, index) {
        image.src = galleryImages[index].src;
        image.alt = galleryImages[index].alt;
    }

    function playBump(className) {
        frontImage.classList.remove(...bumpClasses);
        // 强制回流，确保同名动画可以重复播放
        void frontImage.offsetWidth;
        frontImage.classList.add(className);
    }

    // 新图从对应方向滑入，同时当前图朝另一侧滑出
    function slideTo(nextIndex, direction) {
        sliding = true;
        frontImage.classList.remove(...exitClasses, ...bumpClasses);
        backImage.classList.remove(...enterClasses);
        setImage(backImage, nextIndex);
        // 清理旧动画后强制回流，避免连续切换时动画状态残留
        void backImage.offsetWidth;
        backImage.classList.add(direction === "next" ? "viewer-enter-from-right" : "viewer-enter-from-left");
        frontImage.classList.add(direction === "next" ? "viewer-exit-to-left" : "viewer-exit-to-right");
        let finished = false;
        function finish() {
            if (finished) {
                return;
            }
            finished = true;
            backImage.removeEventListener("animationend", finish);
            setImage(frontImage, nextIndex);
            activeIndex = nextIndex;
            backImage.classList.remove(...enterClasses);
            frontImage.classList.remove(...exitClasses, ...bumpClasses);
            sliding = false;
        }
        backImage.addEventListener("animationend", finish);
        // 兜底：animationend 未触发时定时收尾，避免两张图叠在一起
        setTimeout(finish, 450);
    }

    function showPrevious() {
        if (sliding) {
            return;
        }
        // 已是第一张：轻滑提示滑不过去
        if (activeIndex === 0) {
            playBump("viewer-bump-right");
            return;
        }
        slideTo(activeIndex - 1, "previous");
    }

    function showNext() {
        if (sliding) {
            return;
        }
        // 已是最后一张：轻滑提示滑不过去
        if (activeIndex === galleryImages.length - 1) {
            playBump("viewer-bump-left");
            return;
        }
        slideTo(activeIndex + 1, "next");
    }

    function openViewer(index) {
        if (galleryImages.length === 0) {
            return;
        }
        activeIndex = index;
        sliding = false;
        setImage(frontImage, index);
        frontImage.classList.remove(...exitClasses, ...bumpClasses);
        backImage.classList.remove(...enterClasses);
        viewer.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closeViewer() {
        viewer.hidden = true;
        document.body.style.overflow = "";
        // 关闭时清理滑动残留状态，避免下次打开时出现叠图
        backImage.classList.remove(...enterClasses);
        frontImage.classList.remove(...exitClasses, ...bumpClasses);
        sliding = false;
    }

    galleryImages.forEach(function (image, index) {
        image.closest("[data-viewer-open]").addEventListener("click", function () {
            openViewer(index);
        });
    });

    previousButton.addEventListener("click", showPrevious);

    nextButton.addEventListener("click", showNext);

    closeButton.addEventListener("click", closeViewer);

    // 点击遮罩空白处关闭预览
    viewer.addEventListener("click", function (event) {
        if (event.target === viewer) {
            closeViewer();
        }
    });

    // Esc 键关闭预览
    document.addEventListener("keydown", function (event) {
        if (!viewer.hidden && event.key === "Escape") {
            closeViewer();
        }
    });
})();
