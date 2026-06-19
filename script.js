document.addEventListener('DOMContentLoaded', () => {

  /* ─── Preloader ─── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => preloader.classList.add('hidden'));
  setTimeout(() => preloader.classList.add('hidden'), 1800);

  /* ─── Custom cursor ─── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const hoverTargets = document.querySelectorAll('a, button, .btn, .work-card, .stack-item, .contact-chip');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  /* ─── Mobile nav ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ─── Header scroll ─── */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ─── Counter animation ─── */
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current + '+';
    }, 50);
  }

  /* ─── Scroll reveal ─── */
  const revealElements = document.querySelectorAll(
    '.work-card, .stack-item, .contact-chip, .cta-card, .hero-badge'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i * 0.06) + 's';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    revealObserver.observe(el);
  });

  /* ─── Parallax on hero stats ─── */
  const stats = document.querySelector('.hero-stats');
  if (stats) {
    window.addEventListener('scroll', () => {
      const rect = stats.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = 1 - (rect.top / window.innerHeight);
        stats.style.transform = `translateY(${progress * 12}px)`;
        stats.style.opacity = Math.min(1, progress * 1.2);
      }
    });
  }

  /* ─── Smooth hero heading reveal ─── */
  const headingLines = document.querySelectorAll('.hero-heading-line');
  headingLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(20px)';
    line.style.transition = `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.15}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.15}s`;
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 100);
  });

  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc) {
    heroDesc.style.opacity = '0';
    heroDesc.style.transform = 'translateY(16px)';
    heroDesc.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s';
    setTimeout(() => {
      heroDesc.style.opacity = '1';
      heroDesc.style.transform = 'translateY(0)';
    }, 100);
  }

});
