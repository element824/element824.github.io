(() => {
    'use strict';

    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        canvas.remove();
        return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0, height = 0, dpr = 1;
    let particles = [];
    let rafId = null;
    let running = true;
    const mouse = { x: -9999, y: -9999, active: false };

    const isMobile = () => window.innerWidth < 768;

    const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initParticles();
    };

    const initParticles = () => {
        const area = width * height;
        const density = isMobile() ? 14000 : 9000;
        const count = Math.min(120, Math.max(30, Math.floor(area / density)));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.6
            });
        }
    };

    const draw = () => {
        if (!running) return;
        ctx.clearRect(0, 0, width, height);

        const linkDist = isMobile() ? 90 : 130;
        const linkDistSq = linkDist * linkDist;

        // Update & draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            // Mouse repulsion
            if (mouse.active) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < 120 * 120) {
                    const dist = Math.sqrt(distSq) || 1;
                    const force = (120 - dist) / 120 * 0.6;
                    p.x += (dx / dist) * force;
                    p.y += (dy / dist) * force;
                }
            }

            // Wrap
            if (p.x < -10) p.x = width + 10;
            else if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            else if (p.y > height + 10) p.y = -10;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 255, 0.75)';
            ctx.fill();
        }

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < linkDistSq) {
                    const alpha = 1 - distSq / linkDistSq;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${alpha * 0.35})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        rafId = requestAnimationFrame(draw);
    };

    const start = () => {
        if (rafId) return;
        running = true;
        draw();
    };
    const stop = () => {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    };

    // Pause when hero not in view (saves CPU)
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) start();
                else stop();
            });
        }, { threshold: 0 });
        const hero = document.querySelector('.hero');
        if (hero) io.observe(hero);
    }

    // Pause when tab hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else start();
    });

    // Mouse tracking
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });
    canvas.addEventListener('mouseleave', () => { mouse.active = false; });

    // Resize (debounced)
    let resizeTimeout = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 150);
    });

    resize();
    start();
})();
