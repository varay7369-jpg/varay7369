document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark / Light Mode Controller
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('varay-theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('varay-theme', newTheme);
    });

    // 2. Menu Open / Close Controller
    const menuBtn = document.getElementById('menu-open');
    const closeBtn = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');

    menuBtn.addEventListener('click', () => {
        menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول صفحه زیرین
    });

    closeBtn.addEventListener('click', () => {
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    });
});
