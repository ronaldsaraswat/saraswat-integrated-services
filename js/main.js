const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

function closeMenu() {
    if (!menuToggle || !siteNav) return;

    siteNav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('menu-open');
}

if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');

        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation menu' : 'Open navigation menu'
        );

        document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeMenu();
    });
}

const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector('.form-submit');
        const originalButtonHTML = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        contactForm.setAttribute('aria-busy', 'true');

        formStatus.textContent = '';
        formStatus.classList.remove('success', 'error');

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (response.ok) {
                contactForm.reset();
                formStatus.textContent = 'Thank you. Your message has been sent successfully.';
                formStatus.classList.add('success');
            } else {
                formStatus.textContent = 'Your message could not be sent. Please try again.';
                formStatus.classList.add('error');
            }
        } catch (error) {
            formStatus.textContent = 'Your message could not be sent. Please check your connection and try again.';
            formStatus.classList.add('error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;
            contactForm.removeAttribute('aria-busy');
        }
    });
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
});
