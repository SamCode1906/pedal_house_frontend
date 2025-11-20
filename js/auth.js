// auth.js - Sistema real de autenticación
const API_URL = 'http://localhost:3000/api';

console.log('✅ auth.js cargado');

let usuario = JSON.parse(localStorage.getItem('user')) || null;

async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email, contraseña: password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            usuario = data.user;
            actualizarNavbar();
            mostrarNotificacion('✅ ¡Sesión iniciada!');
            return true;
        } else {
            mostrarNotificacion('❌ ' + data.error);
            return false;
        }
    } catch (error) {
        mostrarNotificacion('❌ Error de conexión');
        return false;
    }
}

async function registrar(userData) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            mostrarNotificacion('✅ ¡Cuenta creada! Ahora inicia sesión');
            return true;
        } else {
            mostrarNotificacion('❌ ' + data.error);
            return false;
        }
    } catch (error) {
        mostrarNotificacion('❌ Error de conexión');
        return false;
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    usuario = null;
    actualizarNavbar();
    mostrarNotificacion('👋 Sesión cerrada');
}

// Hacer funciones globales
window.login = login;
window.registrar = registrar;
window.logout = logout;