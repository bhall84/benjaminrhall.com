// ============================================
// Ben Hall — AI Orientation for Older Adults
// Site Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation scroll effect ---
    const nav = document.getElementById('nav');
    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Mobile menu toggle ---
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    toggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
        const spans = toggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Scroll-triggered fade-in animations ---
    // Safe approach: elements start fully visible in CSS.
    // We add .scroll-animate (which dims them slightly) only if
    // the browser supports IntersectionObserver AND the user
    // hasn't requested reduced motion. A fallback timer ensures
    // everything is visible within 3 seconds no matter what.

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        // Select elements to animate — major content blocks only
        const targets = document.querySelectorAll(
            '.promise-card, .course-card, .testimonial-card, ' +
            '.callout-card, .why-me-card, .approach-step, ' +
            '.package-card, .org-cta, .about-grid, ' +
            '.faq-list, .contact-card, .section-divider, ' +
            '.in-home-standalone, .proof-card, ' +
            '.stat-item, .section-header'
        );

        // Add the animation class (dims slightly + shifts down)
        targets.forEach(el => el.classList.add('scroll-animate'));

        // Observer reveals elements when they enter the viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,    // fire very early (5% visible)
            rootMargin: '0px 0px -40px 0px'  // slight offset from bottom
        });

        targets.forEach(el => observer.observe(el));

        // Fallback: reveal everything after 3 seconds in case
        // observer doesn't fire (e.g., all content already in view)
        setTimeout(() => {
            targets.forEach(el => el.classList.add('is-visible'));
        }, 3000);

        // Also immediately reveal anything already in the viewport
        // (above the fold content shouldn't animate in)
        requestAnimationFrame(() => {
            targets.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('is-visible');
                }
            });
        });
    }

});
