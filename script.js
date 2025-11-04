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
});

