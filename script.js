/**
 * ============================================================================
 * ADARSH K. — PROFESSIONAL DATA ANALYST PORTFOLIO
 * Interactive JavaScript Engine
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dynamic Year in Footer
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Navbar Background Blur on Scroll
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('mainNavbar');
  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Auto-Collapse
  // --------------------------------------------------------------------------
  const navbarCollapse = document.getElementById('navbarContent');
  const navLinks = document.querySelectorAll('#navbarContent .nav-link, #navbarContent a.btn-primary-custom');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Use Bootstrap Collapse API if available, else remove class
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Smooth Anchor Scrolling with Proper Offset
  // --------------------------------------------------------------------------
  const internalAnchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([data-bs-toggle])');

  internalAnchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navbarHeight + 15);

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Active Section Navigation Indicator (ScrollSpy enhancement)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('#navbarContent .nav-link');

  const highlightActiveSection = () => {
    const scrollY = window.pageYOffset;
    const navbarHeight = navbar ? navbar.offsetHeight : 70;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - (navbarHeight + 60);
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        mainNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveSection, { passive: true });

  // --------------------------------------------------------------------------
  // 6. Back-to-Top Button Handler
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('footerBackToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Contact Form Validation & Honest Submission Handling
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  const nameFeedback = document.getElementById('nameFeedback');
  const emailFeedback = document.getElementById('emailFeedback');
  const subjectFeedback = document.getElementById('subjectFeedback');
  const messageFeedback = document.getElementById('messageFeedback');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time error clearing on user input
  const setupRealTimeClear = (inputElement, feedbackElement) => {
    if (!inputElement || !feedbackElement) return;
    inputElement.addEventListener('input', () => {
      if (inputElement.classList.contains('is-invalid')) {
        inputElement.classList.remove('is-invalid');
        feedbackElement.classList.remove('show');
      }
    });
  };

  setupRealTimeClear(nameInput, nameFeedback);
  setupRealTimeClear(emailInput, emailFeedback);
  setupRealTimeClear(subjectInput, subjectFeedback);
  setupRealTimeClear(messageInput, messageFeedback);

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameValue = nameInput ? nameInput.value.trim() : '';
      if (!nameValue || nameValue.length < 2) {
        if (nameInput) nameInput.classList.add('is-invalid');
        if (nameFeedback) nameFeedback.classList.add('show');
        isValid = false;
      } else {
        if (nameInput) nameInput.classList.remove('is-invalid');
        if (nameFeedback) nameFeedback.classList.remove('show');
      }

      // Validate Email
      const emailValue = emailInput ? emailInput.value.trim() : '';
      if (!emailValue || !emailRegex.test(emailValue)) {
        if (emailInput) emailInput.classList.add('is-invalid');
        if (emailFeedback) emailFeedback.classList.add('show');
        isValid = false;
      } else {
        if (emailInput) emailInput.classList.remove('is-invalid');
        if (emailFeedback) emailFeedback.classList.remove('show');
      }

      // Validate Subject
      const subjectValue = subjectInput ? subjectInput.value.trim() : '';
      if (!subjectValue || subjectValue.length < 3) {
        if (subjectInput) subjectInput.classList.add('is-invalid');
        if (subjectFeedback) subjectFeedback.classList.add('show');
        isValid = false;
      } else {
        if (subjectInput) subjectInput.classList.remove('is-invalid');
        if (subjectFeedback) subjectFeedback.classList.remove('show');
      }

      // Validate Message
      const messageValue = messageInput ? messageInput.value.trim() : '';
      if (!messageValue || messageValue.length < 10) {
        if (messageInput) messageInput.classList.add('is-invalid');
        if (messageFeedback) messageFeedback.classList.add('show');
        isValid = false;
      } else {
        if (messageInput) messageInput.classList.remove('is-invalid');
        if (messageFeedback) messageFeedback.classList.remove('show');
      }

      // If valid, show friendly confirmation modal
      if (isValid) {
        const contactSuccessSummary = document.getElementById('contactSuccessSummary');
        if (contactSuccessSummary) {
          contactSuccessSummary.innerHTML = `
            Thank you <strong>${escapeHtml(nameValue)}</strong>! Your message regarding "<em>${escapeHtml(subjectValue)}</em>" passed frontend validation.
          `;
        }

        // Trigger the Bootstrap Modal
        const successModalEl = document.getElementById('contactSuccessModal');
        if (successModalEl && typeof bootstrap !== 'undefined') {
          const successModal = new bootstrap.Modal(successModalEl);
          successModal.show();
        }

        // Reset form inputs
        contactForm.reset();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Helper: Escape HTML to prevent accidental XSS
  // --------------------------------------------------------------------------
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --------------------------------------------------------------------------
  // 8. Subtle Scroll Reveal Animations (Respecting prefers-reduced-motion)
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.glass-card, .timeline-item, .hero-status-pill, .section-title, .section-subtitle'
    );

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      }
    );

    revealElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      revealObserver.observe(el);
    });
  }
});
