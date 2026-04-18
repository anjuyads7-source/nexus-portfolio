document.addEventListener('DOMContentLoaded', () => {
    // 1. NAVIGATION & SCROLLING
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Sticky Navbar & Active Link on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileBtn.classList.toggle('active');
    });

    // 2. ANIMATIONS ON SCROLL
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // 3. COUNTER ANIMATION (STATS)
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        statNumbers.forEach(num => {
            const target = +num.getAttribute('data-count');
            const count = +num.innerText;
            const speed = 2000 / target;

            if (count < target) {
                num.innerText = Math.ceil(count + 1);
                setTimeout(animateStats, speed);
            } else {
                num.innerText = target + (target === 100 ? '%' : '+');
            }
        });
    };

    // Trigger stats animation when section is in view
    const statsSection = document.getElementById('stats');
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            statsObserver.unobserve(statsSection);
        }
    }, { threshold: 0.5 });

    if (statsSection) statsObserver.observe(statsSection);

    // 4. PORTFOLIO FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            const filterValue = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 500);
                }
            });
        });
    });

    // 5. MODAL SYSTEM
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const expandBtns = document.querySelectorAll('.portfolio-expand');

    const projectData = [
        {
            title: "Premium Hub Interface",
            desc: "A comprehensive dashboard for player statistics, settings, and social features. Designed with a focus on usability and modern aesthetics.",
            client: "Top Games Inc.",
            timeline: "2 Weeks",
            tools: "Figma, Roblox Studio",
            visualClass: "ui-hub"
        },
        // ... more data can be added
    ];

    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-project');
            const data = projectData[0]; // Simplified for this demo

            document.getElementById('modal-title').innerText = data.title;
            document.getElementById('modal-desc').innerText = data.desc;
            document.getElementById('modal-client').innerText = data.client;
            document.getElementById('modal-timeline').innerText = data.timeline;
            document.getElementById('modal-tools').innerText = data.tools;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // 6. CONTACT FORM
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#22c55e';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 7. CURSOR GLOW
    const glow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    });
});
