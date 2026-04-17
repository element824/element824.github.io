(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Year ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Nav scroll state ---
    const nav = document.getElementById('nav');
    const onScroll = () => {
        if (!nav) return;
        nav.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- Mobile nav toggle ---
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('is-open');
            toggle.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });
        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                menu.classList.remove('is-open');
                toggle.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Active nav link on scroll ---
    const navLinks = Array.from(document.querySelectorAll('.nav__link[href^="#"]'));
    const sectionMap = new Map();
    navLinks.forEach(link => {
        const id = link.getAttribute('href').slice(1);
        const section = document.getElementById(id);
        if (section) sectionMap.set(section, link);
    });
    if (sectionMap.size && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = sectionMap.get(entry.target);
                    if (link) {
                        navLinks.forEach(l => l.classList.remove('is-active'));
                        link.classList.add('is-active');
                    }
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        sectionMap.forEach((_, sec) => navObserver.observe(sec));
    }

    // --- Scroll reveal ---
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    // --- Typing rotator ---
    const typedEl = document.getElementById('typed');
    if (typedEl) {
        const roles = [
            'Agentic AI systems',
            'multi-agent architectures',
            'Azure AI solutions',
            'intelligent copilots',
            'agentic DevOps workflows',
            'AI-driven experiences'
        ];
        if (prefersReducedMotion) {
            typedEl.textContent = roles[0];
        } else {
            let roleIdx = 0, charIdx = 0, deleting = false;
            const tick = () => {
                const current = roles[roleIdx];
                if (!deleting) {
                    charIdx++;
                    typedEl.textContent = current.slice(0, charIdx);
                    if (charIdx === current.length) {
                        deleting = true;
                        setTimeout(tick, 1800);
                        return;
                    }
                    setTimeout(tick, 55 + Math.random() * 40);
                } else {
                    charIdx--;
                    typedEl.textContent = current.slice(0, charIdx);
                    if (charIdx === 0) {
                        deleting = false;
                        roleIdx = (roleIdx + 1) % roles.length;
                        setTimeout(tick, 220);
                        return;
                    }
                    setTimeout(tick, 28);
                }
            };
            setTimeout(tick, 600);
        }
    }

    // --- Number count-up ---
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10) || 0;
                countObserver.unobserve(el);
                if (prefersReducedMotion) {
                    el.textContent = target.toLocaleString();
                    return;
                }
                const duration = 1400;
                const start = performance.now();
                const step = (now) => {
                    const t = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - t, 3);
                    el.textContent = Math.round(target * eased).toLocaleString();
                    if (t < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            });
        }, { threshold: 0.4 });
        counters.forEach(c => countObserver.observe(c));
    }
})();
