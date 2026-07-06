/* ============================================================
   VICOLO WINE & FOOD — main.js
   Vanilla JS, nessuna dipendenza esterna.
   ============================================================ */
(() => {
  'use strict';

  // Segnala alla CSS che JavaScript è attivo: solo da questo momento
  // le sezioni "reveal" partono nascoste per poi animarsi in comparsa.
  document.documentElement.classList.add('js');

  /* ---------- Anno corrente ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: stato scrolled + toggle mobile ---------- */
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');

  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    updateLivello();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('menu-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.textContent = isOpen ? '✕' : '☰';
    });
    document.getElementById('navLinks').querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      });
    });
  }

  /* ---------- Signature: "Il Livello" — riempimento in base allo scroll ---------- */
  const livello = document.querySelector('.livello');
  const livelloFill = document.getElementById('livelloFill');
  function updateLivello() {
    if (!livelloFill) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    livelloFill.style.height = pct + '%';

    // Appare solo dopo aver superato l'hero, per non sovrapporsi alla CTA iniziale
    if (livello) {
      if (scrollTop > window.innerHeight * 0.75) livello.classList.add('is-active');
      else livello.classList.remove('is-active');
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));

  // Rete di sicurezza: qualunque cosa succeda (arrivo diretto con #ancora,
  // browser particolari, ecc.), dopo 2 secondi il contenuto diventa
  // comunque visibile, anche se l'osservatore non fosse scattato.
  setTimeout(() => {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }, 2000);

  /* ---------- Menu: tabs ---------- */
  const tabs = document.querySelectorAll('.menu__tab');
  const panels = document.querySelectorAll('.menu__panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const target = document.getElementById(tab.dataset.tab);
      if (target) {
        target.classList.add('active');
        target.classList.remove('is-visible');
        requestAnimationFrame(() => target.classList.add('is-visible'));
      }
    });
  });

  /* ---------- Recensioni: slider ---------- */
  const reviews = document.querySelectorAll('.review');
  const dotsWrap = document.getElementById('reviewsDots');
  let current = 0;
  let sliderTimer;

  if (reviews.length && dotsWrap) {
    reviews.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'reviews__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Vai alla recensione ${i + 1}`);
      dot.addEventListener('click', () => goToReview(i));
      dotsWrap.appendChild(dot);
    });

    function goToReview(index) {
      reviews[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = index;
      reviews[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
    }

    function nextReview() {
      goToReview((current + 1) % reviews.length);
    }

    function startAutoplay() {
      sliderTimer = setInterval(nextReview, 6000);
    }
    function stopAutoplay() {
      clearInterval(sliderTimer);
    }

    startAutoplay();
    const sliderEl = document.getElementById('reviewsSlider');
    if (sliderEl) {
      sliderEl.addEventListener('mouseenter', stopAutoplay);
      sliderEl.addEventListener('mouseleave', startAutoplay);
    }
  }

  /* ---------- Form prenotazione ----------
     Invio "zero-config" via WhatsApp: nessun backend richiesto.
     Al submit, il browser apre WhatsApp (app o web) con un messaggio
     già scritto in base ai dati inseriti, pronto da modificare e inviare
     al numero del ristorante (modifica WHATSAPP_NUMBER qui sotto,
     formato internazionale senza + né spazi, es. 393284166256). */
  const WHATSAPP_NUMBER = '393284166256';

  const form = document.getElementById('bookingForm');
  const status = document.getElementById('bookingStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form).entries());
      const { nome, telefono, email, data: dataPren, ora, persone, note } = data;

      let message = `Ciao! Vorrei prenotare un tavolo da Vicolo Wine & Food.\n\n`;
      message += `Nome: ${nome}\n`;
      message += `Telefono: ${telefono}\n`;
      if (email) message += `Email: ${email}\n`;
      message += `Data: ${dataPren}\n`;
      message += `Ora: ${ora}\n`;
      message += `Persone: ${persone}\n`;
      if (note) message += `Note: ${note}\n`;

      const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      status.textContent = 'Si sta aprendo WhatsApp con il messaggio già scritto: puoi modificarlo prima di inviarlo.';
      status.className = 'booking__status success';

      window.open(whatsappLink, '_blank');
    });
  }
})();
