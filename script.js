document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Controller
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const savedTheme = localStorage.getItem('varay-theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('varay-theme', newTheme);
        });
    }

    // 2. Menu Navigation Overlay
    const menuBtn = document.getElementById('menu-open');
    const closeBtn = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');

    if (menuBtn && closeBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            menuOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // 3. Multi-Step Form Handlers (Apply Page)
    window.nextStep = function(targetStep) {
        document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
        document.querySelectorAll('.step-indicator').forEach(ind => ind.classList.remove('active'));

        const targetForm = document.getElementById(`step-${targetStep}`);
        const targetIndicator = document.querySelector(`.step-indicator[data-step="${targetStep}"]`);

        if (targetForm) targetForm.classList.add('active');
        if (targetIndicator) targetIndicator.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.prevStep = function(targetStep) {
        window.nextStep(targetStep);
    };

    const auditionForm = document.getElementById('audition-form');
    if (auditionForm) {
        auditionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Application received successfully! Reference code generated: VRY-2026-9812');
        });
    }

    // 4. Portal Role Switching & Authentication
    window.switchRole = function(role) {
        const applicantBox = document.getElementById('portal-applicant');
        const staffBox = document.getElementById('portal-staff');
        const tabs = document.querySelectorAll('.role-tab');

        tabs.forEach(t => t.classList.remove('active'));

        if (role === 'applicant') {
            applicantBox.classList.remove('hidden');
            staffBox.classList.add('hidden');
            tabs[0].classList.add('active');
        } else {
            applicantBox.classList.add('hidden');
            staffBox.classList.remove('hidden');
            tabs[1].classList.add('active');
        }
    };

    window.simulateLogin = function(role) {
        if (role === 'applicant') {
            document.getElementById('applicant-dashboard').classList.remove('hidden');
        } else {
            document.getElementById('staff-dashboard').classList.remove('hidden');
        }
    };
});
