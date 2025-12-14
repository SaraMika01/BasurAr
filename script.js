document.addEventListener("DOMContentLoaded", () => {
  const textos = document.querySelectorAll(".fade-text");
  const boton = document.getElementById("btnSobreNosotros");

  textos[1].style.display = "none";

  let visible = false;

  boton.addEventListener("click", () => {
    if (visible) {
      textos[1].style.display = "none";
      boton.textContent = "Leer más";
    } else {
      textos[1].style.display = "block";
      boton.textContent = "Leer menos";
    }
    visible = !visible;
  });
});