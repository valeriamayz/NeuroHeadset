document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const carritoTotalSpan = document.getElementById('carrito-total');
    const resumenSection = document.getElementById('carrito-resumen-section');
    const iniciarCompraBtn = document.getElementById('iniciar-compra-btn');
    const carritoVacioMsg = document.getElementById('carrito-vacio-msg');
    
    const pagoModal = document.getElementById('pago-modal');
    const closeBtn = document.querySelector('.close-btn');
    const formularioPago = document.getElementById('formulario-pago');
    const productosAComprarDiv = document.getElementById('productos-a-comprar');
    const mensajeCompraExito = document.getElementById('mensaje-compra-exito');
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // función para actualizar el contador de la navbar
    function updateNavbarCartCount() {
        const contador = document.getElementById("contador-carrito");
        if (contador) contador.textContent = carrito.length;
    }

    // renderizado del carrito
    function renderCarrito() {
        // limpia el contenedor
        carritoContainer.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            carritoVacioMsg.style.display = 'block';
            resumenSection.style.display = 'none';
            updateNavbarCartCount(); // asegurarse de que el contador sea 0
            return;
        }

        carritoVacioMsg.style.display = 'none';
        resumenSection.style.display = 'block';

        carrito.forEach((producto, index) => {
            // crear el elemento de tarjeta para el producto
            const itemCard = document.createElement('div');
            itemCard.className = 'carrito-item';
            
            const subtotal = producto.price * (producto.quantity || 1);
            total += subtotal;

            itemCard.innerHTML = `
                <img src="${producto.image}" alt="${producto.name}" class="item-image">
                <div class="item-details">
                    <h3>${producto.name}</h3>
                    <p>${producto.description}</p>
                    <p class="item-price">$${producto.price.toLocaleString('es-AR')}</p>
                </div>
                <div>
                  <button class="btn-secondary eliminar-item-btn" data-index="${index}" style="background-color: #8B0000; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; margin-top: 5px;">Eliminar</button>
                </div>
            `;
            
            carritoContainer.appendChild(itemCard);
        });

        carritoTotalSpan.textContent = `$${total.toLocaleString('es-AR')}`;
        iniciarCompraBtn.textContent = `Proceder al Pago de ${carrito.length} ${carrito.length === 1 ? 'producto' : 'productos'}`;
        
        // asignar eventos al botón de eliminar
        document.querySelectorAll('.eliminar-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                eliminarProducto(index);
            });
        });
        
        updateNavbarCartCount();
    }

    // eliminar producto del carrito
    function eliminarProducto(index) {
        carrito.splice(index, 1); 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
    }


    // manejo del modal de pago
    function abrirModalPagoTotal() {
        if (carrito.length === 0) return;

        // mostrar listado de productos a pagar en el modal
        productosAComprarDiv.innerHTML = `
            <p style="font-weight: bold; margin-bottom: 10px;">Comprando ${carrito.length} ${carrito.length === 1 ? 'producto' : 'productos'}:</p>
            ${carrito.map(p => `
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <img src="${p.image}" style="max-width: 40px; margin-right: 10px;">
                    <span style="flex-grow: 1;">${p.name}</span>
                    <span>$${p.price.toLocaleString('es-AR')}</span>
                </div>
            `).join('')}
            <hr style="border-color: var(--dorado); margin: 10px 0;">
            <p style="font-weight: bold; text-align: right;">Total: ${carritoTotalSpan.textContent}</p>
        `;

        // restablecer el formulario y ocultar el mensaje de éxito anterior
        formularioPago.reset();
        mensajeCompraExito.style.display = 'none';
        formularioPago.style.display = 'block';

        pagoModal.style.display = 'block';
    }

    // evento para abrir el modal con el resumen de la compra total
    iniciarCompraBtn.addEventListener('click', abrirModalPagoTotal);

    // cierra el modal
    closeBtn.onclick = function() {
        pagoModal.style.display = 'none';
    }

    // cierra el modal si el usuario hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == pagoModal) {
            pagoModal.style.display = 'none';
        }
    }

    // manejo del formulario de pago
    formularioPago.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // simulación de proceso de compra
        
        // 1. mostrar mensaje de éxito
        formularioPago.style.display = 'none';
        mensajeCompraExito.style.display = 'block';
        
        // 2. simular la finalización: vaciar el carrito después de 2 segundos
        setTimeout(() => {
            carrito = []; // vacía el array local
            localStorage.setItem('carrito', JSON.stringify(carrito)); // vacía localStorage
            
            // cerrar modal y refrescar la vista del carrito
            pagoModal.style.display = 'none';
            renderCarrito();
        }, 2000);
    });
    
    // inicializar el carrito al cargar la página
    renderCarrito();
    updateNavbarCartCount(); // asegura que el contador de la navbar esté correcto al cargar
});