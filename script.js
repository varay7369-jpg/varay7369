document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Controller (Dark / Light)
  const htmlEl = document.documentElement;
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('varay_theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = htmlEl.getAttribute('data-theme') || 'dark';
      const target = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', target);
      localStorage.setItem('varay_theme', target);
    });
  });

  // 2. Navigation Overlay Controller
  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeMenuBtn = document.getElementById('closeMenuBtn');

  if (menuBtn && menuOverlay) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menuOverlay.classList.add('open');
      document.body.classList.add('no-scroll');
    });
  }

  if (closeMenuBtn && menuOverlay) {
    closeMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menuOverlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  }

  // 3. Language Selector Toggle (Inside Menu)
  const langTrigger = document.getElementById('langTrigger');
  const langMenu = document.getElementById('langMenu');
  const langOptions = document.querySelectorAll('.lang-option');

  if (langTrigger && langMenu) {
    langTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('show');
    });

    langOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        langOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const chosenLang = opt.getAttribute('data-lang');
        const chosenCode = opt.getAttribute('data-code');
        document.getElementById('currentLangLabel').textContent = chosenCode;
        langMenu.classList.remove('show');
        localStorage.setItem('varay_lang', chosenLang);
      });
    });

    document.addEventListener('click', () => {
      langMenu.classList.remove('show');
    });
  }

  // 4. Custom Select Dropdowns Initialization (No OS native ugly select)
  document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
    const trigger = wrapper.querySelector('.custom-select-trigger');
    const panel = wrapper.querySelector('.custom-dropdown-panel');
    const input = wrapper.querySelector('input[type="hidden"]');
    const valueText = wrapper.querySelector('.trigger-value');

    if (trigger && panel) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close others
        document.querySelectorAll('.custom-dropdown-panel').forEach(p => {
          if (p !== panel) p.classList.remove('show');
        });
        panel.classList.toggle('show');
      });

      panel.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          panel.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const val = item.getAttribute('data-val');
          if (input) input.value = val;
          if (valueText) valueText.textContent = item.textContent;
          panel.classList.remove('show');
        });
      });
    }
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-dropdown-panel').forEach(p => p.classList.remove('show'));
  });
});
document.addEventListener('DOMContentLoaded', () => {

    // 1. Unified Theme Controller (Works on all pages without breaking)
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const currentTheme = localStorage.getItem('varay-theme') || 'dark';
    htmlEl.setAttribute('data-theme', currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const active = htmlEl.getAttribute('data-theme');
            const target = active === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', target);
            localStorage.setItem('varay-theme', target);
        });
    }

    // 2. Navigation Menu Overlay Controller
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

    // 3. Language Selector Toggle Visual
    document.querySelectorAll('.lang-opt').forEach(opt => {
        opt.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-opt').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const currentLabel = document.querySelector('.lang-current');
            if (currentLabel) currentLabel.textContent = e.target.textContent;
        });
    });

    // 4. Apply Intro Gate to Form Flow
    const startApplyBtn = document.getElementById('start-apply-btn');
    const auditionForm = document.getElementById('audition-form');
    const applyIntroCard = document.getElementById('apply-intro');

    if (startApplyBtn && auditionForm && applyIntroCard) {
        startApplyBtn.addEventListener('click', () => {
            applyIntroCard.style.display = 'none';
            auditionForm.classList.remove('hidden-flow');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Populate Year, Day, Height, Weight Select Dropdowns
    const dobYear = document.getElementById('dob-year');
    const dobDay = document.getElementById('dob-day');
    const heightSelect = document.getElementById('height-select');
    const weightSelect = document.getElementById('weight-select');

    if (dobYear) {
        for (let y = 2014; y >= 1990; y--) {
            const opt = document.createElement('option');
            opt.value = y;
            opt.textContent = y;
            dobYear.appendChild(opt);
        }
    }

    if (dobDay) {
        for (let d = 1; d <= 31; d++) {
            const opt = document.createElement('option');
            const val = d < 10 ? `0${d}` : d;
            opt.value = val;
            opt.textContent = val;
            dobDay.appendChild(opt);
        }
    }

    if (heightSelect) {
        for (let h = 145; h <= 195; h++) {
            const opt = document.createElement('option');
            opt.value = `${h}cm`;
            opt.textContent = `${h} cm`;
            heightSelect.appendChild(opt);
        }
    }

    if (weightSelect) {
        for (let w = 38; w <= 85; w++) {
            const opt = document.createElement('option');
            opt.value = `${w}kg`;
            opt.textContent = `${w} kg`;
            weightSelect.appendChild(opt);
        }
    }

    // 6. Strict Numeric Restriction for Phone Input
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    // 7. Terms Accordion
    const termsToggle = document.getElementById('terms-toggle');
    const termsPanel = document.getElementById('terms-panel');
    if (termsToggle && termsPanel) {
        termsToggle.addEventListener('click', () => {
            termsPanel.classList.toggle('open');
            const chevron = termsToggle.querySelector('.chevron');
            chevron.textContent = termsPanel.classList.contains('open') ? '—' : '+';
        });
    }

    // 8. Audition Form Submission
    if (auditionForm) {
        auditionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const termsAgree = document.getElementById('terms-agree');
            if (!termsAgree.checked) {
                alert('Please accept the Terms of Application.');
                return;
            }
            alert('Your application has been received securely. Registration code: VRY-7369-094');
        });
    }

    // 9. Portal Tabs & Execution Flow
    window.switchPortalTab = function(type) {
        const candidateBox = document.getElementById('candidate-login');
        const execBox = document.getElementById('executive-login');
        const tabs = document.querySelectorAll('.portal-tab');

        tabs.forEach(t => t.classList.remove('active'));

        if (type === 'candidate') {
            candidateBox.classList.remove('hidden-panel');
            execBox.classList.add('hidden-panel');
            tabs[0].classList.add('active');
        } else {
            candidateBox.classList.add('hidden-panel');
            execBox.classList.remove('hidden-panel');
            tabs[1].classList.add('active');
        }
    };

    window.portalCandidateAuth = function() {
        const candPhone = document.getElementById('cand-phone');
        const candPass = document.getElementById('cand-pass');
        if (!candPhone.value || !candPass.value) {
            alert('Please provide your phone number and access key.');
            return;
        }
        document.getElementById('candidate-panel').classList.remove('hidden-panel');
    };

    window.portalExecAuth = function() {
        const execId = document.getElementById('exec-id');
        const execPass = document.getElementById('exec-pass');
        if (!execId.value || !execPass.value) {
            alert('Please provide executive credentials.');
            return;
        }
        document.getElementById('executive-panel').classList.remove('hidden-panel');
    };

    window.loadDept = function(dept) {
        document.querySelectorAll('.dept-list-panel').forEach(p => p.classList.add('hidden-panel'));
        document.querySelectorAll('.dept-btn').forEach(b => b.classList.remove('active'));

        if (dept === 'writers') {
            document.getElementById('list-writers').classList.remove('hidden-panel');
            event.target.classList.add('active');
        } else if (dept === 'vocals') {
            document.getElementById('list-vocals').classList.remove('hidden-panel');
            event.target.classList.add('active');
        } else if (dept === 'musicians') {
            document.getElementById('list-musicians').classList.remove('hidden-panel');
            event.target.classList.add('active');
        }
    };
});
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
