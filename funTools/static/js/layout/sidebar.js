export function initSidebar() {
  const button = document.getElementById('toggleSidebar');
  if (!button) return;
  const mobile = window.matchMedia('(max-width: 760px)');
  const update = () => {
    const expanded = mobile.matches ? document.body.classList.contains('sidebar-open') : !document.body.classList.contains('sidebar-hidden');
    button.setAttribute('aria-expanded', String(expanded));
  };
  button.addEventListener('click', () => {
    document.body.classList.toggle(mobile.matches ? 'sidebar-open' : 'sidebar-hidden');
    update();
  });
  mobile.addEventListener('change', update);
  document.querySelector('.sidebar')?.addEventListener('click', event => {
    if (event.target.closest('a') && mobile.matches) { document.body.classList.remove('sidebar-open'); update(); }
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { document.body.classList.remove('sidebar-open'); update(); } });
  document.addEventListener('click', event => {
    if (mobile.matches && !event.target.closest('.sidebar, #toggleSidebar')) {
      document.body.classList.remove('sidebar-open');
      update();
    }
  });
  update();
}
