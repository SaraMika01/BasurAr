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