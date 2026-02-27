// ============================================
// Ben Hall — AI Fluency Education
// Site Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation scroll effect ---
    const nav = document.getElementById('nav');

    // On dark-hero pages (org + individuals), nav starts transparent
    if (document.querySelector('.hero-dark')) {
        nav.classList.add('is-overlay');
    }

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
            toggle.setAttribute('aria-expanded', false);
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
    // Elements are fully visible by default (no JS = no animation).
    // JS adds .scroll-animate only when motion is allowed.
    // Three safety fallbacks prevent content from hiding:
    // 1) Above-fold content revealed instantly on first frame
    // 2) IntersectionObserver fires at 5% visibility
    // 3) Timeout reveals everything after 3 seconds

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const targets = document.querySelectorAll(
            '.pillar-card, .path-card, .testimonial-card, ' +
            '.testimonial-slot, .about-grid, .stat-item, ' +
            '.section-header, .audience-card, .coaching-card, ' +
            '.course-card, .credential-strip, .newsletter-form'
        );

        targets.forEach(el => el.classList.add('scroll-animate'));

        // Add stagger classes to grid children
        document.querySelectorAll(
            '.pillars-grid, .paths-grid, .stats-row, ' +
            '.testimonials-grid, .audiences-grid, .coaching-grid'
        ).forEach(grid => {
            const children = grid.querySelectorAll('.scroll-animate');
            children.forEach((child, i) => {
                child.classList.add('stagger-' + Math.min(i + 1, 5));
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -60px 0px'
        });

        targets.forEach(el => observer.observe(el));

        // SAFETY FALLBACK 1: Reveal above-fold content instantly
        requestAnimationFrame(() => {
            targets.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
                    el.classList.add('is-visible');
                }
            });
        });

        // SAFETY FALLBACK 2: Reveal everything after 3 seconds
        setTimeout(() => {
            targets.forEach(el => el.classList.add('is-visible'));
        }, 3000);
    }

});
