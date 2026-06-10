/* ============================================================
   SunValley Landscaping — main.js
   Handles: slideshow, sticky nav, mobile menu, contact form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky nav shadow ---- */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---- Mobile hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');
  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  // Close menu when a nav link is clicked
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Slideshow ---- */
  const slides     = Array.from(document.querySelectorAll('.slide'));
  const dots       = Array.from(document.querySelectorAll('.dot'));
  const prevBtn    = document.getElementById('slide-prev');
  const nextBtn    = document.getElementById('slide-next');
  let   current    = 0;
  let   autoTimer  = null;

  function goToSlide(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (idx + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAuto() {
    autoTimer = setInterval(() => goToSlide(current + 1), 5500);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  prevBtn.addEventListener('click', () => { goToSlide(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goToSlide(current + 1); resetAuto(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); resetAuto(); });
  });

  // Pause on hover
  const hero = document.querySelector('.hero');
  hero.addEventListener('mouseenter', () => clearInterval(autoTimer));
  hero.addEventListener('mouseleave', startAuto);

  // Keyboard support
  hero.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goToSlide(current - 1); resetAuto(); }
    if (e.key === 'ArrowRight') { goToSlide(current + 1); resetAuto(); }
  });

  startAuto();

  /* ---- Contact form (client-side validation + fetch submit) ---- */
  const form       = document.getElementById('contact-form');
  const statusEl   = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic validation
      const name  = form.name.value.trim();
      const email = form.email.value.trim();
      if (!name || !email) {
        showStatus('Please fill in your name and email.', 'error');
        return;
      }
      if (!isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          showStatus('Thanks! We\'ll be in touch within one business day.', 'success');
        } else {
          throw new Error('Server error');
        }
      } catch {
        showStatus('Something went wrong. Please call us or try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send my request';
      }
    });
  }

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + type;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});
