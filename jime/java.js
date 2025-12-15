
// CONTENEDOR PRINCIPAL
const contenido = document.getElementById("contenido");

// TÍTULOS
const h1 = document.createElement("h1");
h1.textContent = "Consejos para reciclar en casa";
contenido.appendChild(h1);

const h2 = document.createElement("h2");
h2.textContent = "7 consejos y tips para reciclar correctamente";
contenido.appendChild(h2);

// LISTA DE CONSEJOS
const consejos = [
  "Reserva un sitio en casa para el reciclaje.",
  "Separa bien los envases de la basura orgánica.",
  "Recicla cada material en el contene",
  "Nunca tires aceite por el fregadero."
]
  "Lleva productos especiales a puntos limpios."
  "Reutiliza bolsas de plástico o usa bolsas de tela."
  "Utiliza una compostera para residuos orgánicos."

// CREAR PÁRRAFOS DINÁMICAMENTE
consejos.forEach((texto, index) => {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${index + 1}.</strong> ${texto}`;
  contenido.appendChild(p);
});

// VIDEOS
const videos = [
  "https://www.youtube.com/embed/G3Vlm8abEfc",
  "https://www.youtube.com/embed/n4ALWBhHMow",
  "https://www.youtube.com/embed/-UFFFUTMlCw",
  "https://www.youtube.com/embed/YgES1DyjeGs"
];

const contenedorVideos = document.getElementById("videos");

videos.forEach(src => {
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card";

  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.height = "315";
  iframe.allowFullscreen = true;
  iframe.className = "w-100";

  card.appendChild(iframe);
  col.appendChild(card);
  contenedorVideos.appendChild(col);
});