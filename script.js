document.addEventListener("DOMContentLoaded", () => {
  // --- Consejos dinámicos ---
  const consejos = [
    "Separá los residuos reciclables: papel, plástico, aluminio...",
    "Enjuagá los envases antes de reciclarlos para evitar malos olores.",
    "Llevá las pilas usadas a puntos de recolección especiales.",
    "Reutilizá frascos de vidrio como contenedores.",
    "Usá bolsas reutilizables cuando vayas al supermercado.",
    "No tires electrónicos a la basura: lleválos a un centro de reciclaje.",
    "Compostá los residuos orgánicos en casa si podés.",
    "Cerrá la canilla mientras lavás los platos o te cepillás los dientes.",
    "Reducí el consumo de plásticos de un solo uso."
  ];

  const consejoEl = document.getElementById("consejo-dia");
  const prevBtn = document.getElementById("prevConsejo");
  const nextBtn = document.getElementById("nextConsejo");

  let idx = 0;
  let intervalo = null;

  function mostrarConsejo(i) {
    if (!consejoEl) return;
    idx = (i + consejos.length) % consejos.length;
    consejoEl.innerHTML = `<strong>${consejos[idx]}</strong>`;
  }

  function startInterval() {
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(() => mostrarConsejo(idx + 1), 4000);
  }

  if (consejoEl) {
    consejoEl.setAttribute("role", "status");
    consejoEl.setAttribute("aria-live", "polite");
    mostrarConsejo(0);
    startInterval();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      mostrarConsejo(idx - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      mostrarConsejo(idx + 1);
    });
  }

  // keep rotation running; no pause button or hover-pause behavior

  // keyboard support: left/right arrows to change consejo
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') mostrarConsejo(idx - 1);
    if (e.key === 'ArrowRight') mostrarConsejo(idx + 1);
  });

  // --- MAP PAGE: filter & modal viewer ---
  // Only run map-specific code if the map page elements exist
  const mapFilter = document.getElementById('mapFilter');
  const mapCardsContainer = document.getElementById('mapCards');
  if (mapFilter && mapCardsContainer) {
    const cards = Array.from(mapCardsContainer.querySelectorAll('.map-card'));

    // filter function
    function normalizeText(str) {
      // remove diacritics and normalize to lower-case for more forgiving matching
      return (str || '').normalize ? str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() : (str || '').toLowerCase();
    }

    function applyFilter(term) {
      const q = (term || '').trim();
      const qNorm = normalizeText(q);
      let anyVisible = false;
      cards.forEach(card => {
        const title = card.querySelector('.map-title')?.textContent || '';
        const titleNorm = normalizeText(title);
        const match = q === '' || titleNorm.includes(qNorm);
        card.style.display = match ? '' : 'none';
        if (match) anyVisible = true;
      });

      // show/hide no-results message
      const noResults = document.getElementById('noResults');
      if (noResults) {
        if (anyVisible) {
          noResults.classList.add('d-none');
        } else {
          noResults.classList.remove('d-none');
        }
      }
    }

    // simple debounce
    let debounceTimer = null;
    mapFilter.addEventListener('input', (e) => {
      const term = e.target.value;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => applyFilter(term), 200);
    });

    // Modal viewer for maps
    function createMapModal(opener) {
      const modal = document.createElement('div');
      modal.className = 'map-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('aria-modal', 'true');
      modal.tabIndex = -1;
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:1050;';

      const inner = document.createElement('div');
      inner.style.cssText = 'width:90%;max-width:1000px;background:#fff;border-radius:8px;overflow:hidden;transform:scale(0.98);transition:transform 180ms ease;box-shadow:0 8px 24px rgba(0,0,0,0.2)';

      const header = document.createElement('div');
      header.style.cssText = 'display:flex;justify-content:flex-end;padding:8px;background:#f8f9fa;';
      const closeBtn = document.createElement('button');
      closeBtn.className = 'btn btn-sm btn-outline-secondary';
      closeBtn.textContent = 'Cerrar';
      closeBtn.addEventListener('click', () => closeModal(modal, opener));
      header.appendChild(closeBtn);

      const content = document.createElement('div');
      content.style.cssText = 'background:#000;';
      content.innerHTML = '<div class="ratio" style="--bs-aspect-ratio:56.25%"></div>';

      inner.appendChild(header);
      inner.appendChild(content);
      modal.appendChild(inner);

      modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal, opener); });
      document.body.appendChild(modal);
      // small entrance animation
      requestAnimationFrame(() => { inner.style.transform = 'scale(1)'; });
      // focus management
      closeBtn.focus();
      return { modal, content, closeBtn };
    }

    function closeModal(modal, opener) {
      // return focus to opener button if possible
      try {
        modal.remove();
        document.body.style.overflow = '';
        if (opener && typeof opener.focus === 'function') opener.focus();
      } catch (err) {
        console.warn('Error closing modal', err);
      }
    }

    function openMap(src, title, opener) {
      const { modal, content } = createMapModal(opener);
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // create iframe inside content
      const ratio = document.createElement('div');
      ratio.className = 'ratio ratio-16x9';
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.setAttribute('title', title || 'Mapa');
      iframe.style.border = '0';
      ratio.appendChild(iframe);
      content.innerHTML = '';
      content.appendChild(ratio);

      // close on Esc and ensure handler removed on close
      const escHandler = (e) => { if (e.key === 'Escape') { closeModal(modal, opener); document.removeEventListener('keydown', escHandler); } };
      document.addEventListener('keydown', escHandler);
    }

    mapCardsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-map');
      if (!btn) return;
      const src = btn.getAttribute('data-src');
      const title = btn.closest('.map-card')?.querySelector('.map-title')?.textContent || 'Mapa';
      if (src) openMap(src, title, btn);
    });
  }

  // --- Contador de visitas simple usando localStorage ---
  try {
    const key = 'basurar_visitas';
    const visitasEl = document.getElementById('visitas');
    let visitas = parseInt(localStorage.getItem(key) || '0', 10);
    visitas += 1;
    localStorage.setItem(key, visitas);
    if (visitasEl) visitasEl.textContent = visitas;
  } catch (err) {
    // localStorage puede fallar en modos privados
    console.warn('No se pudo usar localStorage:', err);
  }

  // --- Año en el footer ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});