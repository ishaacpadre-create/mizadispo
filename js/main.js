// ===== MENU HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== FADE IN ANIMATIONS =====
function initFadeIn() {
    const elements = document.querySelectorAll(
        '.service-card, .temoignage-card, .value, .zone-info, .contact-form, .contact-info-card, .apropos-card'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

initFadeIn();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            btn.textContent = 'Message envoyé !';
            btn.style.background = '#4CAF50';
            contactForm.reset();
        } else {
            btn.textContent = 'Erreur, réessayez';
            btn.style.background = '#f44336';
        }
    })
    .catch(() => {
        btn.textContent = 'Erreur, réessayez';
        btn.style.background = '#f44336';
    })
    .finally(() => {
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
});
