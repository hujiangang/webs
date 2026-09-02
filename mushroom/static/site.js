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

// 毒菌挑战赛：看图判断菌子能否食用，每局随机抽 10 题
(function () {
    const panel = document.querySelector("[data-game]");
    if (!panel) {
        return;
    }

    const dataNode = document.querySelector("[data-game-data]");
    const allItems = JSON.parse(dataNode.textContent);
    const questionCount = 10;
    const progressText = panel.querySelector("[data-game-progress]");
    const scoreText = panel.querySelector("[data-game-score]");
    const gameImage = panel.querySelector("[data-game-image]");
    const answerButtons = Array.from(panel.querySelectorAll("[data-game-answer]"));
    const feedbackText = panel.querySelector("[data-game-feedback]");
    const nextButton = panel.querySelector("[data-game-next]");
    const resultPanel = document.querySelector("[data-game-result]");
    const resultTitle = document.querySelector("[data-game-result-title]");
    const restartButton = document.querySelector("[data-game-restart]");
    let questions = [];
    let currentIndex = 0;
    let score = 0;

    // 洗牌后取前 10 道作为本局题目
    function startGame() {
        questions = allItems
            .slice()
            .sort(function () {
                return Math.random() - 0.5;
            })
            .slice(0, Math.min(questionCount, allItems.length));
        currentIndex = 0;
        score = 0;
        scoreText.textContent = "得分：0";
        panel.hidden = false;
        resultPanel.hidden = true;
        showQuestion();
    }

    function showQuestion() {
        const item = questions[currentIndex];
        progressText.textContent = "第 " + (currentIndex + 1) + " / " + questions.length + " 题";
        gameImage.src = item.image_url;
        gameImage.alt = "待判断的菌子图片";
        feedbackText.hidden = true;
        feedbackText.classList.remove("is-right", "is-wrong");
        nextButton.hidden = true;
        answerButtons.forEach(function (button) {
            button.disabled = false;
        });
    }

    // 作答后展示对错反馈，并揭晓菌子名称
    function answer(choice) {
        const item = questions[currentIndex];
        const isRight = (choice === "edible") === item.is_edible;
        if (isRight) {
            score += 1;
            scoreText.textContent = "得分：" + score;
            feedbackText.textContent = "✅ 答对了！这是「" + item.name + "」，" + (item.is_edible ? "可以食用。" : "不能食用。");
            feedbackText.classList.add("is-right");
        } else {
            feedbackText.textContent = "❌ 答错了！这是「" + item.name + "」，" + (item.is_edible ? "其实是可以食用的。" : "有毒，不能吃！");
            feedbackText.classList.add("is-wrong");
        }
        feedbackText.hidden = false;
        answerButtons.forEach(function (button) {
            button.disabled = true;
        });
        nextButton.textContent = currentIndex === questions.length - 1 ? "查看成绩" : "下一题 →";
        nextButton.hidden = false;
    }

    function showNext() {
        if (currentIndex === questions.length - 1) {
            finishGame();
            return;
        }
        currentIndex += 1;
        showQuestion();
    }

    // 根据得分给出不同评语
    function finishGame() {
        panel.hidden = true;
        resultPanel.hidden = false;
        const total = questions.length;
        let comment;
        if (score === total) {
            comment = "全对！你就是老菌山来的识菌高手！";
        } else if (score >= total * 0.6) {
            comment = "不错不错，再练练就能上山了！";
        } else {
            comment = "还需多看看图鉴，安全第一！";
        }
        resultTitle.textContent = "本局得分：" + score + " / " + total + " · " + comment;
    }

    answerButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            answer(button.dataset.gameAnswer);
        });
    });

    nextButton.addEventListener("click", showNext);
    restartButton.addEventListener("click", startGame);

    startGame();
})();
