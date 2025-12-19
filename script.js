document.addEventListener('DOMContentLoaded', () => {
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
});
