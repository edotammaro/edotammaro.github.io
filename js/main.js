/**
 * Edoardo Tammaro - Personal Portfolio
 * Vanilla JavaScript: typing effect, mobile nav, active scrollspy, scroll reveal, theme toggle, and collapsible sections.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initAccordions();
  initNavigation();
  initScrollSpy();
  initScrollReveal();
});

/* --- 1. Theme Toggle (Dark / Light) --- */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Default is light (clean, white and sky blue)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    html.setAttribute('data-theme', 'light');
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    const isLight = html.getAttribute('data-theme') === 'light';
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = isLight ? '🌙' : '⚡';
    }
  }
}

/* --- 2. Hero Typing Animation --- */
function initTypewriter() {
  const textElement = document.getElementById('typedText');
  if (!textElement) return;

  const phrases = [
    'Cybersecurity',
    'Machine Learning',
    'SAR & Remote Sensing',
    'Full-Stack Development'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    textElement.textContent = phrases[0];
    return;
  }

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // brief pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
}

/* --- 3. Collapsible Accordion Sections --- */
function initAccordions() {
  const sections = [
    { id: 'about', triggerId: 'aboutTrigger', panelId: 'aboutPanel', defaultOpen: false },
    { id: 'education', triggerId: 'educationTrigger', panelId: 'educationPanel', defaultOpen: false },
    { id: 'experience', triggerId: 'experienceTrigger', panelId: 'experiencePanel', defaultOpen: false },
    { id: 'projects', triggerId: 'projectsTrigger', panelId: 'projectsPanel', defaultOpen: false },
    { id: 'skills', triggerId: 'skillsTrigger', panelId: 'skillsPanel', defaultOpen: false }
  ];

  const toggleAllBtn = document.getElementById('accordionToggleAll');

  function openPanel(panel, trigger, animate = true) {
    if (!panel || !trigger) return;
    trigger.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!animate || prefersReducedMotion) {
      panel.classList.add('is-open');
    } else {
      // Force reflow then add open class for transition
      panel.offsetHeight; // trigger reflow
      requestAnimationFrame(() => {
        panel.classList.add('is-open');
      });
    }

    updateToggleAllState();
  }

  function closePanel(panel, trigger, animate = true) {
    if (!panel || !trigger) return;
    trigger.setAttribute('aria-expanded', 'false');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!animate || prefersReducedMotion) {
      panel.classList.remove('is-open');
      panel.setAttribute('hidden', '');
    } else {
      panel.classList.remove('is-open');
      const onEnd = (e) => {
        if (e.target === panel && e.propertyName === 'grid-template-rows') {
          panel.removeEventListener('transitionend', onEnd);
          if (trigger.getAttribute('aria-expanded') === 'false') {
            panel.setAttribute('hidden', '');
          }
        }
      };
      panel.addEventListener('transitionend', onEnd);
      // Fallback timeout in case transition event doesn't fire
      setTimeout(() => {
        if (trigger.getAttribute('aria-expanded') === 'false') {
          panel.setAttribute('hidden', '');
        }
      }, 350);
    }

    updateToggleAllState();
  }

  function toggleSection(trigger, panel) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closePanel(panel, trigger, true);
    } else {
      openPanel(panel, trigger, true);
    }
  }

  function updateToggleAllState() {
    if (!toggleAllBtn) return;
    const triggers = sections.map(s => document.getElementById(s.triggerId)).filter(Boolean);
    const allOpen = triggers.every(t => t.getAttribute('aria-expanded') === 'true');
    const toggleText = toggleAllBtn.querySelector('.toggle-all-text');

    if (allOpen) {
      toggleAllBtn.setAttribute('aria-expanded', 'true');
      if (toggleText) toggleText.textContent = 'Collapse all';
    } else {
      toggleAllBtn.setAttribute('aria-expanded', 'false');
      if (toggleText) toggleText.textContent = 'Expand all';
    }
  }

  // Setup initial states
  sections.forEach(s => {
    const trigger = document.getElementById(s.triggerId);
    const panel = document.getElementById(s.panelId);
    if (!trigger || !panel) return;

    if (s.defaultOpen) {
      openPanel(panel, trigger, false);
    } else {
      closePanel(panel, trigger, false);
    }

    trigger.addEventListener('click', () => {
      toggleSection(trigger, panel);
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSection(trigger, panel);
      }
    });
  });

  // Toggle All button functionality
  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', () => {
      const isExpanded = toggleAllBtn.getAttribute('aria-expanded') === 'true';
      sections.forEach(s => {
        const trigger = document.getElementById(s.triggerId);
        const panel = document.getElementById(s.panelId);
        if (isExpanded) {
          closePanel(panel, trigger, true);
        } else {
          openPanel(panel, trigger, true);
        }
      });
    });
  }

  // URL Hash handling on page load (e.g. /#education or /#projects)
  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const matched = sections.find(s => s.id === hash);
    if (matched) {
      const trigger = document.getElementById(matched.triggerId);
      const panel = document.getElementById(matched.panelId);
      if (trigger && panel) {
        openPanel(panel, trigger, false);
        const sectionElem = document.getElementById(matched.id);
        if (sectionElem) {
          setTimeout(() => {
            sectionElem.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  }

  handleUrlHash();
  window.addEventListener('hashchange', handleUrlHash);

  // Expose helper globally so navigation links can open target panel
  window.portfolioOpenSection = function(sectionId) {
    const matched = sections.find(s => s.id === sectionId);
    if (matched) {
      const trigger = document.getElementById(matched.triggerId);
      const panel = document.getElementById(matched.panelId);
      if (trigger && panel) {
        openPanel(panel, trigger, true);
      }
    }
  };
}

/* --- 4. Navigation & Mobile Menu --- */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link & ensure target section is opened
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }

        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          const sectionId = href.substring(1);
          if (typeof window.portfolioOpenSection === 'function') {
            window.portfolioOpenSection(sectionId);
          }
          const targetSection = document.getElementById(sectionId);
          if (targetSection) {
            e.preventDefault();
            // Scroll accounting for sticky navbar
            const navHeight = document.getElementById('header')?.offsetHeight || 72;
            const targetPos = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
            window.scrollTo({
              top: targetPos,
              behavior: 'smooth'
            });
            // Update hash without jump
            history.pushState(null, '', `#${sectionId}`);
          }
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* --- 5. ScrollSpy (Active Section Highlight) --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window)) {
    return; // Fallback gracefully if not supported
  }

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --- 6. Scroll Reveal with IntersectionObserver --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}
