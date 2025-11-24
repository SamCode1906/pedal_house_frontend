// cart.js - Sistema de carrito
console.log('✅ cart.js cargado');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(productId, nombre, precio, imagen) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        mostrarNotificacion('⚠️ Inicia sesión para comprar');
        mostrarModalLogin();
        return false;
    }

    const itemExistente = carrito.find(item => item.id_producto === productId);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id_producto: productId,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarNotificacion('🛒 Producto agregado al carrito');
    return true;
}

function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const cartIcon = document.querySelector('.nav-icons .icon:last-child');
    
    if (cartIcon && totalItems > 0) {
        cartIcon.innerHTML = `🛒 <span class="cart-counter">${totalItems}</span>`;
    } else if (cartIcon) {
        cartIcon.innerHTML = '🛒';
    }
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        mostrarModal("Carrito vacío", "🛒 Tu carrito está vacío");
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const mensaje = carrito.map(item => 
        `• ${item.nombre} - $${item.precio.toLocaleString()} x${item.cantidad}`
    ).join('\n');
    
    mostrarModal("Tu carrito 🛒", mensaje + "\n\nTOTAL: $" + total.toLocaleString());

}

// Hacer funciones globales
window.agregarAlCarrito = agregarAlCarrito;
window.mostrarCarrito = mostrarCarrito;
window.actualizarContadorCarrito = actualizarContadorCarrito;

// Agregar esto al final de cart.js

function cargarItemsCarrito() {
    const itemsCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('cart-items');
    let subtotal = 0;

    if (!contenedor) return; // Si no existe el elemento, salir

    if (itemsCarrito.length === 0) {
        contenedor.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        if (document.getElementById('subtotal')) {
            document.getElementById('subtotal').textContent = '$0';
        }
        if (document.getElementById('total')) {
            document.getElementById('total').textContent = '$0';
        }
        return;
    }

    contenedor.innerHTML = itemsCarrito.map(item => {
        const totalItem = item.precio * item.cantidad;
        subtotal += totalItem;
        
        return `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}" 
                     onerror="this.src='https://via.placeholder.com/80x80/ccc/fff?text=Imagen'">
                <div class="item-info">
                    <h3>${item.nombre}</h3>
                    <p>$${item.precio.toLocaleString('es-CO')}</p>
                </div>
                <div class="item-controls">
                    <button onclick="actualizarCantidad(${item.id_producto}, -1)">-</button>
                    <span class="cantidad">${item.cantidad}</span>
                    <button onclick="actualizarCantidad(${item.id_producto}, 1)">+</button>
                    <button class="remove-btn" onclick="eliminarDelCarrito(${item.id_producto})">🗑️</button>
                </div>
                <div class="item-total">
                    $${totalItem.toLocaleString('es-CO')}
                </div>
            </div>
        `;
    }).join('');

    if (document.getElementById('subtotal')) {
        document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CO')}`;
    }
    if (document.getElementById('total')) {
        document.getElementById('total').textContent = `$${subtotal.toLocaleString('es-CO')}`;
    }
}

function actualizarCantidad(idProducto, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const item = carrito.find(item => item.id_producto === idProducto);
    
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(item => item.id_producto !== idProducto);
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarItemsCarrito();
        actualizarContadorCarrito();
    }
}

function eliminarDelCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id_producto !== idProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarItemsCarrito();
    actualizarContadorCarrito();
}

function mostrarModal(titulo, mensaje) {
    const modal = document.getElementById("modal-alerta");
    document.getElementById("modal-titulo").textContent = titulo;
    document.getElementById("modal-mensaje").textContent = mensaje;

    modal.style.display = "flex";

    document.getElementById("modal-btn").onclick = () => {
        modal.style.display = "none";
    };

    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
    };
}


// Hacer estas funciones globales también
window.cargarItemsCarrito = cargarItemsCarrito;
window.actualizarCantidad = actualizarCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;