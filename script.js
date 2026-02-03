// ============================================
// Ben Hall — AI Training for Adults
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
    const animateElements = document.querySelectorAll(
        '.promise-card, .course-card, .package-card, .org-card, .approach-step, .proof-card, .about-content, .about-photo, .contact-card, .faq-list'
    );

    animateElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // --- Stagger animation for grid items ---
    const staggerGroups = [
        document.querySelectorAll('.package-card'),
    ];

    staggerGroups.forEach(group => {
        group.forEach((el, i) => {
            el.style.transitionDelay = `${i * 100}ms`;
        });
    });

    // --- Approach step stagger ---
    document.querySelectorAll('.approach-step').forEach((el, i) => {
        el.style.transitionDelay = `${i * 120}ms`;
    });

});
