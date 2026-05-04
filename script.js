document.addEventListener('DOMContentLoaded', () => {

    // ── Sticky Navbar ──────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── Smooth Scroll for all anchor links ────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Fade-in on Scroll ──────────────────────────────
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkFade = () => {
        const triggerBottom = window.innerHeight * 0.88;
        fadeElements.forEach(el => {
            if (el.getBoundingClientRect().top < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkFade);
    checkFade(); // trigger on page load

    // ── Ripple Effect ──────────────────────────────────
    document.querySelectorAll('.ripple').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-span');
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top  = (e.clientY - rect.top)  + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    });

    // ── Onboarding Overlay Logic ───────────────────────
    const overlay      = document.getElementById('onboarding-overlay');
    const closeBtn     = document.getElementById('close-onboarding');
    const brokerSpan   = document.getElementById('active-broker-name');
    const progressBar  = document.getElementById('onboarding-progress');
    const step1        = document.getElementById('step-1');
    const step2        = document.getElementById('step-2');
    const step3        = document.getElementById('step-3');
    const statusText   = document.getElementById('onboarding-status-text');
    let redirectTimer;

    // Attach to broker card "Open Account" buttons that use data-broker
    document.querySelectorAll('.open-account-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            openOnboarding(btn.dataset.broker, btn.dataset.url);
        });
    });

    function openOnboarding(brokerName, targetUrl) {
        // Reset state
        brokerSpan.textContent       = brokerName || 'Broker';
        progressBar.style.width      = '0%';
        step1.classList.add('active');
        step2.classList.remove('active');
        step3.classList.remove('active');
        statusText.textContent       = `Opening secure portal for ${brokerName}...`;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        clearTimeout(redirectTimer);

        setTimeout(() => {
            progressBar.style.width = '50%';
            step2.classList.add('active');
            statusText.textContent  = 'Redirecting to official website...';
        }, 1500);

        redirectTimer = setTimeout(() => {
            progressBar.style.width = '100%';
            step3.classList.add('active');
            statusText.textContent  = 'Please complete your KYC in the new tab.';
            if (targetUrl) window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }, 3000);
    }

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        clearTimeout(redirectTimer);
    }

    closeBtn.addEventListener('click', closeOverlay);

    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeOverlay();
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeOverlay();
    });

});
