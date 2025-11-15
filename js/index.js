document.addEventListener('DOMContentLoaded', () => {

    //carrusel
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
  
    // verifica si los elementos del carrusel existen en la página actual
    if (carouselSlide && carouselItems.length > 0 && prevBtn && nextBtn) {
  
      let currentIndex = 0;
      const totalSlides = carouselItems.length; // (será 4)
      const slideWidth = 100 / totalSlides; // (será 25)
  
      // función para mover el slide
      function updateSlidePosition() {
        // mueve el contenedor del slide usando 'transform'
        // multiplica el índice actual por el ancho de un slide (25%)
        carouselSlide.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      }
  
      // control manual de las flechas
  
      // botón siguiente
      nextBtn.addEventListener('click', () => {
        // avanza al siguiente slide
        // el '%' (módulo) hace que vuelva al 0 después del último slide
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
        resetAutoSlide(); // reinicia el temporizador automático
      });
  
      // botón Anterior
      prevBtn.addEventListener('click', () => {
        // retrocede al slide anterior
        // el '+ totalSlides' evita números negativos
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
        resetAutoSlide(); // reinicia el temporizador automático
      });
  
      // control automático de slides
      let autoSlideInterval;
  
      function startAutoSlide() {
        // cambia de imagen cada 4 segundos (4000 milisegundos)
        autoSlideInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % totalSlides;
          updateSlidePosition();
        }, 4000);
      }
  
      function resetAutoSlide() {
        // detiene el intervalo actual
        clearInterval(autoSlideInterval);
        // inicia uno nuevo
        startAutoSlide();
      }
  
      // inicia el slide automático cuando la página carga
      startAutoSlide();
    }
  
  });