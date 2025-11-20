// products.js - Carga productos desde el backend
console.log('✅ products.js cargado');

const API_URL = 'http://localhost:3000/api';

// Cargar productos desde el backend
async function cargarProductos(categoria = '') {
    try {
        console.log('🔄 Cargando productos...');
        let url = `${API_URL}/products`;
        if (categoria) {
            url += `?categoria=${categoria}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error cargando productos');
        }
        
        const productos = await response.json();
        console.log(`✅ ${productos.length} productos cargados`);
        mostrarProductos(productos);
        
    } catch (error) {
        console.error('Error:', error);
        console.log('ℹ️ Usando productos estáticos');
        // Los productos estáticos del HTML se mantienen
    }
}

// Mostrar productos en el HTML
function mostrarProductos(productos) {
    const contenedor = document.querySelector('.products-container');
    if (!contenedor) {
        console.log('ℹ️ No hay productos-container en esta página');
        return;
    }

    console.log('🎨 Renderizando productos...');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const productoHTML = `
            <article class="card-bike">
                <img src="${producto.imagen_producto}" alt="${producto.nombre_producto}" />
                <div class="info">
                    <h3>${formatearNombre(producto.nombre_producto)}</h3>
                    <button onclick="agregarAlCarrito(
                        ${producto.id_producto}, 
                        '${producto.nombre_producto.replace(/'/g, "\\'")}', 
                        ${producto.precio_producto}, 
                        '${producto.imagen_producto}'
                    )">COMPRAR!</button>
                </div>
                <p class="price">$${formatearPrecio(producto.precio_producto)}</p>
            </article>
        `;
        contenedor.innerHTML += productoHTML;
    });

    console.log('✅ Productos renderizados');
}

// Formatear nombre del producto (para los <br>)
function formatearNombre(nombre) {
    return nombre.replace(' ', '<br>');
}

// Formatear precio
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO').format(precio);
}

// Cargar productos según la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('📦 Inicializando productos...');
    
    const paginaActual = window.location.pathname;
    console.log('📄 Página actual:', paginaActual);
    
    if (paginaActual.includes('bicicletas.html')) {
        cargarProductos('Bicicletas');
    } else if (paginaActual.includes('accesorios.html')) {
        cargarProductos('Accesorios');
    } else {
        cargarProductos(); // Todos los productos
    }
});