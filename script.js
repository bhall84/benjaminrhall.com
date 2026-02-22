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
    // Elements start fully visible in CSS (no JS = no animation).
    // We add .scroll-animate (opacity:0 + translateY) only when
    // the browser supports IntersectionObserver AND user allows
    // motion. Three safety fallbacks prevent content from hiding:
    // 1) Above-fold content revealed instantly on first frame
    // 2) IntersectionObserver fires at 5% visibility
    // 3) Timeout reveals everything after 3 seconds

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        // Select elements to animate — content blocks + grid items
        const targets = document.querySelectorAll(
            '.promise-card, .course-card, .testimonial-card, ' +
            '.callout-card, .why-me-card, .approach-step, ' +
            '.package-card, .org-cta, .about-grid, ' +
            '.faq-list, .contact-card, ' +
            '.in-home-standalone, .proof-card, ' +
            '.stat-item, .section-header, ' +
            '.promise-feature, .why-me-item'
        );

        // Add the animation class (invisible + shifted down)
        targets.forEach(el => el.classList.add('scroll-animate'));

        // Add stagger classes to grid children for cascade effect
        document.querySelectorAll(
            '.testimonials-grid, .cohorts-grid, .workshops-grid, ' +
            '.testimonials-stats, .why-me-grid, .promise-features'
        ).forEach(grid => {
            const children = grid.querySelectorAll('.scroll-animate');
            children.forEach((child, i) => {
                child.classList.add('stagger-' + Math.min(i + 1, 4));
            });
        });

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
            rootMargin: '0px 0px -80px 0px'  // element must be 80px into viewport
        });

        targets.forEach(el => observer.observe(el));

        // SAFETY FALLBACK 1: Immediately reveal anything already
        // in the viewport (above-the-fold content shouldn't animate)
        requestAnimationFrame(() => {
            targets.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
                    el.classList.add('is-visible');
                }
            });
        });
    }

});
