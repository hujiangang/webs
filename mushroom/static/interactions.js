(() => {
    const menu = document.querySelector('[data-menu]');
    menu?.addEventListener('click', () => {
        const opened = menu.closest('header').classList.toggle('menu-open');
        menu.setAttribute('aria-expanded', String(opened));
        menu.setAttribute('aria-label', opened ? '关闭导航' : '打开导航');
    });
    document.querySelectorAll('img').forEach((image) => {
        const fallback = () => {
            if (!image.src.endsWith('image-fallback.svg')) image.src = '/static/images/image-fallback.svg';
        };
        image.addEventListener('error', fallback, { once: true });
        if (image.complete && !image.naturalWidth) fallback();
    });
    const fullscreenButton = document.querySelector('[data-fullscreen]');
    fullscreenButton?.addEventListener('click', async () => {
        const stage = document.querySelector('[data-game-stage]');
        if (!stage.requestFullscreen) return;
        try { await stage.requestFullscreen(); }
        catch { fullscreenButton.textContent = '请使用游戏内全屏按钮'; }
    });
})();

(() => {
    const hero = document.querySelector('[data-hero]');
    if (!hero) return;
    const slides = [...hero.querySelectorAll('[data-hero-slide]')];
    const pause = hero.querySelector('[data-hero-pause]');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeIndex = 0;
    let paused = reducedMotion;
    let timer;
    const update = (index) => {
        if (!slides.length) return;
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, current) => {
            const active = current === activeIndex;
            slide.classList.toggle('active', active);
            slide.inert = !active;
            const video = slide.querySelector('video');
            if (video) {
                if (active && !paused && !document.hidden) video.play().catch(() => {});
                else video.pause();
            }
        });
        hero.querySelector('[data-hero-page]').textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    };
    const schedule = () => {
        clearInterval(timer);
        if (!paused && slides.length > 1 && !document.hidden) timer = setInterval(() => update(activeIndex + 1), 9000);
    };
    hero.querySelector('[data-hero-prev]').addEventListener('click', () => { update(activeIndex - 1); schedule(); });
    hero.querySelector('[data-hero-next]').addEventListener('click', () => { update(activeIndex + 1); schedule(); });
    const updatePause = () => {
        pause.setAttribute('aria-pressed', String(paused));
        pause.setAttribute('aria-label', paused ? '播放自动轮播' : '暂停自动轮播');
        pause.textContent = paused ? '▷' : 'Ⅱ';
        update(activeIndex);
        schedule();
    };
    pause.addEventListener('click', () => { paused = !paused; updatePause(); });
    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', schedule);
    hero.addEventListener('focusin', () => clearInterval(timer));
    hero.addEventListener('focusout', (event) => { if (!hero.contains(event.relatedTarget)) schedule(); });
    document.addEventListener('visibilitychange', () => { update(activeIndex); schedule(); });
    if (slides.length < 2) hero.querySelector('.hero-controls').hidden = true;
    updatePause();
})();
