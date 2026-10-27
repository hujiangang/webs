// 照片筛选保留表单内的分类和关键词，改变筛选时从第一页开始。
(() => {
    const photoFilter = document.querySelector('.gallery-main [data-photo-filter]');
    photoFilter?.addEventListener('change', () => photoFilter.form.requestSubmit());

    // 点击分组目录或直接访问带锚点的网址时，先展开目标资料。
    const revealSection = (hash) => {
        const section = document.getElementById(hash.slice(1));
        if (section?.matches('.detail-main details.detail-group')) {
            section.open = true;
            return section;
        }
        return null;
    };
    document.querySelectorAll('.detail-main [data-detail-section]').forEach((link) => {
        link.addEventListener('click', () => revealSection(link.hash));
    });
    const revealCurrentSection = () => {
        const section = revealSection(window.location.hash);
        if (section) requestAnimationFrame(() => section.scrollIntoView({ block: 'start' }));
    };
    window.addEventListener('hashchange', revealCurrentSection);
    revealCurrentSection();
})();
