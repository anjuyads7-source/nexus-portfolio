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
        const spans = mobileBtn.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('-rotate-45');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 2. PORTFOLIO FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // 3. ANIMATE ON SCROLL
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // 4. MODAL SYSTEM
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalVisual = document.getElementById('modal-visual');
    const modalClient = document.getElementById('modal-client');
    const modalTimeline = document.getElementById('modal-timeline');
    const modalTools = document.getElementById('modal-tools');

    const projectData = [
        {
            title: "Hub UI 1",
            desc: "A comprehensive Hub interface designed for high-performance Roblox games. Features a modular layout, integrated friend lists, and real-time server stats.",
            client: "Nexus Studios",
            timeline: "2 Weeks",
            tools: "Figma, Roblox Studio, Luau",
            visual: '<div class="mockup-ui ui-hub"><div class="hub-window"><div class="hub-content"><div class="hub-grid"><div class="hub-panel"><div class="hub-panel-title">Friends</div><div class="hub-stats"><div class="hub-stat"><div class="hub-stat-label">Online</div><div class="hub-stat-val">5</div></div><div class="hub-stat"><div class="hub-stat-label">Offline</div><div class="hub-stat-val">12</div></div></div></div><div class="hub-panel"><div class="hub-panel-title">Game ID</div><div class="hub-panel-sub" style="font-family:monospace;color:#fff;font-size:0.8rem">129402941</div></div></div></div></div></div>'
        },
        {
            title: "Hub UI 2",
            desc: "Advanced Admin Hub with server monitoring, player data management, and Discord integration. Built for scale.",
            client: "Private Client",
            timeline: "3 Weeks",
            tools: "Figma, Luau",
            visual: '<div class="mockup-ui ui-hub"><div class="hub-window"><div class="hub-sidebar"><div class="hub-icon"></div><div class="hub-icon" style="background:#fff"></div><div class="hub-icon"></div><div class="hub-icon"></div></div><div class="hub-content"><div class="hub-user"><div class="hub-avatar"></div><div class="hub-user-text">Hello, Nexus_Owner<span>Nexus - Admin Hub</span></div></div><div class="hub-grid"><div class="hub-panel hub-gradient-green"><div class="hub-panel-title">Server</div><div class="hub-panel-sub">Information on the session</div><div class="hub-stats"><div class="hub-stat"><div class="hub-stat-label">Players</div><div class="hub-stat-val">12 playing</div></div><div class="hub-stat"><div class="hub-stat-label">Latency</div><div class="hub-stat-val">85ms</div></div></div></div><div class="hub-panel hub-gradient-blue"><div class="hub-panel-title">Discord</div><div class="hub-panel-sub">Tap to join</div></div></div></div></div></div>'
        }
    ];

    document.querySelectorAll('.portfolio-expand').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-project');
            const data = projectData[index] || projectData[0];

            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;
            modalClient.textContent = data.client;
            modalTimeline.textContent = data.timeline;
            modalTools.textContent = data.tools;
            modalVisual.innerHTML = data.visual;

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 5. CURSOR GLOW
    const cursorGlow = document.getElementById('cursor-glow');
    if (window.innerWidth > 1024) {
        cursorGlow.style.display = 'block';
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    }

    // 6. SKILL BARS ANIMATION
    const skillBars = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
});
