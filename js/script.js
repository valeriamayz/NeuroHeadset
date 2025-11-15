document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const cartCounter = document.getElementById("contador-carrito");

  // verifica que ambos elementos existan
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      // esto hace que aparezca y desaparezca la clase active
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  const form = document.getElementById('formContacto');
  // const mensajeExito = document.getElementById('mensajeExito'); 

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombreUsuario = document.getElementById('nombre').value;
      alert(" ¡Gracias " + nombreUsuario + "! Tu mensaje fue enviado con éxito. Te responderemos pronto!");

      form.reset();
    });
  }

  // carga inicial del contador del carrito para otras páginas (index, carrito, etc.)
  function initializeCartCount() {
    let cart = JSON.parse(localStorage.getItem("carrito")) || [];
    if (cartCounter) {
      cartCounter.textContent = cart.length;
    }
  }

  initializeCartCount();
});