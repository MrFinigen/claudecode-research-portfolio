/* ============================================================
   ANIMATION OBSERVER
   Watches [data-anim] elements and adds .animated on entry.
   Also handles legacy .fade-in → .visible for backward compat.
   ============================================================ */
const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.hasAttribute('data-anim')) {
        el.classList.add('animated');
      } else {
        el.classList.add('visible'); // legacy .fade-in
      }
      animObserver.unobserve(el);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('[data-anim], .fade-in').forEach((el) => {
  animObserver.observe(el);
});

/* ============================================================
   STAGGER SKILL TAGS  (pop each tag with increasing delay)
   ============================================================ */
document.querySelectorAll('.skills-group__tags').forEach((group) => {
  group.querySelectorAll('.skill-tag').forEach((tag, i) => {
    tag.setAttribute('data-anim', 'pop');
    tag.style.setProperty('--delay', `${i * 0.045}s`);
    animObserver.observe(tag);
  });
});

/* ============================================================
   STAGGER GALLERY ITEMS
   ============================================================ */
document.querySelectorAll('.gallery').forEach((gallery) => {
  gallery.querySelectorAll('.gallery__item').forEach((item, i) => {
    if (!item.hasAttribute('data-anim')) {
      item.setAttribute('data-anim', 'scale');
      item.style.setProperty('--delay', `${i * 0.1}s`);
      animObserver.observe(item);
    }
  });
});

/* ============================================================
   STAGGER STAT CARDS on case study pages
   ============================================================ */
document.querySelectorAll('.stats-grid').forEach((grid) => {
  grid.querySelectorAll('.stat-card').forEach((card, i) => {
    if (!card.hasAttribute('data-anim')) {
      card.setAttribute('data-anim', 'scale');
      card.style.setProperty('--delay', `${i * 0.1}s`);
      animObserver.observe(card);
    }
  });
});

/* ============================================================
   STAGGER METHOD CARDS
   ============================================================ */
document.querySelectorAll('.methods-grid').forEach((grid) => {
  grid.querySelectorAll('.method-card').forEach((card, i) => {
    if (!card.hasAttribute('data-anim')) {
      card.setAttribute('data-anim', 'up');
      card.style.setProperty('--delay', `${i * 0.09}s`);
      animObserver.observe(card);
    }
  });
});

/* ============================================================
   STAGGER RESEARCH QUESTION ITEMS
   ============================================================ */
document.querySelectorAll('.rq-list').forEach((list) => {
  list.querySelectorAll('.rq-item').forEach((item, i) => {
    if (!item.hasAttribute('data-anim')) {
      item.setAttribute('data-anim', 'left');
      item.style.setProperty('--delay', `${i * 0.1}s`);
      animObserver.observe(item);
    }
  });
});

/* ============================================================
   NUMBER COUNTER ANIMATION
   Elements with [data-count] attribute get counted up.
   ============================================================ */
function animateCount(el) {
  const raw    = el.dataset.count;           // e.g. "40", "8"
  const suffix = el.dataset.suffix || '';    // e.g. "%", "M"
  const target = parseFloat(raw);
  const isInt  = Number.isInteger(target);
  const dur    = 1400;
  const start  = performance.now();

  function step(now) {
    const t = Math.min((now - start) / dur, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - t, 3);
    const val   = target * eased;
    el.textContent = (isInt ? Math.round(val) : val.toFixed(0)) + suffix;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count]').forEach((el) => {
  countObserver.observe(el);
});

/* ============================================================
   STICKY NAV  — adds .scrolled after 60px
   ============================================================ */
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   3D TILT on cards  (desktop only)
   ============================================================ */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 → 0.5
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform =
        `translateY(-8px) perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
