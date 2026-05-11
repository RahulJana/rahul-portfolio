// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
})();

// Reveal-on-scroll
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('show'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  els.forEach((el) => io.observe(el));
})();

// Animated counters for stats
(function () {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.counter);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = (target * eased).toFixed(decimals);
      el.textContent = prefix + value + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    els.forEach(animate);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => io.observe(el));
})();

// Update copyright year
(function () {
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
