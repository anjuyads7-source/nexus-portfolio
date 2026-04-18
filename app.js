// Interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor glow effect
    const glow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // Particle effect on click
    document.addEventListener('mousedown', (e) => {
        const particles = 10;
        for (let i = 0; i < particles; i++) {
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 8 + 4;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.background = '#dc2626';
        p.style.position = 'fixed';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.borderRadius = '50%';
        p.style.pointerEvents = 'none';
        p.style.zIndex = '9999';
        
        document.body.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        let opacity = 1;

        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            opacity -= 0.02;
            p.style.left = x + 'px';
            p.style.top = y + 'px';
            p.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                p.remove();
            }
        };
        requestAnimationFrame(animate);
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
});
