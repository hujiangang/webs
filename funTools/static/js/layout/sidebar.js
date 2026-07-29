export function initSidebar() {
  const toggleSidebar = document.getElementById('toggleSidebar');

  if (!toggleSidebar) {
    return;
  }

  toggleSidebar.addEventListener('click', () => {
    const hidden = document.body.classList.toggle('sidebar-hidden');
    toggleSidebar.setAttribute('aria-expanded', String(!hidden));
    toggleSidebar.setAttribute('aria-label', hidden ? '显示侧栏' : '隐藏侧栏');
  });
}