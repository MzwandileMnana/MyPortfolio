// =====================
// Scroll-to-top button
// =====================
const scrollTopBtn = document.getElementById("scrollTopBtn");
document.addEventListener('DOMContentLoaded', () => {
  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    const onScroll = () => {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopBtn.style.display = 'block';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    };

    window.addEventListener('scroll', onScroll);

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Contact form submission using Formspree
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      try {
        const response = await fetch('https://formspree.io/f/xwpnyvlz', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' },
        });
        if (response.ok) {
          alert('Thanks for reaching out! Your message has been sent.');
          form.reset();
        } else {
          alert('Oops! There was a problem submitting your form.');
        }
      } catch (err) {
        console.error('Error submitting the form:', err);
        alert('Oops! There was a network error. Please try again later.');
      }
    });
  }

  // Scroll to contact form when any "Hire Me" button is clicked
  const hireButtons = document.querySelectorAll('.hireBtn');
  if (hireButtons && hireButtons.length) {
    hireButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const contact = document.getElementById('contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // Smooth scroll for all navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Burger nav toggle for small screens
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks && nav) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav-open');
      // toggle body scroll lock when menu is open
      document.body.classList.toggle('no-scroll');
      // update burger icon to show close when open
      if (nav.classList.contains('nav-open')) {
        burger.textContent = '✕';
      } else {
        burger.textContent = '☰';
      }
    });

    // close menu when a nav link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('nav-open')) {
          nav.classList.remove('nav-open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll');
          burger.textContent = '☰';
        }
      });
    });

    // close menu when clicking outside the nav-links (backdrop)
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('nav-open')) return;
      const target = e.target;
      if (!target.closest('.nav-links') && !target.closest('.burger')) {
        nav.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
        burger.textContent = '☰';
      }
    });

    // close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
        burger.textContent = '☰';
      }
    });
  }
});

