document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const sidebar = document.getElementById('sidebar');
    const navToggle = document.querySelector('.js-colorlib-nav-toggle');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar ul li a');

    // Mobile Menu Toggle
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('mobile-menu-active');
    });

    // Close mobile menu when clicking outside (optional enhancement)
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('mobile-menu-active') &&
            !sidebar.contains(e.target) &&
            !navToggle.contains(e.target)) {
            document.body.classList.remove('mobile-menu-active');
        }
    });

    // Smooth Scrolling & Active State
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.parentElement.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu on clicking link
            if (document.body.classList.contains('mobile-menu-active')) {
                document.body.classList.remove('mobile-menu-active');
            }
        });
    });
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Scroll Animation with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in-left class and observe elements
    const animatedElements = document.querySelectorAll(`
        .heading-meta,
        .heading,
        .timeline-entry,
        .overall-skill-box,
        .project-entry,
        .contact-box,
        .skills-table-wrap,
        .about-separator
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in-left');
        observer.observe(el);
    });
});
