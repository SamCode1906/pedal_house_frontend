console.log('✅ app.js cargado - Inicializando PedalHouse');

// ===== SISTEMA DE MODALES =====

function mostrarModal(titulo, mensaje, callback = null) {
    const modal = document.getElementById("modal-alerta");
    const tituloEl = document.getElementById("modal-titulo");
    const mensajeEl = document.getElementById("modal-mensaje");
    const btn = document.getElementById("modal-btn");

    tituloEl.innerHTML = titulo;
    mensajeEl.innerHTML = mensaje;

    modal.style.display = "flex";

    btn.onclick = function() {
        modal.style.display = "none";
        if (callback) callback();
    };
}

function mostrarModalLogin() {
    const modalHTML = `
        <div id="loginModal" style="
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); z-index: 1000; display: flex; 
            justify-content: center; align-items: center;
        ">
            <div style="
                background: white; padding: 30px; border-radius: 10px; 
                width: 90%; max-width: 400px; position: relative;
            ">
                <span onclick="cerrarModal()" style="
                    position: absolute; right: 15px; top: 15px; 
                    font-size: 24px; cursor: pointer; color: #000;
                ">×</span>
                
                <h2 style="text-align: center; margin-bottom: 20px; color: #000;">Iniciar Sesión</h2>
                
                <form onsubmit="manejarLogin(event)">
                    <input type="email" id="loginEmail" placeholder="Correo electrónico" required 
                           style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                    <input type="password" id="loginPassword" placeholder="Contraseña" required 
                           style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                    <button type="submit" style="
                        width: 100%; padding: 12px; background: #000; color: white; 
                        border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;
                    ">Ingresar</button>
                </form>
                
                <p style="text-align: center; margin-top: 15px;">
                    ¿No tienes cuenta? 
                    <a href="#" onclick="mostrarModalRegistro()" style="color: #007bff;">Regístrate aquí</a>
                </p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function mostrarModalRegistro() {
    const modalHTML = `
        <div id="registerModal" style="
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); z-index: 1000; display: flex; 
            justify-content: center; align-items: center;
        ">
            <div style="
                background: white; padding: 30px; border-radius: 10px; 
                width: 90%; max-width: 400px; position: relative;
            ">
                <span onclick="cerrarModal()" style="
                    position: absolute; right: 15px; top: 15px; 
                    font-size: 24px; cursor: pointer; color: #000;
                ">×</span>
                
                <h2 style="text-align: center; margin-bottom: 20px; color: #000;">Crear Cuenta</h2>
                
                <form onsubmit="manejarRegistro(event)">
                    <input type="text" id="regNombre" placeholder="Nombre" required 
                           style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                    <input type="text" id="regApellido" placeholder="Apellido" required 
                           style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                    <input type="text" id="regCedula" placeholder="Cédula" required 
                           style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                    <input type="text" id="regTelefono" placeholder="Teléfono" required 
                           style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                    <input type="email" id="regEmail" placeholder="Correo electrónico" required 
                           style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                    <input type="password" id="regPassword" placeholder="Contraseña" required 
                           style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                    <button type="submit" style="
                        width: 100%; padding: 12px; background: #000; color: white; 
                        border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;
                    ">Registrarse</button>
                </form>
                
                <p style="text-align: center; margin-top: 15px;">
                    ¿Ya tienes cuenta? 
                    <a href="#" onclick="mostrarModalLogin()" style="color: #007bff;">Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function cerrarModal() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (loginModal) loginModal.remove();
    if (registerModal) registerModal.remove();
}

// ===== MANEJADORES DE FORMULARIOS =====
async function manejarLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (typeof login === 'function') {
        const exito = await login(email, password);
        if (exito) {
            cerrarModal();
        }
    } else {
        mostrarNotificacion('❌ Error: auth.js no cargado');
    }
}

async function manejarRegistro(event) {
    event.preventDefault();
    const userData = {
        nombre: document.getElementById('regNombre').value,
        apellido: document.getElementById('regApellido').value,
        cedula: document.getElementById('regCedula').value,
        telefono: document.getElementById('regTelefono').value,
        correo: document.getElementById('regEmail').value,
        contraseña: document.getElementById('regPassword').value
    };
    
    if (typeof registrar === 'function') {
        const exito = await registrar(userData);
        if (exito) {
            cerrarModal();
            setTimeout(() => mostrarModalLogin(), 1000);
        }
    } else {
        mostrarNotificacion('❌ Error: auth.js no cargado');
    }
}

// ===== INTERFAZ DE USUARIO ====

function actualizarNavbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navIcons = document.querySelector('.nav-icons-elegant'); // Asegúrate que coincida con tu clase
    
    if (!navIcons) {
        console.log('No se encontró nav-icons-elegant');
        return;
    }
    
    if (user) {
        navIcons.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="color: #2c3e50; font-weight: 600; font-size: 14px;">
                    👋 Hola, ${user.nombre}
                </span>
                <button onclick="logout()" style="
                    background: #ff4444; 
                    color: white; 
                    border: none; 
                    padding: 8px 16px; 
                    border-radius: 20px; 
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                ">Cerrar Sesión</button>
                <div class="cart-icon" onclick="mostrarCarrito()">🛒</div>
            </div>
        `;
    } else {
        navIcons.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div class="user-avatar" onclick="mostrarModalLogin()">👤</div>
                <div class="cart-icon" onclick="mostrarCarrito()">🛒</div>
            </div>
        `;
    }
    
    // Actualizar contador del carrito
    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }
}
    
    // Actualizar contador del carrito si existe
    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }

function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: #000; color: white; padding: 15px 20px;
        border-radius: 5px; z-index: 10000; font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(notificacion);
    setTimeout(() => notificacion.remove(), 3000);
}

// ===== INICIALIZACIÓN =====
function inicializarApp() {
    console.log('🚀 Inicializando aplicación PedalHouse...');
    
    // Configurar navbar según estado de autenticación
    actualizarNavbar();
    
    // Configurar eventos globales
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.id === 'loginModal' || e.target.id === 'registerModal') {
            cerrarModal();
        }
    });
    
    console.log('✅ Aplicación inicializada correctamente');
}

// ===== INICIALIZAR AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', inicializarApp);

// ===== HACER FUNCIONES GLOBALES =====
window.mostrarModalLogin = mostrarModalLogin;
window.mostrarModalRegistro = mostrarModalRegistro;
window.cerrarModal = cerrarModal;
window.manejarLogin = manejarLogin;
window.manejarRegistro = manejarRegistro;
window.actualizarNavbar = actualizarNavbar;
window.mostrarNotificacion = mostrarNotificacion;