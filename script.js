/* =========================================================
   PAPA Barber Shop — script.js
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1. Anno nel footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Menu mobile ---------- */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
    });
    // chiudi il menu cliccando un link
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- 3. Header solido dopo lo scroll ---------- */
  const top = document.querySelector('.top');
  if (top && document.body.classList.contains('home')) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        top.style.background = 'rgba(13,13,13,.96)';
        top.style.backdropFilter = 'blur(8px)';
        top.style.borderBottom = '1px solid rgba(255,255,255,.08)';
      } else {
        top.style.background = 'transparent';
        top.style.backdropFilter = 'none';
        top.style.borderBottom = '0';
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 4. Scroll fluido con offset header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const headerH = (top ? top.offsetHeight : 0) + 8;
      const y = el.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ---------- 5. Evidenzia il giorno corrente negli orari ---------- */
  // Ordine nel DOM: Lun, Mar, Mer, Gio, Ven, Sab, Dom
  // getDay(): Dom=0, Lun=1, ... Sab=6
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // indice lista -> getDay()
  const todayIdx = dayMap[new Date().getDay()];
  const hoursList = document.querySelector('#orari .list');
  if (hoursList) {
    const rows = hoursList.querySelectorAll('li');
    if (rows[todayIdx]) rows[todayIdx].classList.add('today');

    /* ---------- 6. Badge "Aperto ora / Chiuso" ---------- */
    // Orari indicativi: [aperturaAM, chiusuraAM, aperturaPM, chiusuraPM] in minuti
    // 0 = chiuso tutto il giorno
    const schedule = [
      null,                    // Domenica
      [0, 0, 0, 0],            // Lunedì — chiuso
      [540, 750, 900, 1170],   // Martedì   9:00-12:30 · 15:00-19:30
      [540, 750, 900, 1170],   // Mercoledì
      [540, 750, 900, 1170],   // Giovedì
      [540, 750, 900, 1170],   // Venerdì
      [540, 1080, 0, 0]        // Sabato    9:00-18:00
    ];
    const now = new Date();
    const today = schedule[now.getDay()];
    let isOpen = false;
    if (today) {
      const mins = now.getHours() * 60 + now.getMinutes();
      const [a1, c1, a2, c2] = today;
      if (a1 && mins >= a1 && mins < c1) isOpen = true;
      if (a2 && mins >= a2 && mins < c2) isOpen = true;
    }
    const badge = document.createElement('span');
    badge.className = 'open-badge ' + (isOpen ? 'is-open' : 'is-closed');
    badge.textContent = isOpen ? 'Aperto ora' : 'Chiuso ora';
    const kicker = document.querySelector('#orari .kicker');
    if (kicker) kicker.appendChild(badge);
  }

  /* ---------- 7. Animazioni allo scroll ---------- */
  const revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('in'));
  }

  /* ---------- 8. Lightbox galleria ---------- */
  const galleryItems = document.querySelectorAll('.gallery .ph, .gallery img');
  if (galleryItems.length) {
    // crea overlay una sola volta
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lightbox-close" aria-label="Chiudi">×</button><div class="lightbox-inner"></div>';
    document.body.appendChild(lb);
    const inner = lb.querySelector('.lightbox-inner');

    const open = (src, alt) => {
      inner.innerHTML = '';
      if (src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt || '';
        inner.appendChild(img);
      } else {
        const ph = document.createElement('div');
        ph.className = 'lightbox-ph';
        ph.textContent = alt || 'Foto';
        inner.appendChild(ph);
      }
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    };

    galleryItems.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.tagName === 'IMG') open(el.src, el.alt);
        else open(null, el.textContent);
      });
    });
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lightbox-close')) close();
    });
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  }

  /* ---------- 9. Nascondi pulsante flottante nella sezione prenota ---------- */
  const floatBtn = document.querySelector('.float-book');
  const bookSection = document.getElementById('prenota');
  if (floatBtn && bookSection && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          floatBtn.style.opacity = e.isIntersecting ? '0' : '1';
          floatBtn.style.pointerEvents = e.isIntersecting ? 'none' : 'auto';
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(bookSection);
  }

  /* ---------- 10. Anti-flash: pagina pronta ---------- */
  requestAnimationFrame(() => document.body.classList.add('ready'));
})();
