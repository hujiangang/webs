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
