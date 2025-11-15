document.querySelectorAll(".color-circle").forEach((circle) => {
  circle.addEventListener("click", () => {
    const imgId = circle.getAttribute("data-product");
    const newImg = circle.getAttribute("data-image");
    document.getElementById(imgId).src = newImg;
  });
});

// carrito
const buttons = document.querySelectorAll(".add-to-cart");
// usamos el ID de la navbar en catalogo.html para el contador
const cartCount = document.getElementById("contador-carrito"); 

// carga el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("carrito")) || [];

// función para actualizar el contador de la navbar
function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

updateCartCount();

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const id = card.getAttribute("data-product-id"); // agregamos un ID único
    const name = card.querySelector("h3").textContent;
    const priceText = card.querySelector(".product-price").textContent;
    const price = parseInt(card.getAttribute("data-price"));
    const image = card.querySelector(".product-image").src;
    const description = card.querySelector("p:not(.product-price)").textContent;

    // obtener la imagen actual (puede haber cambiado por el selector de color)
    const currentImage = card.querySelector(".product-image").src;
    
    // el producto se guarda con la imagen, descripción, etc
    cart.push({ id: Date.now(), name, price, description, image: currentImage, quantity: 1 });
    localStorage.setItem("carrito", JSON.stringify(cart));

    updateCartCount();
    btn.textContent = "Agregado ✔";
    setTimeout(() => (btn.textContent = "Agregar al carrito"), 1200);
  });
});
