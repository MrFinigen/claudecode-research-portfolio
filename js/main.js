/* ============================================================
   SCROLL ANIMATIONS — Intersection Observer
   ============================================================ */
const fadeEls = document.querySelectorAll('.fade-in');

if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach((el) => observer.observe(el));
}

/* ============================================================
   STICKY NAV — add .scrolled class after 60px
   ============================================================ */
const nav = document.querySelector('.nav');

if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load in case page is already scrolled
}

/* ============================================================
   CASE STUDY NAV — already always visible, no extra logic needed
   ============================================================ */
