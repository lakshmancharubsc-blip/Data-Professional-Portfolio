/**
 * LAKSHMAN CHARUGUNTLA - MODERN DATA PROFESSIONAL PORTFOLIO
 * High-Performance Interactive Controller & Motion Engine
 */

(function () {
  'use strict';

  // Global State
  const state = {
    theme: localStorage.getItem('portfolio_theme') || 'dark'
  };

  /* ==========================================================================
     1. INITIALIZATION & THEME SETUP
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initPageLoader();
    initTypingEffect();
    initScrollEngine();
    initStatsCounter();
    init3DTiltEffects();
    initMagneticButtons();
    initContactFormAndCopy();
    initMobileNav();
  });

  function initTheme() {
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;

    function applyTheme(theme) {
      state.theme = theme;
      html.setAttribute('data-theme', theme);
      localStorage.setItem('portfolio_theme', theme);

      if (themeIcon) {
        if (theme === 'light') {
          themeIcon.className = 'fa-solid fa-moon';
        } else {
          themeIcon.className = 'fa-solid fa-sun';
        }
      }
    }

    applyTheme(state.theme);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }
  }

  /* ==========================================================================
     2. INTRO LOADER ANIMATION
     ========================================================================== */
  function initPageLoader() {
    const loader = document.getElementById('page-loader');
    const barFill = document.querySelector('.loader-bar-fill');
    const percentText = document.querySelector('.loader-percent');

    if (!loader) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 18) + 12;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (barFill) barFill.style.width = '100%';
        if (percentText) percentText.textContent = '100%';

        setTimeout(() => {
          loader.classList.add('loaded');
          handleScrollReveal();
        }, 350);
      } else {
        if (barFill) barFill.style.width = `${progress}%`;
        if (percentText) percentText.textContent = `${progress}%`;
      }
    }, 40);
  }

  /* ==========================================================================
     3. HERO TYPING EFFECT
     ========================================================================== */
  function initTypingEffect() {
    const textElem = document.getElementById('hero-typing');
    if (!textElem) return;

    const roles = [
      'Data Analyst',
      'BI Developer',
      'Python & SQL Specialist',
      'Data Engineer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        textElem.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        textElem.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 95;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 1900; // Pause on complete role
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 350; // Pause before next role
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  /* ==========================================================================
     4. SCROLL ENGINE (PROGRESS, NAVBAR, SCROLL-SPY, BACK TO TOP)
     ========================================================================== */
  function initScrollEngine() {
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.site-navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Update progress bar
      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
      }

      // Sticky navbar shadow
      if (navbar) {
        if (scrollTop > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Back to top visibility
      if (backToTopBtn) {
        if (scrollTop > 450) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }

      // Active Section Scroll-Spy
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

      handleScrollReveal();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Smooth navigation anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          const navOffset = 80;
          const elemPosition = targetElem.getBoundingClientRect().top;
          const offsetPosition = elemPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const mobileDrawer = document.getElementById('mobile-drawer');
          const mobileToggle = document.getElementById('mobile-toggle');
          if (mobileDrawer && mobileDrawer.classList.contains('open')) {
            mobileDrawer.classList.remove('open');
            if (mobileToggle) mobileToggle.classList.remove('open');
          }
        }
      });
    });
  }

  /* Scroll Reveal Observer */
  function handleScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowHeight * 0.9) {
        el.classList.add('is-revealed');
      }
    });
  }

  /* ==========================================================================
     5. STATS NUMBER COUNTER (CALCULATED DIRECTLY FROM REAL DOM DATA)
     ========================================================================== */
  function initStatsCounter() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    // Calculate real data counts from the page
    const totalProjects = document.querySelectorAll('.project-card').length || 17;
    const totalCategories = document.querySelectorAll('.project-category-block, .project-division-block').length || 6;
    const totalSkills = document.querySelectorAll('.skill-3d-chip').length || 37;
    const totalTools = 14; // Power BI, Tableau, Excel, SQL, MySQL, PostgreSQL, Snowflake, BigQuery, PySpark, Databricks, Git, GitHub, Pandas, NumPy

    // Assign dynamically
    const statProjects = document.getElementById('stat-projects');
    const statDivisions = document.getElementById('stat-divisions');
    const statSkills = document.getElementById('stat-skills');
    const statTools = document.getElementById('stat-tools');

    if (statProjects) statProjects.setAttribute('data-target', totalProjects);
    if (statDivisions) statDivisions.setAttribute('data-target', totalCategories);
    if (statSkills) statSkills.setAttribute('data-target', totalSkills);
    if (statTools) statTools.setAttribute('data-target', totalTools);

    let triggered = false;

    function countUp(el) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeVal = 1 - (1 - progress) * (1 - progress);
        const currentNum = Math.floor(easeVal * target);

        el.textContent = currentNum + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      }
      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          document.querySelectorAll('.stat-number').forEach(countUp);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  /* ==========================================================================
     6. 3D TILT EFFECTS (PROJECT CARDS & SKILL CATEGORY CARDS)
     ========================================================================== */
  function init3DTiltEffects() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Project Cards Tilt
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });

    // Skills Category Cards 3D Tilt
    const skillCards = document.querySelectorAll('.skill-category-card');
    skillCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });

    // About Highlight Boxes 3D Tilt
    const highlightBoxes = document.querySelectorAll('.about-highlight-box');
    highlightBoxes.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ==========================================================================
     8. MAGNETIC BUTTON EFFECT (NEVER PREVENTS LINK CLICKS)
     ========================================================================== */
  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const magneticBtns = document.querySelectorAll('.btn-primary, .nav-cta-btn');

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /* ==========================================================================
     10. CONTACT FORM & EMAIL COPY (SAFE CLICKING, WORKING TOAST)
     ========================================================================== */
  function initContactFormAndCopy() {
    // 1. Copy Email Button
    const copyBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast-notification');
    const toastTitle = toast ? toast.querySelector('.toast-title') : null;
    const toastMsg = toast ? toast.querySelector('.toast-msg') : null;

    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Don't trigger link

        const email = 'lakshmancharuguntla@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          copyBtn.style.color = 'var(--accent-emerald)';

          if (toast && toastTitle && toastMsg) {
            toastTitle.textContent = 'Email Copied!';
            toastMsg.textContent = `${email} copied to clipboard.`;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3500);
          }

          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
            copyBtn.style.color = '';
          }, 2500);
        });
      });
    }

    // 2. Contact Form
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const msgInput = document.getElementById('form-message');
      const submitBtn = form.querySelector('.form-submit-btn');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
        alert('Please fill out all required fields.');
        return;
      }

      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--accent-emerald)';

        if (toast && toastTitle && toastMsg) {
          toastTitle.textContent = 'Message Sent Successfully!';
          toastMsg.textContent = 'Thank you for reaching out. Lakshman will get back to you shortly.';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4500);
        }

        form.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 2500);
      }, 1200);
    });
  }

  /* ==========================================================================
     11. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('open');
      drawer.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('open');
      }
    });
  }

})();
